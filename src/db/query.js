const QUERY = {
    get_personas: 'SELECT * FROM Certificados.personas',
    get_tipoParticipacion: 'SELECT * FROM Certificados.tipoParticipacion',
    get_estadoPersona: 'SELECT * FROM Certificados.estadoPersona',
    get_tipoCargo: 'SELECT * FROM Certificados.tipoCargo',
    get_areas: "SELECT * FROM general.area WHERE Gestion <> 'CO' ",
    post_persona: "SELECT * FROM Certificados.personas WHERE num_doc = @dni",
    post_data_persona: "SELECT * FROM Certificados.personas WHERE codigo_hash = @hash",
    post_codigo: "SELECT p.path_certificado,p.fecha_carga,p.ap_paterno,p.ap_materno,p.nombres,tc.nombre AS cargo FROM Certificados.personas p JOIN Certificados.tipoCargo tc ON p.cargo_id = tc.id WHERE codigo_hash = @hash",
    query_tipoDoc: "SELECT * FROM general.grupoTipos WHERE idGrupo='009' AND descripcionTipo LIKE '%' + @tipo_doc + '%' ",
    query_area: "SELECT * FROM general.area WHERE descripcion like '%' + @oficina + '%' AND Gestion <> 'CO' ",
    query_tipoParticipacion: "SELECT * FROM Certificados.tipoParticipacion WHERE nombre like '%' + @nombre + '%' ",
    query_tipoCargo: "SELECT * FROM Certificados.tipoCargo WHERE nombre like '%' + @nombre + '%' ",
    // ------------
    query_estadoPersona: "SELECT * FROM Certificados.estadoPersona WHERE nombre like '%' + @nombre + '%' AND id_estado = @id_estado ",
    // --------------
    get_alumno: "SELECT * FROM dbo.alumno where pat=@pat and mat=@mat and nom LIKE '%'+@nom+'%'",
    get_rename: "SELECT p.id,p.nombres,p.ap_paterno,p.ap_materno,p.path_certificado,tc.nombre AS cargo  FROM Certificados.personas p JOIN Certificados.tipoCargo tc ON p.cargo_id = tc.id where REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(p.ap_paterno, 'á', 'a'), 'é', 'e'), 'í', 'i'), 'ó', 'o'), 'ú', 'u') = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(@pat, 'á', 'a'), 'é', 'e'), 'í', 'i'), 'ó', 'o'), 'ú', 'u') AND REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(p.ap_materno, 'á', 'a'), 'é', 'e'), 'í', 'i'), 'ó', 'o'), 'ú', 'u') = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(@mat, 'á', 'a'), 'é', 'e'), 'í', 'i'), 'ó', 'o'), 'ú', 'u') AND REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(p.nombres, 'á', 'a'), 'é', 'e'), 'í', 'i'), 'ó', 'o'), 'ú', 'u') LIKE '%' + REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(@nom, 'á', 'a'), 'é', 'e'), 'í', 'i'), 'ó', 'o'), 'ú', 'u') + '%' AND p.fecha_carga = @date",
    in_personas_scope: "INSERT INTO Certificados.personas (ap_paterno,ap_materno,nombres,tipo_doc, num_doc,correo_institucional,correo_personal) VALUES (@aPaterno,@aMaterno,@nombres,@tipo_doc,@num_doc,@c_inst,@c_perso); SELECT  SCOPE_IDENTITY() AS idPersona;",//inserta y devuelve el id de la persona agregada
    in_personaEvento: "INSERT INTO Certificados.personaEvento (persona_id,evento_id,participacion_id,estado_persona_id,cargo_id,oficina_id,path_certificado,codigo_hash,observaciones) VALUES (@idPersona,@idEvento,@idParticipacion,@idEstado,@idCargo,@idOficina,@path,@hash,@obs);",
    in_evento: "INSERT INTO Certificados.detalle (evento, fecha_evento, lugar, fecha_carga, observacion) VALUES (@evento, @fecha_evento, @lugar,@fecha_carga, @obs)",
    // PROCEDIMIENTOS ALMACENADOS
    sp_crearPersona: "Certificados.USP_CERT_INS_CREAR_PERSONA",
    sp_getSedes: "Certificados.USP_CERT_GET_SEDES",
}
module.exports = {QUERY}