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
from sqlalchemy import ForeignKey
from flask_cors import CORS
from passlib.context import CryptContext 


base = sqlalchemy.orm.declarative_base()           #Alchemy
motor = create_engine("mysql://root:root@192.168.44.114:3306/bloc_notas")  #Alchemy
db= sqlalchemy
connection = motor.raw_connection()
cur = connection.cursor()
Contetxo = CryptContext(
    schemes=["pbkdf2_sha256"],
    default = "pbkdf2_sha256",
    pbkdf2_sha256__default_rounds = 30000
)
class User(base):
    __tablename__ = "Usuarios"
    id = Column(Integer(), primary_key = True)
    usuario =  Column(String(50), nullable = False, unique = True)       #Base de usuarios
    contraseña =  Column(String(250), nullable = False, unique = False)
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
    user_exists = sesion1.query(User).filter(User.usuario == request.json["usuario_value"],).first() #Veo si el usuario NO existe
    if user_exists == None:
        hashed_psswd = Contetxo.hash(request.json["contraseña_value"]) #Hasheo contraseña
        sesion1.add(User(usuario = request.json["usuario_value"], contraseña = hashed_psswd)) #Agrego usuario y su contraseña hasheada
        sesion1.commit()
        print("Crea la cuenta")
        msg = {
            "mensaje":"La cuenta ha sido creada con exito",
            "creacion":True
        }
        return msg
    elif user_exists !=None:    #Si el usuario existe
        msg = {
                "mensaje":"La cuenta ya existe",
                "creacion":False
            }
        print("cuenta existente")
        return msg
    else:
        print("falloooo")
@app.route("/iniciar_sesion",methods=["POST","GET"])
def iniciar_sesion():
    user_exists = sesion1.query(User).filter(User.usuario == request.json["usuario_value"]).first()
    get_psswd = sesion1.query(User).filter(User.usuario == request.json["usuario_value"]).all() #query para obtener fila compleata de ese usuario
    get_data = sesion1.query(User).filter(                      
        User.usuario == request.json["usuario_value"],  #Consulta para traer datos 
    ).all()
    print("el resultado es",get_data)
    if user_exists != None:   
            psswd_gotten = get_psswd[0].contraseña
            if Contetxo.verify(request.json["contraseña_value"],psswd_gotten):
                print("sesion iniciada")
                get_data = sesion1.query(User).filter(User.usuario == request.json["usuario_value"]).all()
                msg = {
                "autenticacion":True,
                "user_id":get_data[0].id
                }
                return msg
            else:
                msg = {
                "autenticacion":False,
                "mensaje":"contraseña incorrecta"
                }
                
                return msg
    elif user_exists == None:
                msg = {
                "mensaje":"La cuenta no existe",
                "autenticacion":False
                }
                print("No tienes cuenta")
                return msg
    else:
            return("falloooo")
@app.route("/Agregar_tareas", methods=["POST","GET"])           #Iniciar sesion
def agregar_tareas():
    sesion1.add(Tarea(nombre = request.json["nombre"], descripcion = request.json["descripcion"],
    importancia = request.json["importancia"], Usuario_id = request.json["id_usuario"],
    ))
    consulta = sesion1.query(Tarea).filter(
            Tarea.id == request.json["id_usuario"],
        ).all()
    print(len(consulta))
    sesion1.commit()
    print("Crea la tarea")
    nombre_lista= []
    importancia_lista = []
    descripcion_lista = []
    fecha_lista = []
    for f in range(0):
        nombre_lista.append(consulta[f].nombre)
        descripcion_lista.append(consulta[f].descripcion)
        importancia_lista.append(consulta[f].importancia)
        fecha_lista.append(consulta[f].fecha)

    msg = {
            "mensaje":"La tarea ha sido creada con exito",
            "nombre":nombre_lista,
            "descripcion": descripcion_lista,
            "importancia":importancia_lista,
            "fecha": fecha_lista,
            "creacion":True
        }

    return msg
@app.route("/Obtener_tareas",methods=["POST","GET"])
def Obtener_tareas ():
    get_tasks = sesion1.query(Tarea).filter(
            Tarea.Usuario_id == request.json["id"],
        ).all()
    print(len(get_tasks))
    sesion1.commit()
    print("Crea la tarea")
    id_lista = []
    nombre_lista= []
    importancia_lista = []
    descripcion_lista = []
    fecha_lista = []
    for f in range(len(get_tasks)):
        id_lista.append(get_tasks[f].id)
        nombre_lista.append(get_tasks[f].nombre)
        descripcion_lista.append(get_tasks[f].descripcion)
        importancia_lista.append(get_tasks[f].importancia)
        fecha_lista.append(get_tasks[f].fecha)

    msg = {
            "mensaje":"Tareas devueltas con exito",
            "id": id_lista,
            "nombre":nombre_lista,
            "descripcion": descripcion_lista,
            "importancia":importancia_lista,
            "fecha": fecha_lista,
            "creacion":True
        }

    return msg
if __name__ == '__main__':
    #base.metadata.drop_all(motor)
    #base.metadata.create_all(motor)
    app.run(debug=True, port=5000)