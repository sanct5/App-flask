from flask import Blueprint, request, jsonify
from computers.models.computer_model import Computers
from users.models.db import db

computer_controller = Blueprint('computer_controller', __name__)

# Get all computers
@computer_controller.route('/api/computers', methods=['GET'])
def get_computers():
    print("listado de computadores")
    computers = Computers.query.all()
    result = [{'ref': computer.ref, 'user_id': computer.user_id, 'gpu': computer.gpu, 'cpu': computer.cpu, 'ram': computer.ram} for computer in computers]
    return jsonify(result)

# Get single computer by ref
@computer_controller.route('/api/computers/<string:ref>', methods=['GET'])
def get_computer(ref):
    print("obteniendo computador")
    computer = Computers.query.get_or_404(ref)
    return jsonify({'ref': computer.ref, 'user_id': computer.user_id, 'gpu': computer.gpu, 'cpu': computer.cpu, 'ram': computer.ram})

# Create a new computer
@computer_controller.route('/api/computers', methods=['POST'])
def create_computer():
    print("creando computador")
    data = request.json
    new_computer = Computers(ref=data['ref'], user_id=data['user_id'], gpu=data['gpu'], cpu=data['cpu'], ram=data['ram'])
    db.session.add(new_computer)
    db.session.commit()
    return jsonify({'message': 'Computer created successfully'}), 201

# Update an existing computer
@computer_controller.route('/api/computers/<string:ref>', methods=['PUT'])
def update_computer(ref):
    print("actualizando computador")
    computer = Computers.query.get_or_404(ref)
    data = request.json
    computer.gpu = data['gpu']
    computer.cpu = data['cpu']
    computer.ram = data['ram']
    db.session.commit()
    return jsonify({'message': 'Computer updated successfully'})

# Delete an existing computer
@computer_controller.route('/api/computers/<string:ref>', methods=['DELETE'])
def delete_computer(ref):
    computer = Computers.query.get_or_404(ref)
    db.session.delete(computer)
    db.session.commit()
    return jsonify({'message': 'Computer deleted successfully'})

# Get all computers from a specific user
@computer_controller.route('/api/computers/users/<int:id>', methods=['GET'])
def get_user_computers(id):
    computers = Computers.query.filter_by(user_id=id).all()
    result = [{'ref': computer.ref, 'user_id': computer.user_id, 'gpu': computer.gpu, 'cpu': computer.cpu, 'ram': computer.ram} for computer in computers]
    return jsonify(result)
