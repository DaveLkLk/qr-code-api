const opcionesMenu = [
    {
        nombre: "dashboard",
        ruta: "/dashboard",
        orden: "1"
    },
    {
      nombre: "Mis Códigos QR",
      ruta: "/codigo-qr",
      orden: "2"
    },
    {
      nombre: "Crear Código QR",
      ruta: "/crear-qr",
      orden: "3"
    },
    {
      nombre: "Analíticas",
      ruta: "/analiticas",
      orden: "4"
    },
    {
      nombre: "Mi Cuenta",
      ruta: "/mi-cuenta",
      orden: "5"
    },
    {
      nombre: "Usuarios",
      ruta: "/usuarios",
      orden: "6"
    },
    {
      nombre: "Administración",
      ruta: "/admin",
      orden: "7"
    },
    {
      nombre: "Preguntas & Respuestas",
      ruta: "/faq",
      orden: "8"
    },
];
const usuarioSistema = [
    {
        usuario: 'joe',
        password: '123',
        nombre: 'Joe',
        apellido: 'Doe',
        email: 'joe@example.com',
        rol: 'admin',
    },
    {
        usuario: 'jane',
        password: '456',
        nombre: 'Jane',
        apellido: 'Doe',
        email: 'jane@example.com',
        rol: 'user',
    },
    {
        usuario: 'admin',
        password: '789',
        nombre: 'Admin',
        apellido: 'Admin',
        email: 'admin@example.com',
        rol: 'admin',
    },
    {
        usuario: 'Ben',
        password: '123',
        nombre: 'Ben',
        apellido: 'Johnson',
        email: 'ben@example.com',
        rol: 'user',
    }
];
const roles = [
    {
        nombre: 'admin',
        descripcion: 'Administrador del sistema',
    },
    {
        nombre: 'user',
        descripcion: 'Usuario normal del sistema',
    },
    {
        nombre: 'editor',
        descripcion: 'Editor del sistema',
    },
    {
        nombre: 'cliente',
        descripcion: 'Cliente del sistema',
    },
    {
        nombre: 'invitado',
        descripcion: 'Invitado al sistema',
    },
    {
        nombre: 'propietario',
        descripcion: 'Propietario del sistema',
    }
];
const permisos = [
    {
        nombre: 'admin',
        permisos: ['crear', 'editar', 'eliminar', 'listar', 'ver', 'imprimir', 'exportar'],
    },
    {
        nombre: 'user',
        permisos: ['crear', 'editar', 'eliminar', 'listar', 'ver', 'imprimir'],
    },
    {
        nombre: 'editor',
        permisos: ['crear', 'editar', 'eliminar', 'listar', 'ver'],
    },
    {
        nombre: 'cliente',
        permisos: ['listar', 'ver'],
    },
    {
        nombre: 'invitado',
        permisos: [],
    },
    {
        nombre: 'propietario',
        permisos: ['crear', 'editar', 'eliminar', 'listar', 'ver', 'imprimir', 'exportar'],
    }
];
const rolOpcion = [
    {
        rol: 'admin',
        opcion: ['1', '2', '3', '4', '5', '6', '7', '8'],
    }
];
// SIMULACION DE TABLAS
const tipoParticipacion = [
    {
        idParticipacion: 1,
        nombre: 'Ponente',
        descripcion: 'Participa en las conferencias y charlas', 
    },
    {
        idParticipacion: 2,
        nombre: 'Organizador',
        descripcion: 'Invita a colaboradores a eventos',
    },
    {
        idParticipacion: 3,
        nombre: 'Asistente',
        descripcion: 'Asiste en las conferencias y charlas',
    },
    {
        idParticipacion: 4,
        nombre: 'Colaborador',
        descripcion: 'Colabora en eventos, es responsable en la organización o el evento',
    }
]
const tipoPersona = [
    {
        idPersona: 1,
        nombre: 'Docente',
        descripcion: 'Docente de la UNTELS'
    },
    {
        idPersona: 2,
        nombre: 'Alumno',
        descripcion: 'Estudiante de la UNTELS'
    },
    {
        idPersona: 3,
        nombre: 'Administrativo',
        descripcion: 'Funcionario administrativo de la UNTELS'
    },
    {
        idPersona: 4,
        nombre: 'Publico',
        descripcion: 'Público General que participa'
    }
]
const tipoCertificadoEstado = [
    {
        idEstado: 1,
        nombre: 'Emitido',
        descripcion: 'Certificado emitido'
    },
    {
        idEstado: 2,
        nombre: 'Expirado',
        descripcion: 'Certificado expirado'
    },
    {
        idEstado: 3,
        nombre: 'Pendiente',
        descripcion: 'Certificado pendiente de emitir'
    },
    {
        idEstado: 4,
        nombre: 'Rechazado',
        descripcion: 'Certificado rechazado'
    },
    {
        idEstado: 5,
        nombre: 'Renovación',
        descripcion: 'Certificado en renovación'
    },
    {
        idEstado: 99,
        nombre: 'Anulado',
        descripcion: 'Certificado anulado y no muestra información del usuario'
    }
]
const tipoAprobacionCertificado = [
    {
        idAprobacion: 1,
        nombre: 'Resolución Rectoral',
        descripcion: 'Resolución del Rector que aprueba el certificado'
    },
    {
        idAprobacion: 2,
        nombre: 'Oficio',
        descripcion: 'Oficio que aprueba el Secretario General'
    },
    {
        idAprobacion: 3,
        nombre: 'Reglamento Interno',
        descripcion: 'Reglamento Interno que aprueba el certificado'
    },
    {
        idAprobacion: 4,
        nombre: 'Acuerdo de Consejo',
        descripcion: 'Acuerdo de Consejo que aprueba el certificado'
    },
    {
        idAprobacion: 5,
        nombre: 'Otros',
        descripcion: 'Otros métodos de aprobación'
    }
]
const usuarios = [
    {
        idUsuario: 1,
        usuario: 'joe',
        password: '123',//hash
        nombre: 'Joe',
        apellido: 'Doe',
        email: 'joe@example.com',
        dni: '89745632',
        participacion_id: 1,
        tipoPersona_id: 1,
        data_id: 215 //dbo.alumno || recursosHumanos.personal
    },
    {
        idUsuario: 2,
        usuario: 'jane',
        password: '456',//hash
        nombre: 'Jane',
        apellido: 'Doe',
        email: 'jane@example.com',
        dni: '12745632',
        participacion_id: 1,
        tipoPersona_id: 2,
        data_id: 216 //dbo.alumno || recursosHumanos.personal
    },
    {
        idUsuario: 3,
        usuario: 'admin',
        password: '789',//hash
        nombre: 'Admin',
        apellido: 'Admin',
        email: 'admin@example.com',
        dni: '56745632',
        participacion_id: 1,
        tipoPersona_id: 3,
        data_id: 1 //dbo.personal
    },
    {
        idUsuario: 4,
        usuario: 'Ben',
        password: '123',//hash
        nombre: 'Ben',
        apellido: 'Johnson',
        email: 'ben@example.com',
        dni: '62145632',
        participacion_id: 3,
        tipoPersona_id: 2,
        data_id: 217 //dbo.alumno || recursosHumanos.personal
    }
]
const usuarioCertificados = [
    {
        idCertificado: 1,//primary key
        usuario_id: 2,
        area_id: null, //referencia al area o null
        codigo_qr: 'abc456',
        fechaEmision: '2024-11-22',
        pathArchivo: '/certificado/alumno/alumno-12345',
        libro: '1',
        folio: '70',
        numRegistro: '1611',
        aprobacion_tipo: 1,
        aprobacion_num: 'N°094-2024-UNTELS-R',
        estado_id: 1
    },
    {
        idCertificado: 2,
        usuario_id: 3,
        area_id: 1, //referencia al area o null
        codigo_qr: 'def789',
        fechaEmision: '2024-12-23',
        pathArchivo: '/certificado/personal/personal-12345',
        libro: '2',
        folio: '80',
        numRegistro: '1612',
        aprobacion_tipo: 2,
        aprobacion_num: 'N°123-2024-UNTELS-S',
        estado_id: 1
    },
    {
        idCertificado: 3,
        usuario_id: 4,
        area_id: 2, //referencia al area o null
        codigo_qr: 'ghi901',
        fechaEmision: '2024-10-24',
        pathArchivo: '/certificado/administrativo/administrativo-12345',
        libro: '3',
        folio: '90',
        numRegistro: '1613',
        aprobacion_tipo: 3,
        aprobacion_num: 'N°056-2024-UNTELS-R',
        estado_id: 1
    },
    {
        idCertificado: 4,
        usuario_id: 1,
        area_id: null, //referencia al area o null
        codigo_qr: 'jkl012',
        fechaEmision: '2024-09-25',
        pathArchivo: '/certificado/publico/publico-12345',
        libro: '4',
        folio: '100',
        numRegistro: '1614',
        aprobacion_tipo: 4,
        aprobacion_num: 'N°089-2024-UNTELS-S',
        estado_id: 1
    }
];

module.exports = {
    tipoParticipacion,
    tipoPersona,
    tipoCertificadoEstado,
    usuarios,
    usuarioCertificados
}