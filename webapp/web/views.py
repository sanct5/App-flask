from flask import Flask, render_template, redirect, url_for, session
from users.controllers.user_controller import user_controller
from computers.controllers.computer_controller import computer_controller
from users.models.db import db

app = Flask(__name__)
app.config.from_object('config.Config')
db.init_app(app)

# Registrando el blueprint del controlador de usuarios
app.register_blueprint(user_controller)
app.register_blueprint(computer_controller)

# Ruta para renderizar el template index.html
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/edit/<string:id>')
def edit_user(id):
    print("id recibido",id)
    return render_template('edit.html', id=id)

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/mycomputers/<string:id>')
def mycomputers(id):
    if 'user_id' not in session:
        return redirect(url_for('login'))
    return render_template('mycomputers.html', id=id)

@app.route('/editcomputer/<string:ref>')
def editcomputer(ref):
    print("ref recibido",ref)
    if 'user_id' not in session:
        return redirect(url_for('login'))
    return render_template('editcomputer.html', ref=ref)

if __name__ == '__main__':
    app.run()

