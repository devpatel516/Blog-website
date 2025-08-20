import { useState, useEffect, useContext } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { API } from '../../service/api';
import { DataContext } from '../../contex/DataProvider';
const initialPost = {
    title: "",
    description: "",
    picture: "",
    username: "",
    categories: "",
    createdDate: new Date()
};

const CreatePost = () => {
    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState(null);
    const { account } = useContext(DataContext);
    const location = useLocation();
    const navigate= useNavigate();
    console.log(post.picture);
    const url = post.picture.imageUrl || "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?w=1000&q=80";

    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);
                try {
                    const response = await API.uploadFile(data);
                    if (response.isSucess) {
                        setPost(prev => ({ ...prev, picture: response.data }));
                    } else {
                        console.error("File upload failed", response.msg);
                    }
                } catch (error) {
                    console.error("Error uploading file", error);
                }
            }
        };
        getImage();
        setPost(prev => ({ ...prev, categories: location.search?.split("=")[1] || "All", username: account.username }));
    }, [file]);

    const handleChange = (e) => {
        setPost(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const savePost = async () => {
       let response=await API.createPost(post);
       console.log(response);
         if(response.isSucess){
              navigate("/home");
        }
    }
    return (
        <div className="p-4 bg-white text-black max-w-3xl m-auto rounded-lg shadow-lg mt-2 font-mono">
            <img src={url} alt="Laptop setup" className="m-auto h-100 rounded-lg shadow-lg" />
            <form className="p-4 flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                    <label htmlFor="fileInput">Input Picture</label>
                    <input type="file" id="fileInput" onChange={(e) => setFile(e.target.files[0])} />
                    <input type="text" placeholder="Title" onChange={handleChange} name="title" />
                    <button type="button" onClick={()=>savePost()} className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5">Publish</button>
                </div>
                <textarea name="description" onChange={handleChange} className="w-full h-40 border-2 rounded-lg p-4" placeholder="Tell your story..."></textarea>
            </form>
        </div>
    );
};

export default CreatePost;