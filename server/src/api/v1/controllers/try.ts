import { Request, response, Response } from "express";
import { userLoginSchema, userSignupSchema } from "../validators/user.validation";
import User from "../../../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { parse } from "path";
import { partial } from "zod/v4/core/util.cjs";
import { any } from "zod";
import { Project } from "../../../models/project.model";

export const createprojects = async(req:Request,res:Response){
    try {
        const{title,description,imageUrl,price,tags}= req.body;
        if(title || ){
            return 
        }

        
    } catch (err) {
        
    }
}