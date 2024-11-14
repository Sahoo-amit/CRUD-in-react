import { useEffect, useState } from "react"
import { CreatePost, DeletePost } from "../api/Api"
import Form from "./Form"

const Post = () => {

    const [post, setPost] = useState([])
    const [updatedPost, setUpdatePost] = useState({})
    
    const posts = async()=>{
        const res = await CreatePost()
        setPost(res.data)
    }
     const handleDelete= async(id)=>{
        const res = await DeletePost(id)
        if(res.status ===200){
            const updatedPost = post.filter((ele)=> ele.id !==id)
            setPost(updatedPost)
        }
     }
    useEffect(()=>{
        posts()
    },[])

    const handleUpdate =(ele)=>setUpdatePost(ele)

  return (
    <div className="md:max-w-6xl mx-auto max-w-sm text-white py-10">
        <Form post={post} setPost={setPost} updatedPost={updatedPost} setUpdatePost={setUpdatePost}/>
        <ol className="grid md:grid-cols-3 grid-cols-1 gap-6 mt-10">
            {
                post.map((item)=>{
                    const {id, title, body} = item
                    return(
                        <li key={id} className="bg-gray-900 px-4 py-2 rounded-xl">
                            <h1 className="text-md font-bold">Title: {title}</h1>
                            <p className="text-sm font-semibold mt-3">Body: {body}</p>
                            <div className="flex items-center space-x-4 ml-5 mt-3">
                                <button className="bg-green-600 rounded-lg px-8 py-1 text-black" onClick={()=>handleUpdate(item)}>Edit</button>
                                <button className="bg-red-600 rounded-lg px-8 py-1 text-black" onClick={()=>handleDelete(id)}>Delete</button>
                            </div>
                        </li>
                    )
                })
            }
        </ol>
    </div>
  )
}

export default Post