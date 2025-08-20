import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const authenticateToken=(request,response,next)=>{
const autheader = request.header('Authorization');
const token = autheader && autheader.split(' ')[1];
console.log(token);
if(token==null){
    return response.sendStatus(401);json({msg:'token is missing'});
}
jwt.verify(token,process.env.ACCESS_SECRET_KEY,(error,user)=>{
    if(error){
        return response.sendStatus(403).json({msg:'token is invalid'});
    }
    request.user=user;
    next();
});
}