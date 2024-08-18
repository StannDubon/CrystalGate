INSERT INTO tb_cargos (cargo) VALUES
('Manager'),
('Developer'),
('Analyst'),
('Designer'),
('Tester');


INSERT INTO tb_usuarios (id_cargo, nombre, apellido, clave, correo) VALUES
(1, 'John', 'Doe', 'password123', 'john.doe@example.com'),
(2, 'Jane', 'Smith', 'password456', 'jane.smith@example.com'),
(3, 'Alice', 'Johnson', 'password789', 'alice.johnson@example.com'),
(4, 'Bob', 'Brown', 'password012', 'bob.brown@example.com'),
(5, 'Charlie', 'Davis', 'password345', 'charlie.davis@example.com');

INSERT INTO tb_permisos (id_usuario, id_tipo_permiso, fecha_inicio, fecha_final, fecha_envio, documento_permiso, descripcion_permiso, estado) VALUES
(1, 1, '2024-07-01 08:00:00', '2024-07-10 17:00:00', '2024-06-25 09:00:00', 'doc_12345.pdf', 'Family emergency', '1'),
(2, 2, '2024-07-05 09:00:00', '2024-07-12 18:00:00', '2024-06-25 10:30:00', 'doc_12346.docx', 'Medical appointment', '1'),
(3, 1, '2024-07-15 08:30:00', '2024-07-20 17:30:00', '2024-06-26 11:00:00', 'doc_12347.pdf', 'Vacation request', '1'),
(4, 3, '2024-07-02 09:00:00', '2024-07-02 12:00:00', '2024-06-26 12:15:00', 'doc_12348.docx', 'Official business', '1'),
(5, 2, '2024-07-08 10:00:00', '2024-07-14 16:00:00', '2024-06-26 13:00:00', 'doc_12349.pdf', 'Personal leave', '1');

INSERT INTO tb_tipos_peticiones(tipo_peticion) VALUES
('Request A'),
('Request B'),
('Request C');

INSERT INTO tb_idiomas(idioma) VALUES
('English'),
('Spanish'),
('French');

INSERT INTO tb_centros_entregas(centro_entrega) VALUES
('Center 1'),
('Center 2'),
('Center 3');

INSERT INTO tb_peticiones(id_usuario, id_tipo_peticion, id_idioma, id_centro_entrega, direccion, modo_entrega, telefono_contacto, estado) VALUES
(1, 1, 1, 1, '123 Main St', TRUE, '555-1234',1),
(2, 2, 2, 2, '456 Oak St', FALSE, '555-5678',1),
(3, 3, 3, 3, '789 Pine St', TRUE, '555-9101',1),
(4, 1, 1, 1, '101 Maple St', FALSE, '555-1122',1),
(1, 2, 2, 2, '202 Elm St', TRUE, '555-1234',1),
(2, 3, 3, 3, '303 Birch St', FALSE, '555-5678',2),
(3, 1, 1, 1, '404 Cedar St', TRUE, '555-9101',2),
(4, 2, 2, 2, '505 Spruce St', FALSE, '555-1122',2),
(1, 3, 3, 3, '606 Walnut St', TRUE, '555-1234',3),
(2, 1, 1, 1, '707 Hickory St', FALSE, '555-5678',3);

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



-- 7 de agosto de 2024
INSERT INTO tb_peticiones(id_usuario, id_tipo_peticion, id_idioma, id_centro_entrega, direccion, modo_entrega, telefono_contacto, estado, fecha_envio) VALUES
(1, 1, 1, 1, '123 Main St', TRUE, '555-1234',1, '2024-08-07 14:30:00'),
(2, 2, 2, 2, '456 Oak St', FALSE, '555-5678',1, '2024-08-07 16:45:00');

-- 8 de agosto de 2024
INSERT INTO tb_peticiones(id_usuario, id_tipo_peticion, id_idioma, id_centro_entrega, direccion, modo_entrega, telefono_contacto, estado, fecha_envio) VALUES
(3, 3, 3, 3, '789 Pine St', TRUE, '555-9101',1, '2024-08-08 10:15:00'),
(4, 1, 1, 1, '101 Maple St', FALSE, '555-1122',1, '2024-08-08 18:00:00');

-- 9 de agosto de 2024
INSERT INTO tb_peticiones(id_usuario, id_tipo_peticion, id_idioma, id_centro_entrega, direccion, modo_entrega, telefono_contacto, estado, fecha_envio) VALUES
(1, 2, 2, 2, '202 Elm St', TRUE, '555-1234',1, '2024-08-09 12:20:00'),
(2, 3, 3, 3, '303 Birch St', FALSE, '555-5678',2, '2024-08-09 14:50:00');

-- 10 de agosto de 2024
INSERT INTO tb_peticiones(id_usuario, id_tipo_peticion, id_idioma, id_centro_entrega, direccion, modo_entrega, telefono_contacto, estado, fecha_envio) VALUES
(3, 1, 1, 1, '404 Cedar St', TRUE, '555-9101',2, '2024-08-10 09:10:00'),
(4, 2, 2, 2, '505 Spruce St', FALSE, '555-1122',2, '2024-08-10 15:35:00');

