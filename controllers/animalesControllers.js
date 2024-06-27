var conexion = require('../config/conexion');
var animal = require("../model/animal");
var borrar = require("fs");

module.exports = {
    index: function(req, res) {
        animal.obtener(conexion, function(err, datos) {
            if (err) {
                console.error(err);
                res.status(500).send("Error al obtener los animales.");
                return;
            }
            res.render('animales/index', { title: 'EXPRESS', animales: datos });
        });
    },
    index2: function(req, res) {
        animal.obtener(conexion, function(err, datos) {
            if (err) {
                console.error(err);
                res.status(500).send("Error al obtener los animales.");
                return;
            }
            res.render('animales/index2', { title: 'EXPRESS', animales: datos });
        });
    },

    crear: function(req, res) {
        res.render('animales/ingresar');
    },

    guardar: function(req, res) {
        console.log(req.file.filename);
        console.log(req.body);

        animal.insertar(conexion, req.body, req.file, function(err) {
            if (err) {
                console.error(err);
                res.status(500).send("Error al guardar el animal.");
                return;
            }
            res.redirect('/animales');
        });
    },

    eliminar: function(req, res) {
        console.log("Datos Guardados")
        console.log("ID del animal a eliminar:", req.params.id);

        animal.retornarDatosID(conexion, req.params.id, function(err, registros) {
            if (err) {
                console.error(err);
                res.status(500).send("Error al obtener el animal para eliminar.");
                return;
            }

            var nombreImagen = "public/images/" + (registros[0].foto);

            // Verificar si el archivo existe antes de intentar eliminarlo
            if (borrar.existsSync(nombreImagen)) {
                borrar.unlinkSync(nombreImagen);
            }

            // Ahora procedemos a eliminar el registro en la base de datos
            animal.borrar(conexion, req.params.id, function(err) {
                if (err) {
                    console.error(err);
                    res.status(500).send("Error al eliminar el registro del animal.");
                    return;
                }
                res.redirect('/animales');
            });
        });
    },

    editar: function(req, res) {
        animal.retornarDatosID(conexion, req.params.id, function(err, registros) {
            if (err) {
                console.error(err);
                res.status(500).send("Error al obtener el animal para editar.");
                return;
            }
            console.log(registros[0]);
            res.render('animales/editar', { animal: registros[0] });
        });
    },

    actualizar: function(req, res) {
        console.log(req.body.nombre);

        if (req.file) {
            if (req.file.filename) {
                animal.retornarDatosID(conexion, req.body.id, function(err, registros) {
                    if (err) {
                        console.error(err);
                        res.status(500).send("Error al obtener el animal para actualizar la imagen.");
                        return;
                    }

                    var nombreImagen = "public/images/" + (registros[0].foto);

                    // Verificar si el archivo existe antes de intentar eliminarlo
                    if (borrar.existsSync(nombreImagen)) {
                        borrar.unlinkSync(nombreImagen);
                    }

                    animal.actualizarArchivos(conexion, req.body, req.file, function(err) {
                        if (err) {
                            console.error(err);
                            res.status(500).send("Error al actualizar la imagen del animal.");
                            return;
                        }
                    });
                });
            }
        }

        if (req.body.nombre) {
            animal.actualizar(conexion, req.body, function(err) {
                if (err) {
                    console.error(err);
                    res.status(500).send("Error al actualizar los datos del animal.");
                    return;
                }
            });
        }

        res.redirect('/animales');
    }
};
