import { Appbar } from "./Appbar"
import axios from 'axios'
import { BACKEND_URL } from "../config"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Publish = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    return <div>
        <Appbar/>
        <div className="flex justify-center">    
            <div className="max-w-screen-lg w-full">
                <label className="mt-10 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Blog</label>
                <textarea  onChange={(e)=>{
                    setTitle(e.target.value)
                }} className="mt-5 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title of your blog"></textarea>
                <textarea onChange={(e) =>{
                    setDescription(e.target.value)
                }} className="mt-8 block p-20 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                <button onClick={async ()=>{
                    try{
                        const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                            title: title,
                            content: description
                        }, {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("token")
                            }
                        });
                        alert(`Blog ${response.data.blogid} created!`);
                        navigate(`/blog/${response.data.blogid}`);
                    } catch(err){
                        alert(err)
                    }
                }} type="button" className="mt-5 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Publish Post</button>
            </div>
        </div>
    </div>
}

