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