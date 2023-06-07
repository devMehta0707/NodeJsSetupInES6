import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: "mysql",
    define: {
        timestamps: false
    }
})

try {
    sequelize.authenticate();
    console.log("Connected To Database");
} catch (error) {
    console.log(`Error Occured ${error}`);
}

export default sequelize;