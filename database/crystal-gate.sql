create database CrystalGate;
use CrystalGate;

/* TABLAS INDEPENDIENTES */

create table tb_tipos_administradores(
    id_tipo_administrador int primary key auto_increment,
    tipo_administrador varchar(50) UNIQUE 
);

CREATE TABLE tb_tipos_peticiones(
	id_tipo_peticion INT PRIMARY KEY AUTO_INCREMENT,
	tipo_peticion VARCHAR(32) UNIQUE
);

CREATE TABLE tb_idiomas(
	id_idioma INT PRIMARY KEY AUTO_INCREMENT,
	idioma VARCHAR(32) UNIQUE,
);

CREATE TABLE tb_centros_entregas(
	id_centro_entrega INT PRIMARY KEY AUTO_INCREMENT,
	centro_entrega VARCHAR(64) UNIQUE
);

create table tb_clasificaciones_permisos(
    id_clasificacion_permiso int primary key auto_increment,
    clasificacion_permiso varchar(50)
);

create table tb_estados_permisos(
    id_estado_permiso int primary key auto_increment,
    estado_permiso varchar(50) UNIQUE 
);

create table tb_cargos(
    id_cargo int primary key auto_increment,
    cargo varchar(50) UNIQUE 
);

/* TABLAS DEPENDIENTES */
create table tb_usuarios(
    id_usuario int primary key auto_increment,
    id_cargo INT NOT NULL,

    nombre varchar(50) not null,
    apellido varchar(50) not null,
    clave varchar(275) not null,
    correo varchar(75) not null
);


CREATE TABLE tb_peticiones(
	id_peticion INT PRIMARY KEY AUTO_INCREMENT,
	id_usuario INT NOT NULL,
	id_tipo_peticion INT NOT NULL,
	modo_entrega BOOL NOT NULL,
	id_idioma INT NOT NULL,
	id_centro_entrega INT NOT NULL,
	direccion VARCHAR(256),
	telefono_contacto VARCHAR(16)
	
	CONSTRAINT fk_peticion_tipo FOREIGN KEY (id_tipo_peticion) REFERENCES tb_tipos_peticiones(id_tipo_peticion),
	CONSTRAINT fk_peticion_idioma FOREIGN KEY (id_idioma) REFERENCES tb_idiomas(id_idioma),
	CONSTRAINT fk_peticion_centro_entrega FOREIGN KEY (id_centro_entrega) references tb_centros_entregas(id_centro_entrega),
	CONSTRAINT fk_peticion_usuario FOREIGN KEY (id_usuario) references tb_usuarios(id_usuario)a
);

create table tb_tipos_permisos(
    id_tipo_permiso int primary key auto_increment,
    tipo_permiso varchar(50) UNIQUE,
    id_clasificacion_permiso int,
    lapso ENUM(1,2,3)
);

create table tb_permisos(
    id_permiso int primary key auto_increment,
    id_usuario int,
    id_tipo_permiso int,
    id_estado_permiso int,

    fecha_inicio datetime not null,
    fecha_final datetime not null,
    fecha_envio datetime not null,
    documento_permiso blob not null,
    descripcion_permiso varchar(300)
);

create table tb_permisos_automaticos(
    id_permiso_automatico int primary key auto_increment,
    id_permiso int,

    hora_envio time not null,
    estado boolean
);

create table tb_administradores(
    id_administrador int primary key auto_increment,
    id_tipo_administrador INT NOT NULL,
    nombre varchar(50) not null,
    apellido varchar(50) not null,
    clave varchar(275) not null,
    correo varchar(75) not null
);

create table tb_notificaciones(
    id_notificacion int primary key auto_increment,
    id_administrador int,
    id_permiso int,

    fecha_envio datetime not null,
    descripcion varchar(300),
);
