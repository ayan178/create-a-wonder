
from .user import db, User

class Candidate(User):
    """Candidate model for job seekers"""
    __tablename__ = 'candidates'
    
    id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    phone = db.Column(db.String(20))
    resume_url = db.Column(db.String(255))
    skills = db.Column(db.Text)
    experience_years = db.Column(db.Integer)
    job_title = db.Column(db.String(100))
    
    # Relationships
    interviews = db.relationship('Interview', back_populates='candidate', cascade="all, delete-orphan")
    
    __mapper_args__ = {
        'polymorphic_identity': 'candidate',
    }
    
    def to_dict(self):
        """Convert candidate object to dictionary"""
        base_dict = super().to_dict()
        candidate_dict = {
            'phone': self.phone,
            'resume_url': self.resume_url,
            'skills': self.skills,
            'experience_years': self.experience_years,
            'job_title': self.job_title,
        }
        return {**base_dict, **candidate_dict}
