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
        estado BOOLEAN DEFAULT TRUE,

        permisos BOOLEAN DEFAULT FALSE,
		documentacion BOOLEAN DEFAULT FALSE,

        empleados_view BOOLEAN DEFAULT FALSE,
		empleados_update BOOLEAN DEFAULT FALSE,
        empleados_delete BOOLEAN DEFAULT FALSE,
        empleados_add BOOLEAN DEFAULT FALSE,

		administradores_view BOOLEAN DEFAULT FALSE,
		administradores_update BOOLEAN DEFAULT FALSE,
		administradores_delete BOOLEAN DEFAULT FALSE,
		administradores_add BOOLEAN DEFAULT FALSE,

		autorizaciones_view BOOLEAN DEFAULT FALSE,
		autorizaciones_update BOOLEAN DEFAULT FALSE,
		autorizaciones_delete BOOLEAN DEFAULT FALSE,
		autorizaciones_add BOOLEAN DEFAULT FALSE,

        tipo_administrador_view BOOLEAN DEFAULT FALSE,
        tipo_administrador_update BOOLEAN DEFAULT FALSE,
        tipo_administrador_delete BOOLEAN DEFAULT FALSE,
        tipo_administrador_add BOOLEAN DEFAULT FALSE
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
	 tb_gestores_notificaciones(
		  id_gestor_notificacion INT PRIMARY KEY AUTO_INCREMENT,
		  id_usuario INT NOT NULL,
		  token VARCHAR(256) UNIQUE,
		  estado BOOLEAN DEFAULT TRUE,
		  
		  CONSTRAINT fk_notificacion_usuario FOREIGN KEY (id_usuario) REFERENCES tb_usuarios(id_usuario)
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
        nombre_entrega VARCHAR(64),
        email_entrega VARCHAR(128),
        telefono_contacto VARCHAR(16),
        estado ENUM('1','2','3','4'), /*1= Pending, 2= Accepted, 3= Rejected, 4 = Ready to pickup */
        fecha_envio DATETIME,
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
        estado BOOLEAN DEFAULT TRUE,
        
        CONSTRAINT fk_tipo_clasificacion_permiso FOREIGN KEY (id_clasificacion_permiso) REFERENCES tb_clasificaciones_permisos(id_clasificacion_permiso)
    );

CREATE TABLE
    tb_permisos (
        id_permiso INT PRIMARY KEY AUTO_INCREMENT,
        id_usuario INT,
        id_tipo_permiso INT,
        /* NOT ID'S */
        fecha_inicio DATETIME NOT NULL,
        fecha_final DATETIME NOT NULL,
        fecha_envio DATETIME NOT NULL,
        documento_permiso varchar(32) NOT NULL,
        descripcion_permiso VARCHAR(300),

        estado ENUM ('1', '2', '3'), /*1= Pending, 2= Accepted, 3= Rejected */
        CONSTRAINT fk_permiso_usuario FOREIGN KEY (id_usuario) REFERENCES tb_usuarios(id_usuario),
        CONSTRAINT fk_permiso_tipo_permiso FOREIGN KEY (id_tipo_permiso) REFERENCES tb_tipos_permisos(id_tipo_permiso)
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
		   validator DATETIME,
        validatorcount INT DEFAULT 0,
        cambio_contraseña DATETIME DEFAULT (NOW() + INTERVAL 90 DAY),
        2fa BOOLEAN DEFAULT (0),	
        CONSTRAINT fk_administrador_tipo FOREIGN KEY (id_tipo_administrador) REFERENCES tb_tipos_administradores(id_tipo_administrador)
    );
    
    CREATE TABLE
    tb_notificaciones (
        id_notificacion INT PRIMARY KEY AUTO_INCREMENT,
        id_administrador INT,
        id_permiso INT,
        id_peticion INT,
        /* NOT ID'S */
        tipo_notificacion ENUM('1','2','3','4') DEFAULT '1', /*1 = Informative; 2 = Accepted; 3 = Declined; 4 = Ready to pickup*/
        fecha_envio DATETIME NOT NULL,
        descripcion VARCHAR(300),

        CONSTRAINT fk_notificacion_administrador FOREIGN KEY (id_administrador) REFERENCES tb_administradores(id_administrador),
        CONSTRAINT fk_notificacion_permiso FOREIGN KEY (id_permiso) REFERENCES tb_permisos(id_permiso),
        CONSTRAINT fk_notificacion_peticion FOREIGN KEY (id_peticion) REFERENCES tb_peticiones(id_peticion)
    );

INSERT INTO tb_tipos_administradores VALUES(
/* id */ 1,
/* Nombre */ "root",
/* Estado */ 1,

/* PERMISOS */ 1,
/* DOCUMENTACION */ 1,

/* Empleados VER */ 1,
/* Empleados ACTUALIZAR */ 1,
/* Empleados ELIMINAR */ 1,
/* Empleados AGREGAR */ 1,

/* Administradores VER */ 1,
/* Administradores ACTUALIZAR */ 1,
/* Administradores ELIMINAR */ 1,
/* Administradores AGREGAR */ 1,

/* Autorizaciones VER */ 1,
/* Autorizaciones ACTUALIZAR */ 1,
/* Autorizaciones ELIMINAR */ 1,
/* Autorizaciones AGREGAR */ 1,

/* Tipos de administrador VER */ 1,
/* Tipos de administrador ACTUALIZAR */ 1,
/* Tipos de administrador ELIMINAR */ 1,
/* Tipos de administrador AGREGAR */ 1
);


