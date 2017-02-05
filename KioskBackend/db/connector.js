const Sequelize = require("sequelize");

exports.connector = new Sequelize("kiosko","root","root",{
    host:"localhost",
    dialect:"sqlite",
    pool:{
        max:5,
        min:0,
        idle:10000
    },
    storage:"./kiosko.db"
});
