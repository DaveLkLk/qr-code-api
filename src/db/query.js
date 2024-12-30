const QUERY = {
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
    get_dataCertificado: "SELECT e.evento, e.fecha_evento, e.aux1, pe.oficina_id, a.descripcion as 'owner' FROM Certificados.personaEvento pe JOIN Certificados.Evento e ON pe.evento_id = e.id JOIN general.area a ON e.owner_id = a.idArea JOIN dbo.tipSala ts ON e.lugar_id = ts.idTipSala WHERE pe.codigo_hash = @codigo_hash;",

    // PROCEDIMIENTOS ALMACENADOS
    sp_crearPersona: "Certificados.USP_CERT_INS_CREAR_PERSONA",
    sp_getSedes: "Certificados.USP_CERT_GET_SEDES",
    sp_getEstadoPersona: "Certificados.USP_CERT_GET_ESTADO_PERSONA",
    sp_getTipoDoc: "Certificados.USP_CERT_GET_TIPO_DOC",
    sp_getTipoCargo: "Certificados.USP_CERT_GET_TIPO_CARGO",
    sp_getArea: "general.USP_GET_AREA_ID",
    sp_getParticipacion: "Certificados.USP_CERT_GET_VALIDAR_PARTICIPACION",
    sp_validarCertificado: "Certificados.USP_CERT_GET_VALIDAR_CERTIFICADO",
    sp_getDatallePersona: "Certificados.USP_CERT_GET_DETALLE_PERSONA"
}
module.exports = {QUERY}



