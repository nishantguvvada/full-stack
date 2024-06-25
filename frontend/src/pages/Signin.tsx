import { Quote } from "../Component/Quote"
import { Auth } from "../Component/Auth"

export function Signin() {
    return <div>
        <div className="grid grid-cols-2">
            <div><Auth type="signin"/></div>
            <Quote/>
        </div>
    </div>
}