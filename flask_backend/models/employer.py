
from .user import db, User

class Employer(User):
    """Employer model for companies"""
    __tablename__ = 'employers'
    
    id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    company_name = db.Column(db.String(100))
    industry = db.Column(db.String(100))
    company_size = db.Column(db.String(50))
    website = db.Column(db.String(255))
    
    # Relationships
    interviews = db.relationship('Interview', back_populates='employer', cascade="all, delete-orphan")
    
    __mapper_args__ = {
        'polymorphic_identity': 'employer',
    }
    
    def to_dict(self):
        """Convert employer object to dictionary"""
        base_dict = super().to_dict()
        employer_dict = {
            'company_name': self.company_name,
            'industry': self.industry,
            'company_size': self.company_size,
            'website': self.website
        }
        return {**base_dict, **employer_dict}
