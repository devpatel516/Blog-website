import { useEffect, useState, useContext } from 'react';
import { useParams,Link, useNavigate } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../contex/DataProvider';
const DetailView = () => {
    const url = "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?w=1000&q=80";
    const { id } = useParams();
    const { account } = useContext(DataContext);
    const [post, setPost] = useState({});
    const navigate=useNavigate();
    const deletePost = async () => {
        console.log("Deleting post:", id); // Debugging
    
        let response = await API.deletePost(id);  // ✅ Pass `id` correctly
    
        console.log("Delete response:", response);
    
        if (response.isSucess) {
            navigate('/home');  // Redirect to homepage after deletion
        } else {
            console.error("Delete failed:", response);
        }
    };
    
    useEffect(() => {
        const fetchPost = async () => {
            console.log(API);
            try {
                const response = await API.getPostbyID(id);
                console.log(response);
                if (response.isSucess) {
                    setPost(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch post:", error);
            }
        };
        fetchPost();
    }, [id]);

    if (!post || Object.keys(post).length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white">
                <div className="text-xl font-semibold">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br flex items-center justify-center py-10">
            <div className="max-w-3xl w-full bg-white rounded-lg shadow-xl overflow-hidden transform transition-all hover:shadow-2xl">
                {/* Image */}
                <img
                    src={post.picture || url}
                    alt={post.title || "Blog Post"}
                    className="w-full h-64 object-cover md:h-96"
                />
                {/* Content */}
                <div className="p-6 md:p-8 bg-white">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                        {post.title || "Untitled Post"}
                    </h2>
                    <div className="flex justify-center items-center text-gray-600 text-sm mb-6">
                        <span>By {post.username || "Unknown Author"}</span>
                        <span className="mx-2">•</span>
                        <span>{new Date(post.createdDate || Date.now()).toLocaleDateString()}</span>
                    </div>
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                        {post.description || "No description available."}
                    </p>
                    {
                        account.username === post.username &&
                        <>
                            <div className='mt-2 gap-2 flex justify-center align-center'>
                                <Link to={`/update/${post._id}`}><button className='bg-blue-700 hover:bg-blue-400 rounded-lg p-2'>Update</button></Link>
                                <button onClick={()=>deletePost()} className='bg-red-700 hover:bg-red-400 rounded-lg p-2'>Delete</button>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default DetailView;