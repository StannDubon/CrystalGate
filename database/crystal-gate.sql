DROP DATABASE IF EXISTS CrystalGate;
CREATE database CrystalGate;
USE CrystalGate;

DROP USER IF EXISTS 'crystal-gate-admin'@'localhost';
CREATE USER 'crystal-gate-admin'@'localhost' IDENTIFIED BY '#CrY5t4lG4t3-2024';
GRANT ALL PRIVILEGES ON CrystalGate.* TO 'crystal-gate-admin'@'localhost';
FLUSH PRIVILEGES;

/* TABLAS INDEPENDIENTES */
CREATE TABLE
    tb_tipos_administradores (
        id_tipo_administrador INT PRIMARY KEY AUTO_INCREMENT,
        tipo_administrador VARCHAR(50) UNIQUE,
        estado BOOLEAN DEFAULT TRUE
    );

CREATE TABLE
    tb_tipos_peticiones (
        id_tipo_peticion INT PRIMARY KEY AUTO_INCREMENT,
        tipo_peticion VARCHAR(32) UNIQUE,
        estado BOOLEAN DEFAULT TRUE
    );

CREATE TABLE
    tb_idiomas (
        id_idioma INT PRIMARY KEY AUTO_INCREMENT,
        idioma VARCHAR(32) UNIQUE,
        estado BOOLEAN DEFAULT TRUE
    );

CREATE TABLE
    tb_centros_entregas (
        id_centro_entrega INT PRIMARY KEY AUTO_INCREMENT,
        centro_entrega VARCHAR(64) UNIQUE,
        estado BOOLEAN DEFAULT TRUE
    );

CREATE TABLE
    tb_clasificaciones_permisos (
        id_clasificacion_permiso INT PRIMARY KEY AUTO_INCREMENT,
        clasificacion_permiso VARCHAR(50) UNIQUE,
        estado BOOLEAN DEFAULT TRUE
    );

CREATE TABLE
    tb_estados_permisos (
        id_estado_permiso INT PRIMARY KEY AUTO_INCREMENT,
        estado_permiso VARCHAR(50) UNIQUE,
        estado BOOLEAN DEFAULT TRUE
    );

CREATE TABLE
    tb_cargos (
        id_cargo INT PRIMARY KEY AUTO_INCREMENT,
        cargo VARCHAR(50) UNIQUE,
        estado BOOLEAN DEFAULT TRUE
    );

/* TABLAS DEPENDIENTES */
CREATE TABLE
    tb_usuarios (
        id_usuario INT PRIMARY KEY AUTO_INCREMENT,
        id_cargo INT NOT NULL,
        /* NOT ID'S */
        nombre VARCHAR(50) NOT NULL,
        apellido VARCHAR(50) NOT NULL,
        clave VARCHAR(275) NOT NULL,
        correo VARCHAR(75) NOT NULL UNIQUE,
        imagen VARCHAR(75) DEFAULT 'default.png',

        CONSTRAINT fk_usuario_cargo FOREIGN KEY (id_cargo) REFERENCES tb_cargos(id_cargo)
    );

CREATE TABLE
    tb_peticiones (
        id_peticion INT PRIMARY KEY AUTO_INCREMENT,
        id_usuario INT NOT NULL,
        id_tipo_peticion INT NOT NULL,
        id_idioma INT NOT NULL,
        id_centro_entrega INT NOT NULL,
        /* NOT ID'S */
        direccion VARCHAR(256),
        modo_entrega BOOL NOT NULL,
        telefono_contacto VARCHAR(16),
        CONSTRAINT fk_peticion_tipo FOREIGN KEY (id_tipo_peticion) REFERENCES tb_tipos_peticiones (id_tipo_peticion),
        CONSTRAINT fk_peticion_idioma FOREIGN KEY (id_idioma) REFERENCES tb_idiomas (id_idioma),
        CONSTRAINT fk_peticion_centro_entrega FOREIGN KEY (id_centro_entrega) references tb_centros_entregas (id_centro_entrega),
        CONSTRAINT fk_peticion_usuario FOREIGN KEY (id_usuario) references tb_usuarios (id_usuario)
    );

CREATE TABLE
    tb_tipos_permisos (
        id_tipo_permiso INT PRIMARY KEY AUTO_INCREMENT,
        id_clasificacion_permiso INT,
        /* NOT ID'S */
        tipo_permiso VARCHAR(50) UNIQUE,
        lapso ENUM ('1', '2', '3'),

        CONSTRAINT fk_tipo_clasificacion_permiso FOREIGN KEY (id_clasificacion_permiso) REFERENCES tb_clasificaciones_permisos(id_clasificacion_permiso)
    );

CREATE TABLE
    tb_permisos (
        id_permiso INT PRIMARY KEY AUTO_INCREMENT,
        id_usuario INT,
        id_tipo_permiso INT,
        id_estado_permiso INT,
        /* NOT ID'S */
        fecha_inicio DATETIME NOT NULL,
        fecha_final DATETIME NOT NULL,
        fecha_envio DATETIME NOT NULL,
        documento_permiso blob NOT NULL,
        descripcion_permiso VARCHAR(300),

        CONSTRAINT fk_permiso_usuario FOREIGN KEY (id_usuario) REFERENCES tb_usuarios(id_usuario),
        CONSTRAINT fk_permiso_tipo_permiso FOREIGN KEY (id_tipo_permiso) REFERENCES tb_tipos_permisos(id_tipo_permiso),
        CONSTRAINT fk_estado_permiso FOREIGN KEY (id_estado_permiso) REFERENCES tb_estados_permisos(id_estado_permiso)
    );

CREATE TABLE
    tb_permisos_automaticos (
        id_permiso_automatico INT PRIMARY KEY AUTO_INCREMENT,
        id_permiso INT,
        /* NOT ID'S */
        hora_envio time NOT NULL,
        estado boolean,
        CONSTRAINT fk_permiso_automatico FOREIGN KEY (id_permiso) REFERENCES tb_permisos(id_permiso)
    );

CREATE TABLE
    tb_administradores (
        id_administrador INT PRIMARY KEY AUTO_INCREMENT,
        id_tipo_administrador INT NOT NULL,
        /* NOT ID'S */
        nombre VARCHAR(50) NOT NULL,
        apellido VARCHAR(50) NOT NULL,
        clave VARCHAR(275) NOT NULL,
        correo VARCHAR(75) NOT NULL UNIQUE,
        imagen VARCHAR(75) DEFAULT 'default.png',

        CONSTRAINT fk_administrador_tipo FOREIGN KEY (id_tipo_administrador) REFERENCES tb_tipos_administradores(id_tipo_administrador)
    );
    
    CREATE TABLE
    tb_notificaciones (
        id_notificacion INT PRIMARY KEY AUTO_INCREMENT,
        id_administrador INT,
        id_permiso INT,
        /* NOT ID'S */
        fecha_envio DATETIME NOT NULL,
        descripcion VARCHAR(300),

        CONSTRAINT fk_notificacion_administrador FOREIGN KEY (id_administrador) REFERENCES tb_administradores(id_administrador),
        CONSTRAINT fk_notificacion_permiso FOREIGN KEY (id_permiso) REFERENCES tb_permisos(id_permiso)
    );

INSERT INTO tb_tipos_administradores(tipo_administrador) VALUES('root');

INSERT INTO tb_administradores(id_tipo_administrador, nombre, apellido, clave, correo) 
VALUES(1,'test','test','$2y$10$p.7X3wAn6IBX12DUJ3hAOexe/4LJdlrAf0Ij/3c0jdyurunzQaldm',
'test@root.com');