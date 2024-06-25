import { BlogCard } from "../Component/BlogCard"
import { Appbar } from "../Component/Appbar"
import { useBlogs } from "../hooks/index"
import { Spinner } from "../Component/Spinner"

export const Blogs = () => {
    const {loading, blogs} = useBlogs();

    if(loading){
        return <div className="h-screen flex flex-col justify-center">
        <div className="flex justify-center">
            <Spinner/>
        </div>
    </div>
    }
    return <div> 
        <Appbar/>
        <div className="p-4 flex justify-center">
        <div className="max-w-xl">
            {blogs.map(blog => <BlogCard 
                    id={blog.id}
                    authorName={String(blog.id)} 
                    title={blog.title} 
                    content={blog.content} 
                    publishedDate={"29th March 2022"}
                />
            )}

        </div>
        </div>
    </div>
}