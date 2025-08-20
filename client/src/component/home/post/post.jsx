import { useEffect, useState } from "react";
import { API } from '../../../service/api';
import { Link } from "react-router-dom";
import Sp from './sp';
const Posts = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getAllPosts();
            console.log(response);
            if (response.isSucess) {
                setPosts(response.data);
            }
        }
        fetchData();
    }, [])
    return (
        <>
            {
                posts?.length ? posts.map((post) => (
                    <>
                        <Link to={`/details/${post._id}`}>
                            <Sp post={post} />
                        </Link>
                    </>
                )) : <><div>No data available</div></>
            }
        </>
    )
}

export default Posts;