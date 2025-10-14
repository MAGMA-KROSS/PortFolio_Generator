import { Request, Response } from "express";
import { Project } from "../../../models/project.model";
import { error } from "console";
import { string, z } from 'zod';
import mongoose, { mongo } from "mongoose";
import { title } from "process";
import { partial } from "zod/v4/core/util.cjs";
import { userSignupSchema } from "../validators/user.validation";
import User from "../../../models/user.model";

export const Login = async(req:Request,res:Response){
    const{email,password}=req.body;
    const userfind = await User.findOne({email});
    if(!userfind){
        return res.json('error');
    }

}