import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../model/user.js';
import Token from '../model/token.js';
dotenv.config();
export const signupUser = async (request, response) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(request.body.password, salt);
        const user = {
            name: request.body.name,
            username: request.body.username,
            password: hashedPassword
        };
        const newUser = new User(user);
        await newUser.save();
        return response.status(200).json({ msg: 'Signup Successfull' })
    } catch (error) {
        return response.status(500).json({ msg: 'Error while signup the user' });
    }
}

export const loginUser = async (request, response) => {
    let user = await User.findOne({ username: request.body.username });
    if (!user) {
        return response.status(400).json({ msg: 'User not found' });
    }
    //     try{
    //         let match=await bcrypt.compare(request.body.password,user.password);
    //         if(match){
    //             //access token not permanent
    //             const accessToken=jwt.sign(user.toJSON(),process.env.ACCESS_TOKEN_SECRET,{expiresIn:'15m'});
    //             const refreshToken=jwt.sign(user.toJSON(),process.env.REFRESH_TOKEN_SECRET);
    //             const newToken=new Token({token:refreshToken});
    //             await newToken.save();
    //             return response.status(200).json({accessToken:accessToken,refreshToken:refreshToken,name:user.name,username:user.username});
    //         }else{
    //             return response.status(400).json({msg:'Invalid Credentials'});
    //         }
    //     }catch(error){
    //         return response.status(500).json({msg:'Error while login the user'});
    //     }
    try {
        let user = await User.findOne({ username: request.body.username });
        if (!user) {
            return response.status(400).json({ msg: 'User not found' });
        }

        let match = await bcrypt.compare(request.body.password, user.password);
        if (match) {
            const accessToken = jwt.sign(
                { username: user.username, name: user.name },
                process.env.ACCESS_SECRET_KEY,
                { expiresIn: '15m' }
            );
            const refreshToken = jwt.sign(
                { username: user.username, name: user.name },
                process.env.REFRESH_SECRET_KEY
            );

            const newToken = new Token({ token: refreshToken });
            await newToken.save();

            return response.status(200).json({ accessToken, refreshToken, name: user.name, username: user.username });
        } else {
            return response.status(400).json({ msg: 'Invalid Credentials' });
        }
    } catch (error) {
        console.error("Error in loginUser:", error); // Log detailed error
        return response.status(500).json({ msg: 'Error while login the user', error: error.message });
    }

}