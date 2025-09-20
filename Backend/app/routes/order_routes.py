from flask import Blueprint, request, jsonify
from app import db
from app.models.order import Order
from app.models.user import User
from flask_jwt_extended import jwt_required, get_jwt_identity

order_bp = Blueprint('orders', __name__)

def is_buyer():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return user and user.role == 'buyer'

@order_bp.route('/orders', methods=['POST'])
@jwt_required()
def place_order():
    if not is_buyer():
        return jsonify({"error": "Buyer access required"}), 403

    data = request.get_json()
    if not data or not data.get('product_id'):
        return jsonify({"error": "Product ID is required"}), 400

    try:
        new_order = Order(
            buyer_id=get_jwt_identity(),
            product_id=data['product_id']
        )
        db.session.add(new_order)
        db.session.commit()
        return jsonify(new_order.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Failed to place order", "details": str(e)}), 500

@order_bp.route('/seller/orders', methods=['GET'])
@jwt_required()
def get_seller_orders():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user or user.role != 'seller':
        return jsonify({"error": "Seller access required"}), 403

    # Query orders for products that belong to the current seller
    orders = Order.query.join(Order.product).filter_by(artisan_id=user_id).order_by(Order.order_date.desc()).all()
    return jsonify([order.to_dict() for order in orders]), 200

