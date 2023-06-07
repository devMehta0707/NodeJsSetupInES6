// REPLACED TRY CATCH WITH ASYNC-HANDLER

import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import Blog from "../models/Blog.js";

// CREATE BLOG FUNCTION

export const CreateBlog = asyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(500).json({ code: 500, msg: errors.array() });
    }
    const {title,description,userDetail} = req.body;
    await Blog.create({
        user_id:userDetail.id,
        title:title,
        description:description
    })
    return res.status(200).json({code:200,msg:"Blog Created Successfully"})
})