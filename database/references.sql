-- Relación entre tb_usuarios y tb_cargos
ALTER TABLE tb_usuarios 
ADD CONSTRAINT fk_usuario_cargo 
FOREIGN KEY (id_cargo) 
REFERENCES tb_cargos(id_cargo);

-- Relación entre tb_usuarios y tb_permisos
ALTER TABLE tb_permisos 
ADD CONSTRAINT fk_permiso_usuario 
FOREIGN KEY (id_usuario) 
REFERENCES tb_usuarios(id_usuario);

-- Relación entre tb_permisos y tb_tipos_permisos
ALTER TABLE tb_permisos 
ADD CONSTRAINT fk_permiso_tipo 
FOREIGN KEY (id_tipo_permiso) 
REFERENCES tb_tipos_permisos(id_tipo_permiso);

-- Relación entre tb_permisos y tb_estados_permisos
ALTER TABLE tb_permisos 
ADD CONSTRAINT fk_permiso_estado 
FOREIGN KEY (id_estado_permiso) 
REFERENCES tb_estados_permisos(id_estado_permiso);

-- Relación entre tb_permisos_automaticos y tb_permisos
ALTER TABLE tb_permisos_automaticos 
ADD CONSTRAINT fk_permiso_auto_permiso 
FOREIGN KEY (id_permiso) 
REFERENCES tb_permisos(id_permiso);

-- Relación entre tb_administradores y tb_tipos_administradores
ALTER TABLE tb_administradores 
ADD CONSTRAINT fk_administrador_tipo 
FOREIGN KEY (id_tipo_administrador) 
REFERENCES tb_tipos_administradores(id_tipo_administrador);

-- Relación entre tb_notificaciones y tb_administradores
ALTER TABLE tb_notificaciones 
ADD CONSTRAINT fk_notificacion_administrador 
FOREIGN KEY (id_administrador) 
REFERENCES tb_administradores(id_administradores);

-- Relación entre tb_notificaciones y tb_permisos
ALTER TABLE tb_notificaciones 
ADD CONSTRAINT fk_notificacion_permiso 
FOREIGN KEY (id_permiso) 
REFERENCES tb_permisos(id_permiso);