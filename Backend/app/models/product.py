from app import db
from datetime import datetime

class Product(db.Model):
    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    story = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    view_count = db.Column(db.Integer, default=0, nullable=False) # New field for analytics
    
    artisan_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'story': self.story,
            'description': self.description,
            'price': self.price,
            'imageUrl': self.image_url,
            'createdAt': self.created_at.isoformat(),
            'viewCount': self.view_count,
            'artisanId': self.artisan_id,
            'artisanName': self.artisan.name if self.artisan else None
        }

