import { Quote } from "../Component/Quote"
import { Auth } from "../Component/Auth"

export function Signup() {
    return <div>
        <div className="grid grid-cols-2">
            <div><Auth type="signup"/></div>
            <Quote/>
        </div>
    </div>
}