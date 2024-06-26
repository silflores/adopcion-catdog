module.exports = {
    obtener: function(conexion, funcion) {
        conexion.query("SELECT * FROM animales", funcion);
    },

    insertar: function(conexion, datos, archivos, funcion) {
        conexion.query("INSERT INTO animales (nombre, tipo, sexo, edad, foto, email) VALUES (?,?,?,?,?,?)",
            [datos.nombre, datos.tipo, datos.sexo, datos.edad, archivos.filename, datos.email],
            funcion
        );
    },

    retornarDatosID: function(conexion, id, funcion) {
        conexion.query("SELECT * FROM animales WHERE id = ?", [id], funcion);
    },

    borrar: function(conexion, id, funcion) {
        conexion.query("DELETE FROM animales WHERE id = ?", [id], funcion);
    },

    actualizar: function(conexion, datos, funcion) {
        conexion.query("UPDATE animales SET nombre = ?, tipo = ?, sexo = ?, edad = ?, email = ? WHERE id = ?",
            [datos.nombre, datos.tipo, datos.sexo, datos.edad, datos.email, datos.id],
            funcion
        );
    },

    actualizarArchivos: function(conexion, datos, archivos, funcion) {
        conexion.query("UPDATE animales SET foto = ? WHERE id = ?",
            [archivos.filename, datos.id],
            funcion
        );
    }
};
