const Sequelize = require("sequelize");
const connectorModule = require("./connector");

exports.ArticulosConnection = connectorModule.connector.define("articulos",{
    nombre:Sequelize.STRING,
    dimensiones:Sequelize.STRING,
    tags:Sequelize.STRING,
    precioUnitario:Sequelize.DECIMAL,
    precioVenta:Sequelize.DECIMAL,
    imagen: Sequelize.STRING,
    stock: Sequelize.INTEGER,
    barcode: Sequelize.STRING,
    marca: Sequelize.STRING
});