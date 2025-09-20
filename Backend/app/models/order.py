from app import db
from datetime import datetime

class Order(db.Model):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True)
    order_date = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(20), default='Pending')
    
    buyer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)

    # Relationship to access product details from an order
    product = db.relationship('Product')

    def to_dict(self):
        return {
            'orderId': self.id,
            'orderDate': self.order_date.isoformat(),
            'status': self.status,
            'buyerId': self.buyer_id,
            'productId': self.product_id,
            'product': self.product.to_dict() if self.product else None,
            'buyerName': self.buyer.name if self.buyer else None
        }

