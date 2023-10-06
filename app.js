const express = require('express');
const app = express();
const puerto = process.env.PORT || 3000;
app.use(express.json())
//Se crea la base de datos
let categorias=[{id:0, nombre:"pelicula 0",descripcion:"descripcion 0", peliculas:2000},
                 {id:1, nombre:"pelicula 1",descripcion:"descripcion 1", peliculas:2001},
                 {id:2, nombre:"pelicula 2",descripcion:"descripcion 2", peliculas:2002},
                 {id:3, nombre:"pelicula 3",descripcion:"descripcion 3", peliculas:2003},
                 {id:4, nombre:"pelicula 4",descripcion:"descripcion 4", peliculas:2004},
                 {id:5, nombre:"pelicula 5",descripcion:"descripcion 5", peliculas:2005},
                 {id:6, nombre:"pelicula 6",descripcion:"descripcion 6", peliculas:2006},
                 {id:7, nombre:"pelicula 7",descripcion:"descripcion 7", peliculas:2007},
                 {id:8, nombre:"pelicula 8",descripcion:"descripcion 8", peliculas:2008},
                 {id:9, nombre:"pelicula 9",descripcion:"descripcion 9", peliculas:2009},];
//Se genera la consulta de todos las categorias
app.get('/socios/v1/categorias',(req,res)=>{
    if(categorias){
        res.status(200).json({
            estado:1,
            mensaje:"Existen categorias",
            categorias: categorias
    })
    }else{res.status(404).json({
        estado:0,
        mensaje:"No se encontraron categorias",
        categorias: categorias
    })
    }
})
//Consulta de una pelicula en específico
app.get('/socios/v1/categorias/:id', (req, res) => {
    const id = req.params.id;
    const pelicula = categorias.find(pelicula => pelicula.id == id); //se ahorra el for
    if (pelicula) {
        res.status(200).json({
            estado: 1,
            mensaje: "Sí se encontró la pelicula",
            pelicula: pelicula
        })
    } else {
        res.status(404).json({
            estado: 0,
            mensaje: "pelicula no encontrada",
            pelicula: {}
        })
    }
})
//Se crea un pelicula nueva
app.post('/socios/v1/categorias',(req,res)=>{

    const{ nombre, descripcion, peliculas, genero, clasificacion}= req.body;

    const id = Math.round(Math.random()*1000);
    if(nombre==undefined || peliculas== undefined || descripcion== undefined){
        res.status(400).json({
            estado: 0,
            mensaje:"Faltan parametros a la solicitud"
        })

    }else{
        const nuevoPelicula={id:id, nombre:nombre, descripcion:descripcion, peliculas:peliculas};
        const longitudInicial = categorias.length;
        console.log(categorias.length);
        console.log(longitudInicial);
        categorias.push(nuevoPelicula)
        if(categorias.length>longitudInicial){
            //Todo Ok de parte del cliente y el servidor
            res.status(201).json({
                estado:1,
                mensaje: "Pelicula creada",
                nuevoPelicula: nuevoPelicula
            })
        }else{
            //Error del creador de la API o de la base de datos, de la base de datos o de quien lo configura
            res.status(500).json({
                estado: 0,
                mensaje: "Ocurrio un error desconocido"

            })
        }
        
    } 
    
})
//Se actualiza una pelicula
app.put('/socios/v1/categorias/:id',(req,res)=>{

    const{ id}=req.params;
    const{ nombre, descripcion, peliculas, genero, clasificacion}= req.body;
    if(nombre==undefined||descripcion==undefined || peliculas==undefined ){
        res.status(400).json({
            estado:0,
            mensaje: "Bad request, Faltan parametros en la solicitud"
        })
    }else{
        const posActualizar =categorias.findIndex(pelicula=>pelicula.id==id)
        if(posActualizar!= -1){

            categorias[posActualizar].peliculas=peliculas;
            categorias[posActualizar].descripcion=descripcion;
            categorias[posActualizar].nombre=nombre;
            res.status(200).json({
                estado:1,
                mensaje:"pelicula actualizada",
                categorias:categorias[posActualizar]
            })
        }else{

            res.status(404).json({
                estado:0,
                mensaje:"No se encontró el registro"
            })
        }
    }

})
//Se elimina una pelicula
app.delete('/socios/v1/categorias/:id',(req,res)=>{

    const{ id }= req.params;
    const indiceEliminar= categorias.findIndex(pelicula=>pelicula.id==id)
    if(indiceEliminar!=-1){
        categorias.splice(indiceEliminar,1);
        res.status(201).json({
            estado:1,
            mensaje:"pelicula eliminada con exito"
        })

    }
    else{
        res.status(404).json({
            estado:0,
            mensaje:"registro no encontrado"
        })
    }
})

app.listen(puerto,()=>{
console.log(('servidor corriendo en el puerto', puerto));
})