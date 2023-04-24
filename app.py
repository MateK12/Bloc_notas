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

@app.route("/Agregar tareas", methods=["POST","GET"])           #Iniciar sesion
def Inicio_sesion():
    pass
   
if __name__ == '__main__':
    #base.metadata.drop_all(motor)
    #base.metadata.create_all(motor)
    app.run(debug=True, port=5000)