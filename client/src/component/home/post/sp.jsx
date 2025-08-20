
const sp = ({ post }) => {
    return (
        <>
            {/* <div>
            <img src={post.picture} alt="blog"/>
            <p>{post.categories}</p>
            <p>{post.tite}</p>
            <p>{post.username}</p>
            <p>{post.description}</p>
            <p></p>
        </div> */}
            <div
                class="my-8 rounded shadow-lg bg-white duration-300 hover:-translate-y-1"
                x-for="(post, index) in posts">

                <a _href="link" class="cursor-pointer">
                    <figure>
                        <img src={post.picture}
                            class="rounded-t h-72 w-full object-cover" />

                        <figcaption class="p-4">

                            <p
                                class="text-lg mb-4 overflow-y-clip h-20 font-bold text-gray-900 "
                                x-text="post.title">{post.title}
                            </p>
                            <small
                                class=" text-gray-900"
                                x-text="post.description">{post.categories}
                            </small>
                            <p class="text-lg mb-4 overflow-y-clip h-20 text-gray-900"
                                x-text="post.title">{post.description}</p>
                        </figcaption>
                    </figure>
                </a>
            </div>
        </>
    )
}

export default sp;