INSERT INTO tb_cargos (cargo, estado) 
VALUES ('Administrador', 1);
SELECT * FROM tb_cargos;

INSERT INTO tb_clasificaciones_permisos(clasificacion_permiso) VALUES
("Medical Leave"),
("Permissions"),
("Vacation Request");

INSERT INTO tb_tipos_permisos(id_clasificacion_permiso, tipo_permiso, lapso) VALUES
(1, "ISSS", "3"),
(1, "Service of Public Health", "3"),
(1, "Service of Private Health", "3");

INSERT INTO tb_tipos_permisos(id_clasificacion_permiso, tipo_permiso, lapso) VALUES
(2, "Medical Appointment", "3"),
(2, "Emergency Appointment", "3"),
(2, "Family Emergency", "3"),
(2, "Bereavement Leave", "3"),
(2, "Marriage Leave", "3"),
(2, "Paternity Leave", "3"),
(2, "Personal Process", "3"),
(2, "Court Date", "3"),
(2, "Breastfeeding", "3"),
(2, "Personal Day", "3"),
(2, "Other", "3");

INSERT INTO tb_tipos_permisos(id_clasificacion_permiso, tipo_permiso, lapso) VALUES
(3, "Vacations", "3");

INSERT INTO tb_administradores(id_tipo_administrador, nombre, apellido, clave, correo, imagen) 

VALUES(1,'test','test','$2y$10$fJZIRCJZMXXF8cRBMdDMDOjESQb63xBiWAK1jrXEscJDdLKyYHlgG',
'test@root.com', 'test.png');
/* CONTRASEÑA: 123123123 */


DELIMITER $$

CREATE PROCEDURE set_validator(
    p_email_administrador VARCHAR(100)
)
BEGIN
    DECLARE v_current_datetime DATETIME;
    SET v_current_datetime = NOW();
    UPDATE tb_administradores
    SET validator = DATE_ADD(v_current_datetime, INTERVAL 1 DAY)
    WHERE correo = p_email_administrador; -- Cambié 'email_administrador' a 'correo'
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE update_validator_count(
    p_email_administrador VARCHAR(100)
)
BEGIN
    DECLARE v_current_validatorcount INT;

    -- Obtener el valor actual de validatorcount
    SELECT COALESCE(validatorcount, 0) INTO v_current_validatorcount
    FROM tb_administradores  -- Corregido a 'tb_administradores'
    WHERE correo = p_email_administrador;  -- Corregido a 'correo'

    IF v_current_validatorcount <= 3 THEN
        	-- Incrementar validatorcount
    		SET v_current_validatorcount = v_current_validatorcount + 1;
    		
    		-- Actualizar el valor en la tabla
		    UPDATE tb_administradores  -- Corregido a 'tb_administradores'
		    SET validatorcount = v_current_validatorcount
		    WHERE correo = p_email_administrador;  -- Corregido a 'correo'
    END IF;
    -- Llamar a set_validator si es necesario
    IF v_current_validatorcount = 3 THEN
        CALL set_validator(p_email_administrador);
    END IF;
END $$

DELIMITER ;


DELIMITER $$ 

CREATE PROCEDURE clear_past_validators()
BEGIN
    UPDATE tb_administradores  -- Cambié 'tb_administrador' a 'tb_administradores'
    SET validator = NULL,
        validatorcount = 0
    WHERE validator <= NOW();
END $$

DELIMITER ;

DELIMITER //

CREATE FUNCTION verificar_cambio_contraseña(id INT)
RETURNS INT
BEGIN
    DECLARE fecha_cambio DATETIME;

    SELECT cambio_contraseña INTO fecha_cambio
    FROM tb_administradores  -- Cambié 'tb_administrador' a 'tb_administradores'
    WHERE id_administrador = id;  -- Asegúrate de que este campo exista en tu tabla

    IF fecha_cambio <= NOW() THEN
        RETURN 1;  -- Contraseña necesita ser cambiada
    ELSE
        RETURN 0;  -- Contraseña está actualizada
    END IF;
END //

DELIMITER ;


DELIMITER $$

CREATE TRIGGER tr_update_cambio_contraseña
BEFORE UPDATE ON tb_administradores  -- Cambié 'tb_administrador' a 'tb_administradores'
FOR EACH ROW
BEGIN
    IF NEW.clave <> OLD.clave THEN  -- Cambié 'contraseña_administrador' a 'clave'
        SET NEW.cambio_contraseña = NOW() + INTERVAL 90 DAY;
    END IF;
END $$

DELIMITER ;

DELIMITER $$ 

CREATE PROCEDURE clear_validator(IN id INT)
BEGIN
    UPDATE tb_administradores  -- Cambié 'tb_administrador' a 'tb_administradores'
    SET validator = NULL,
        validatorcount = 0
    WHERE id_administrador = id;
END $$

DELIMITER ;

