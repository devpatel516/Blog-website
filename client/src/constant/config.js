
export const API_NOTIFICATION_MESSAGES={
    loading:{
        title:'Loading...',
        message:'Data is being loaded,Please wait'
    },
    success:{
        title:'Success',
        message:'Data Successfully loaded'
    },
    responseFailure:{
        title:'Error',
        message:'An error occured while fetching response from server'
    },
    requestFailure:{
        title:'Error',
        message:'An error occured while request data'
    },
    networkError:{
        title:'Error',
        message:'Unable to connect server.Please check internet'
    }
}

export const SERVICE_URLS={
    userSignup:{url:'/signup',method:'POST'},
    userLogin:{url:'/login',method:'POST'},
    uploadFile: { url: '/file/upload', method: 'POST' },
    createPost: {url:'/create',method:'POST'},
    getAllPosts:{url:'/posts',method:'GET'},
    getPostbyID:{url:'/posts/:id',method:'GET',query:true,responseType:'json'},
    updatePost: { url: '/update/:id', method: 'PUT', query: true },
    deletePost: { url: '/delete/:id', method: 'DELETE', query: true }
}