import axios from "axios";

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
})

export const CreatePost = ()=>{
    return api.get('/posts')
}

export const DeletePost =(id)=>{
    return api.delete(`/posts/{id}`)
}

export const AddPost =(post)=>{
    return api.post('/posts',post)
}

export const updateData = (id, post) => {
    return api.put(`/posts/${id}`, post);
}