-- 11 de agosto de 2024
INSERT INTO tb_peticiones(id_usuario, id_tipo_peticion, id_idioma, id_centro_entrega, direccion, modo_entrega, telefono_contacto, estado, fecha_envio) VALUES
(1, 3, 3, 3, '606 Walnut St', TRUE, '555-1234',3, '2024-08-11 11:55:00'),
(2, 1, 1, 1, '707 Hickory St', FALSE, '555-5678',3, '2024-08-11 17:25:00');

-- 12 de agosto de 2024
INSERT INTO tb_peticiones(id_usuario, id_tipo_peticion, id_idioma, id_centro_entrega, direccion, modo_entrega, telefono_contacto, estado, fecha_envio) VALUES
(3, 2, 2, 2, '808 Willow St', TRUE, '555-2345',1, '2024-08-12 13:40:00'),
(4, 3, 3, 3, '909 Poplar St', FALSE, '555-6789',1, '2024-08-12 18:55:00');

-- 13 de agosto de 2024
INSERT INTO tb_peticiones(id_usuario, id_tipo_peticion, id_idioma, id_centro_entrega, direccion, modo_entrega, telefono_contacto, estado, fecha_envio) VALUES
(1, 1, 1, 1, '1010 Cypress St', TRUE, '555-9102',2, '2024-08-13 08:25:00'),
(2, 2, 2, 2, '1111 Fir St', FALSE, '555-1123',2, '2024-08-13 19:15:00');

-- 14 de agosto de 2024
INSERT INTO tb_peticiones(id_usuario, id_tipo_peticion, id_idioma, id_centro_entrega, direccion, modo_entrega, telefono_contacto, estado, fecha_envio) VALUES
(3, 3, 3, 3, '1212 Pine St', TRUE, '555-2346',3, '2024-08-14 10:50:00'),
(4, 1, 1, 1, '1313 Oak St', FALSE, '555-6780',3, '2024-08-14 15:20:00');

-- 15 de agosto de 2024
INSERT INTO tb_peticiones(id_usuario, id_tipo_peticion, id_idioma, id_centro_entrega, direccion, modo_entrega, telefono_contacto, estado, fecha_envio) VALUES
(1, 2, 2, 2, '1414 Cedar St', TRUE, '555-9103',1, '2024-08-15 09:45:00'),
(2, 3, 3, 3, '1515 Maple St', FALSE, '555-1124',1, '2024-08-15 17:10:00');

-- 16 de agosto de 2024
INSERT INTO tb_peticiones(id_usuario, id_tipo_peticion, id_idioma, id_centro_entrega, direccion, modo_entrega, telefono_contacto, estado, fecha_envio) VALUES
(3, 1, 1, 1, '1616 Spruce St', TRUE, '555-2347',2, '2024-08-16 11:30:00'),
(4, 2, 2, 2, '1717 Birch St', FALSE, '555-6781',2, '2024-08-16 14:55:00');

-- 17 de agosto de 2024
INSERT INTO tb_peticiones(id_usuario, id_tipo_peticion, id_idioma, id_centro_entrega, direccion, modo_entrega, telefono_contacto, estado, fecha_envio) VALUES
(1, 3, 3, 3, '1818 Elm St', TRUE, '555-9104',3, '2024-08-17 08:05:00'),
(2, 1, 1, 1, '1919 Walnut St', FALSE, '555-1125',3, '2024-08-17 19:35:00');

-- 18 de agosto de 2024
INSERT INTO tb_peticiones(id_usuario, id_tipo_peticion, id_idioma, id_centro_entrega, direccion, modo_entrega, telefono_contacto, estado, fecha_envio) VALUES
(3, 2, 2, 2, '2020 Hickory St', TRUE, '555-2348',1, '2024-08-18 14:20:00'),
(4, 3, 3, 3, '2121 Cypress St', FALSE, '555-6782',1, '2024-08-18 16:45:00');

-- 19 de agosto de 2024
INSERT INTO tb_peticiones(id_usuario, id_tipo_peticion, id_idioma, id_centro_entrega, direccion, modo_entrega, telefono_contacto, estado, fecha_envio) VALUES
(1, 1, 1, 1, '2222 Pine St', TRUE, '555-9105',2, '2024-08-19 11:10:00'),
(2, 2, 2, 2, '2323 Oak St', FALSE, '555-1126',2, '2024-08-19 18:30:00');

-- 20 de agosto de 2024
INSERT INTO tb_peticiones(id_usuario, id_tipo_peticion, id_idioma, id_centro_entrega, direccion, modo_entrega, telefono_contacto, estado, fecha_envio) VALUES
(3, 3, 3, 3, '2424 Cedar St', TRUE, '555-2349',3, '2024-08-20 13:55:00'),
(4, 1, 1, 1, '2525 Maple St', FALSE, '555-6783',3, '2024-08-20 15:40:00');
