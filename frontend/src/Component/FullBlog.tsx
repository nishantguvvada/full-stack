import {Appbar} from "./Appbar"
import {Blog} from "../hooks/index"

export const FullBlog = ({blog} : {blog: Blog}) => {
    return <div>
        <Appbar/>
        <div className="grid grid-cols-12 px-10">
            <div className="grid grid-cols-8">
                <div className="text-3xl font-extrabold">
                    {blog.title}
                </div>
            </div>
            <div className="grid grid-cols-4">{blog.content}</div>
        </div>
    </div>
}