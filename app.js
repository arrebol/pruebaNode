//setea cosas generales
var app   = require('express')();
var http = require('http').Server(app);
var mysql = require('mysql');
var bodyParser = require("body-parser");

//setea la conexion con la bd
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'pass',
    database : 'bdejemplo',
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//setea el get de la ruta /
app.get('/',function(req,res){
    var data = {
        "Data":""
    };
    data["Data"] = "Raiz de la app";
    res.json(data);
});

//setea el get de la ruta /medico
app.get('/medico',function(req,res){
    var data = {
        "error":1,
        "Medico":""
    };

    //hace un select de la bd y lo carga el data en json
    connection.query("select m.id, m.nombre, e.nombre as 'especialidad' from medico m, especialidad e where m.idEspecialidad=e.id",function(err, rows, fields){
        if(rows.length != 0){
            data["error"] = 0;
            data["Medico"] = rows;
            res.json(data);
        }else{
            data["Medico"] = 'No hay medicos';
            res.json(data);
        }
    });
});

//compienza a escuchar en el puerto 8000
http.listen('8000',function(){
    console.log("Escuchando en http://127.0.0.1:8000/" );
});
