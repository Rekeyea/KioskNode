const Sequelize = require("sequelize");

// exports.connector = new Sequelize("Server=DESKTOP-6Q95IEM\SQLEXPRESS");

exports.connector = new Sequelize("kiosk","kiosko","kiosko",{
    host:"localhost",
    dialect:"mssql"
});
