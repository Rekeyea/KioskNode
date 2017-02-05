const Sequelize = require("sequelize");
const connectorModule = require("./connector");
const ArticulosConnection = require("./articulos").ArticulosConnection;

const ProveedoresConnection = connectorModule.connector.define("proveedores",{
    nombre:Sequelize.STRING,
    empresa:Sequelize.STRING,
    rut:Sequelize.STRING
});

ProveedoresConnection.belongsToMany(ArticulosConnection,{through:"ArticuloProveedor",as:"Articulos"});
ArticulosConnection.belongsToMany(ProveedoresConnection,{through:"ArticuloProveedor",as:"Proveedores"});

exports.ProveedoresConnection = ProveedoresConnection;
