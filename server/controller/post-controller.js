import { request, response } from 'express';
import Post from '../model/post.js';
export const createPost = async (request, response) => {
    try {
        const { title, description, picture, username, categories } = request.body;

        
        if (!title || !description || !username || !categories) {
            return response.status(400).json({ error: "Missing required fields" });
        }

        
        const imageUrl = picture?.imageUrl || picture;

        const post = new Post({
            title,
            description,
            picture: imageUrl,  
            username,
            categories,        
            createdDate: Date.now()
        });

        console.log("Saving post:", post);

        await post.save();  

        return response.status(201).json({ message: 'Post saved successfully', post });
    } catch (error) {
        console.error("Error saving post:", error);
        return response.status(500).json({ error: error.message });
    }
};

export const getAllPosts = async (request, response) => {
    try {
        const posts = await Post.find({});
        return response.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        return response.status(500).json({ msg: error.message });
    }
};

export const getPost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        response.status(200).json(post);
    } catch (error) {
        response.status(500).json(error)
    }
}

export const updatePost = async(request,response)=>{
    try{
        const post = await Post.findById(request.params.id);
        console.log("post-controller",post);
        if(!post){
            return response.status(404).json({msg:'post not found'});
        }
        await Post.findByIdAndUpdate(request.params.id,{$set:request.body},{new:true});
        return response.status(200).json({msg:'Post updated sucessfully'});
    }catch(error){
        return response.status(500).json({error:error.message});
    }
}

export const deleteBlog = async(request,response)=>{
    try{
        const post= await Post.findById(request.params.id);
        if(!post){
            return response.status(404).json({msg:'post not found'});
        }
        await post.deleteOne();
        return response.status(200).json({msg:'Post deleted sucessfully'});
    }catch(error){
        return response.status(500).json({error:error.message});
    }
}

