import { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';

export interface Blog {
        "id": number,
        "title": string,
        "content": string,
        "published": boolean,
        "authorId": number
}

export const useBlog = ({ id }: {id: string}) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        const fetchBlogs = async () => {
            try{
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                    headers : {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                })
                setBlog(response.data.blog);
                setLoading(false);
            } catch(err){
                alert(err)
            }
        }
        fetchBlogs();
    }, []);

    return {
        loading,
        blog
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try{
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                    headers : {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                })
                setBlogs(response.data.blogs);
                setLoading(false);
            } catch(err){
                alert(err)
            }
        }
        fetchBlogs();
    }, []);

    return {
        loading,
        blogs
    }
}