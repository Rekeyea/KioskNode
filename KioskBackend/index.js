const restify = require("restify");
const fs = require("fs");
const uuid = require("node-uuid");

const connectorModule = require("./db/connector");
const ArticulosConnection = require("./db/articulos").ArticulosConnection;
const ProveedoresConnection = require("./db/proveedores").ProveedoresConnection;

connectorModule.connector.sync();
const server = restify.createServer({
    name:"Kiosko"
});

server.use(restify.CORS());
server.use(restify.bodyParser({ mapParams: true }));
server.get(/\/public\/?.*/, restify.serveStatic({
    directory: __dirname
}));

server.del("/api/articulos/:id",(req,res,next) => {
    const id = req.params.id;
    ArticulosConnection.destroy({where:{id:[id]}})
        .catch(err =>  {next(err); Promise.reject(err);})
        .then(d => res.send(200));
});

server.post("/api/articulos",(req,res,next) => {
    const articulo = req.body;
    articulo.tags = articulo.tags;
    if(articulo.id){
        articulo.id = Number(articulo.id);
    }
    if(articulo.imagen){
        ArticulosConnection.upsert(articulo)
            .catch(err => {next(err); Promise.reject(err);})
            .then(d => res.send(200));
    }else{
        const newName = uuid.v4();
        fs.rename(req.files.imagen.path,__dirname + `/public/imagenes/${newName}.jpg`, err => {
            if(!err){
                articulo.imagen = `public/imagenes/${newName}.jpg`
                ArticulosConnection.upsert(articulo)
                    .catch(err => {next(err); Promise.reject(err);})
                    .then(d => res.send(200));
            }else{
                next(err);
            }
        });
    }
});

server.get("/api/articulos",(req,res,next) => {
    ArticulosConnection.findAll().then(articulos => res.send(articulos.map(v => {
        const a = v;
        a.tags = v.tags.split(",");
        return a;
    })));
    return next();
});

server.listen(8081);