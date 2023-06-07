import Router from "express";
const routes = Router();
import authenticate from "../middlewares/authenticate.js";
import { Register,Login } from '../controllers/UserController.js';
import { CreateBlog } from "../controllers/BlogController.js";
import { check } from "express-validator";

routes.post('/register',
    check('email').exists().withMessage('Email-id is Required'),
    check('password').exists().withMessage('Password is Required').isLength({min:6}).withMessage("Please enter at least 6 characters"),
    Register
)

routes.post('/login',
    check('email').exists().withMessage('Email-id is Required'),
    check('password').exists().withMessage('Password is Required'),
    Login
)

routes.put('/create-blog',
authenticate,
check('title').exists().withMessage("Title is Required"),
check('description').exists().withMessage("Description is Required"),
CreateBlog
)

export default routes;