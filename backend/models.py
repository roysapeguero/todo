from config import db

class ToDo(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(80), unique=False, nullable=False)

  def to_json(self):
    return {
      "id": self.id,
      "title": self.title,
    }
