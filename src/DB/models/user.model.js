import mongoose from "mongoose";
import{GenderEnum, ProviderEnum, RoleEnum} from "../../utils/enums/user.enum.js";  
const userSchema = new mongoose.Schema({
firstName:{
    type:String,
    required:[true,"first name is required"],
    minLength:[3,"first name must be at least 3 characters"],
    maxLength:[25,"first name must be less than 25 characters"]
},
lastName:{
    type:String,
    required:[true,"last name is required"],
    minLength:[3,"last name must be at least 3 characters"],
    maxLength:[25,"last name must be less than 25 characters"]
},

email:{
    type:String,
    required:[true,"email is required"],
    unique:true,
    match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,"please enter a valid email"]  
},
password:{
    type:String,
    required:function(){
        return this.provider == ProviderEnum.system;
    },
    },
    DOB:Date,
    phoneNumber:String,
    gender:{
        type:Number,
            enum:Object.values(GenderEnum),
            default:GenderEnum.MALE
    },
    role:{
        type:Number,
        enum:Object.values(RoleEnum),
        default:RoleEnum.USER
    },
    provider:{

            type:Number,
            enum:Object.values(ProviderEnum),
            default:ProviderEnum.system
},
confirmEmail:Date,
profilePicture:String,
},
{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
}
);


userSchema.virtual("username").set(function(value){
    const [firstName, lastName] = value?.split(" ")||[];
    this.set({firstName, lastName});
}).get(function(){
    return `${this.firstName} ${this.lastName}`;
})

const UserModel = mongoose.model("User", userSchema);
export default UserModel;