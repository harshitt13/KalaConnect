import os
from flask import Blueprint, request, jsonify, current_app
from app import db
from app.models.product import Product
from app.models.user import User
from app.services.ai_service import generate_product_content
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename

product_bp = Blueprint('products', __name__)

def is_seller():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return user and user.role == 'seller'

@product_bp.route('/products/generate-content', methods=['POST'])
@jwt_required()
def get_ai_content():
    if not is_seller():
        return jsonify({"error": "Seller access required"}), 403

    data = request.get_json()
    if not data or not data.get('craft') or not data.get('materials'):
        return jsonify({"error": "Craft and materials are required"}), 400

    try:
        content = generate_product_content(data['craft'], data['materials'])
        return jsonify(content), 200
    except ConnectionError as e:
        return jsonify({"error": str(e)}), 503
    except Exception as e:
        return jsonify({"error": "Failed to generate AI content", "details": str(e)}), 500

@product_bp.route('/products', methods=['POST'])
@jwt_required()
def create_product():
    if not is_seller():
        return jsonify({"error": "Seller access required"}), 403
    
    data = request.form
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file:
        filename = secure_filename(file.filename)
        filepath = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        image_url = f"/static/uploads/{filename}"

    try:
        new_product = Product(
            title=data['title'],
            story=data['story'],
            description=data['description'],
            price=float(data['price']),
            image_url=image_url,
            artisan_id=get_jwt_identity()
        )
        db.session.add(new_product)
        db.session.commit()
        return jsonify(new_product.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Failed to create product", "details": str(e)}), 500

@product_bp.route('/products', methods=['GET'])
def get_products():
    products = Product.query.order_by(Product.created_at.desc()).all()
    return jsonify([p.to_dict() for p in products]), 200

@product_bp.route('/products/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get_or_404(id)
    
    try:
        product.view_count += 1
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Failed to update view count for product {id}: {e}")

    return jsonify(product.to_dict()), 200

@product_bp.route('/products/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_product(id):
    if not is_seller():
        return jsonify({"error": "Seller access required"}), 403

    product = Product.query.get_or_404(id)
    
    if product.artisan_id != get_jwt_identity():
        return jsonify({"error": "Unauthorized to delete this product"}), 403

    try:
        db.session.delete(product)
        db.session.commit()
        return jsonify({"message": "Product deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Failed to delete product", "details": str(e)}), 500

