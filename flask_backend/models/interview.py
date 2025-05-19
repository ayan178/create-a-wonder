
from datetime import datetime
from .user import db

class Interview(db.Model):
    """Interview model for storing interview data"""
    __tablename__ = 'interviews'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    status = db.Column(db.String(20), default='pending') # pending, completed, cancelled
    recording_url = db.Column(db.String(255))
    score = db.Column(db.Float)
    feedback = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    scheduled_at = db.Column(db.DateTime)
    completed_at = db.Column(db.DateTime)
    
    # Foreign keys
    candidate_id = db.Column(db.Integer, db.ForeignKey('candidates.id'))
    employer_id = db.Column(db.Integer, db.ForeignKey('employers.id'))
    
    # Relationships
    candidate = db.relationship('Candidate', back_populates='interviews')
    employer = db.relationship('Employer', back_populates='interviews')
    
    def to_dict(self):
        """Convert interview object to dictionary"""
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'status': self.status,
            'recording_url': self.recording_url,
            'score': self.score,
            'feedback': self.feedback,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'scheduled_at': self.scheduled_at.isoformat() if self.scheduled_at else None,
            'completed_at': self.completed_at.isoformat() if self.completed_at else None,
            'candidate_id': self.candidate_id,
            'employer_id': self.employer_id
        }
