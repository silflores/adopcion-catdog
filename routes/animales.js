var express = require('express');
var router = express.Router();
const animalesControllers = require("../controllers/animalesControllers");
var multer = require('multer');
var fecha= Date.now();

// Configuración de Multer para almacenar archivos en disco
var rutaAlmacen = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/images/');
    },
    filename: function (req, file, callback) {
        console.log(file);
        // Aquí puedes personalizar el nombre del archivo guardado
        callback(null, fecha+"_" + file.originalname);
    }
});

// Configuración de Multer
var cargar = multer({ storage: rutaAlmacen });

/* GET home page. */
router.get('/', animalesControllers.index);
router.get('/ingresar', animalesControllers.crear);
router.post("/", cargar.single("foto"), animalesControllers.guardar);
router.post('/eliminar/:id', animalesControllers.eliminar); // Ruta para eliminar animales
router.get('/editar/:id', animalesControllers.editar);
router.get('/index2', animalesControllers.index2);

router.post("/actualizar", cargar.single("foto"), animalesControllers.actualizar);

module.exports = router;
