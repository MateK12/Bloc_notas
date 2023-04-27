from asyncio.windows_events import NULL
from operator import mod
from pyexpat import model
from flask import Flask, render_template, request,jsonify
from flask_mysqldb import MySQL
from email.policy import default
from enum import unique
import flask
import sqlalchemy
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, DateTime, create_engine
from datetime import datetime
from sqlalchemy.orm import sessionmaker
from sqlalchemy import *
from flask_cors import CORS
from flask_cors import CORS
from werkzeug.security import generate_password_hash

base = declarative_base()           #Alchemy
motor = create_engine("mysql://root:@localhost/bloc_notas")  #Alchemy

class User(base):
    __tablename__ = "Usuarios"
    id = Column(Integer(), primary_key = True)
    usuario =  Column(String(50), nullable = False, unique = True)       #Base de usuarios
    contraseña =  Column(String(50), nullable = False, unique = False)
    def __str__(self):
        return self.usuario
    
class Tarea(base):
    __tablename__ = "Tareas"
    id = Column(Integer(), primary_key = True)
    nombre =  Column(String(50), nullable = False, unique = False)
    descripcion =  Column(String(250), nullable = False, unique = True)    
    importancia = Column(Integer())
    fecha = Column(DateTime, default=datetime.now())
    Usuario_id = Column(Integer,ForeignKey('Usuarios.id'))
    

    
    def __str__(self):
        return self.nombre


sesion = sessionmaker(motor)                #Alchemy
sesion1 = sesion()              #Alchemy
app = Flask(__name__)       #Inicializamos Flask
CORS(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'               #Conecto Flask
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'bloc_notas'

mysql = MySQL(app)

@app.route("/crear_cuenta",methods=["POST","GET"])
def crear_cuenta():
    print("llego")
    consulta_ruta1 = sesion1.query(User).filter(
        User.usuario == request.json["usuario_value"],
        User.contraseña == request.json["contraseña_value"]
    ).first()
    print("datos",consulta_ruta1)
    if consulta_ruta1 == None:
        hash_password = generate_password_hash(request.json["contraseña_value"],method="sha256")
        sesion1.add(User(usuario = request.json["usuario_value"], contraseña = hash_password))
        sesion1.commit()
        print("Crea la cuenta")
        msg = {
            "mensaje":"cuenta creada",
            "cuenta":"nueva"
        }
        return msg
    elif consulta_ruta1 !=None:
        msg = {
            "mensaje":"Cuenta existente",
            "cuenta":"existente"
        }
        print("cuenta existente")
        return msg
    else:
        print("falloooo")
@app.route("/Agregar_tareas", methods=["POST","GET"])           #Iniciar sesion
def agregar_tareas():
    pass
   
if __name__ == '__main__':
    #base.metadata.drop_all(motor)
    #base.metadata.create_all(motor)
    app.run(debug=True, port=5000)