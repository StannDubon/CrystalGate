INSERT INTO tb_cargos (cargo) VALUES
('Manager'),
('Developer'),
('Analyst'),
('Designer'),
('Tester');

INSERT INTO tb_usuarios (id_cargo, nombre, apellido, clave, correo, imagen) VALUES
(1, 'John', 'Doe', 'password123', 'john.doe@example.com', 'john_doe.png'),
(2, 'Jane', 'Smith', 'password456', 'jane.smith@example.com', 'jane_smith.png'),
(3, 'Alice', 'Johnson', 'password789', 'alice.johnson@example.com', 'alice_johnson.png'),
(4, 'Bob', 'Brown', 'password012', 'bob.brown@example.com', 'bob_brown.png'),
(5, 'Charlie', 'Davis', 'password345', 'charlie.davis@example.com', 'charlie_davis.png');

INSERT INTO tb_permisos (id_usuario, id_tipo_permiso, fecha_inicio, fecha_final, fecha_envio, documento_permiso, descripcion_permiso, estado) VALUES
(1, 1, '2024-07-01 08:00:00', '2024-07-10 17:00:00', '2024-06-25 09:00:00', 'doc_12345.pdf', 'Family emergency', '1'),
(2, 2, '2024-07-05 09:00:00', '2024-07-12 18:00:00', '2024-06-25 10:30:00', 'doc_12346.docx', 'Medical appointment', '1'),
(3, 1, '2024-07-15 08:30:00', '2024-07-20 17:30:00', '2024-06-26 11:00:00', 'doc_12347.pdf', 'Vacation request', '1'),
(4, 3, '2024-07-02 09:00:00', '2024-07-02 12:00:00', '2024-06-26 12:15:00', 'doc_12348.docx', 'Official business', '2'),
(5, 2, '2024-07-08 10:00:00', '2024-07-14 16:00:00', '2024-06-26 13:00:00', 'doc_12349.pdf', 'Personal leave', '3');