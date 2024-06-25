import { Link } from "react-router-dom"

interface BlogCardProps {
    id: number
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return <Link to={`/blog/${id}`}><div className="w-96">
        <div className="flex justify-center">
            <div>
                <Avatar name={authorName}/>
            </div>
            <div className="font-extralight">{authorName}</div>
            <div>&#9679;</div>
            <div className="pl-2 font-thin text-slate-500">{publishedDate}</div>
        </div>
        <div>
            {title}
        </div>
        <div>
            {content.slice(0, 100) + "..."}
        </div>
        <div>
            {`${Math.ceil(content.length / 100)} minute(s) read`}
        </div>
        <div className="bg-slate-200 h-1 w-full"></div>
    </div>
    </Link>
}

export function Avatar({ name }: { name: string }){
    return <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <span className="font-medium text-gray-600 dark:text-gray-300">{name[0]}</span>
    </div>
}