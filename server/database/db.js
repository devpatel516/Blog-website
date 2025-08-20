import mongoose from "mongoose"
const connection=async (USERNAME,PASSWORD)=>{
    const url = `mongodb+srv://${USERNAME}:${PASSWORD}@blog-app.hbrnf.mongodb.net/blogDB?retryWrites=true&w=majority&appName=blog-app`;
    try{
        await mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology: true });
        console.log('Database connected succesfully');
    }catch(error){
         console.log('Error while connecting with the database',error);
    }
}
export default connection;