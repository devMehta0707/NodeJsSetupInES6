import sequelize from "../dbConnection/connection.js";
import {DataTypes} from "sequelize";

const Blog = sequelize.define('blogs',{
    user_id:{
        type:DataTypes.STRING
    },
    title:{
        type:DataTypes.STRING
    },
    description:{
        type:DataTypes.STRING
    }
})

export default Blog;