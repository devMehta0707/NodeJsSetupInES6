import sequelize from "../dbConnection/connection.js";
import { DataTypes } from "sequelize";

const User = sequelize.define('users', {
    name:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    },
    token:{
        type:DataTypes.STRING
    }
})

export default User;