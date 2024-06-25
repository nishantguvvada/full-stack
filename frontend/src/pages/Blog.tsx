import { FullBlog } from "../Component/FullBlog";
import { useBlog } from "../hooks/index"
import { useParams } from "react-router-dom"
import { BlogSkeleton } from "../Component/BlogSkeleton";

export function Blog() {
    const {id} = useParams();
    const {loading, blog} = useBlog({id: id || ""});
    if (loading) {
        return <div className="h-screen flex flex-col justify-center">
            <div className="flex justify-center">
                <BlogSkeleton/>
            </div>
        </div>
    }
    return <div>
        <FullBlog blog={blog}/>
    </div>
}