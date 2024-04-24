create database CrystalGate;
use CrystalGate;

/* TABLAS INDEPENDIENTES */

create table tb_tipos_administradores(
    id_tipo_administrador int primary key auto_increment,
    tipo_administrador varchar(50)
);

create table tb_clasificaciones_permisos(
    id_clasificacion_permiso int primary key auto_increment,
    clasificacion_permiso varchar(50)
);

create table tb_estados_permisos(
    id_estado_permiso int primary key auto_increment,
    estado_permiso varchar(50)
);

create table tb_cargos(
    id_cargo int primary key auto_increment,
    cargo varchar(50)
);

/* TABLAS DEPENDIENTES */

create table tb_usuarios(
    id_usuario int primary key auto_increment,
    id_cargo int,

    nombre varchar(50) not null,
    apellido varchar(50) not null,
    clave varchar(275) not null,
    correo varchar(75) not null
);

create table tb_tipos_permisos(
    id_tipo_permiso int primary key auto_increment,
    tipo_permiso varchar(50),
    id_clasificacion_permiso int,
    lapso boolean
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
    id_tipo_administrador int,

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