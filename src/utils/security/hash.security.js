import{hash ,compare} from "bcrypt";
import * as argon2 from "argon2";
import { SALT } from "../../../config/config.service.js";
import { HashEnum } from "../enums/security.enum.js";


export const generateHash=async({PlainText,salt= SALT ,algo=HashEnum.BCRYPT})=>{
let hashResult = "";
switch(algo){
    case HashEnum.BCRYPT:
        hashResult=await hash(PlainText,salt);
        break;
    case HashEnum.ARGON:
        hashResult=await argon2.hash(PlainText);
        break;
    default:
        throw new Error("invalid hashing algorithm");   
        break ;

}
return hashResult;
}



export const compareHash=async({PlainText,ciphertext ,algo=HashEnum.BCRYPT})=>{

let match= false;
switch(algo){
    case HashEnum.BCRYPT:
        match=await compare(PlainText,ciphertext);
        break;
    case HashEnum.ARGON:
        match=await argon2.verify(ciphertext, PlainText);
        break;
    default:
        match=await compare(PlainText,ciphertext);  
        break; 

}
return match;
}