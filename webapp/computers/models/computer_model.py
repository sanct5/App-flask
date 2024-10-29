from users.models.db import db

class Computers(db.Model):
    ref = db.Column(db.String, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    gpu = db.Column(db.String, nullable=False)
    cpu = db.Column(db.String, nullable=False)
    ram = db.Column(db.String, nullable=False)

    def __init__(self, ref, user_id, gpu, cpu, ram):
        self.ref = ref
        self.user_id = user_id
        self.gpu = gpu
        self.cpu = cpu
        self.ram = ram