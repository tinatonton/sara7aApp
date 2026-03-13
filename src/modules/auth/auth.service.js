import userModel from '../../DB/models/user.model.js';
import { findOne } from '../../DB/database.repositry.js';
import{BadRequestException, ConflictException} from "../../utils/response/error.response.js";
import { successResponse } from '../../utils/response/success.response.js';
import { NotFoundException } from '../../utils/response/error.response.js';
import { create } from '../../DB/database.repositry.js';
import { generateHash , compareHash } from '../../utils/security/hash.security.js';
import { HashEnum } from '../../utils/enums/security.enum.js';



export const signup = async (req,res)=>{
    const {firstName, lastName, email, password} = req.body;
    if ( await findOne({model:userModel , filter:{email}}))
        throw ConflictException({message:"email already exists"});

    const hashPassword= await generateHash({PlainText:password ,algo:HashEnum.ARGON});

    const user=await create({
        model:userModel,
        data:[{firstName, lastName, email, password:hashPassword    }]
    });
    return successResponse  ({
        res,
        statusCode:201,
        message:"user created successfully",
        data:{user}
    });

    
}

export const login = async(req,res)=>{
    const {email, password} = req.body;
    const user=await findOne({model:userModel , filter:{email}});
     if (!user)
        throw NotFoundException({message:"user not found"});
    const isPasswordValid= await compareHash({PlainText:password ,ciphertext:user.password, algo:HashEnum.ARGON});
    if (!isPasswordValid)
        throw BadRequestException({message:"invalid password"});
    return successResponse  ({
        res,
        statusCode:200,
        message:"user logged in successfully",
        data:{user}
    });

}