import React, {useState} from 'react'
import axios from 'axios';

export default function Replyform({
    post_id,
    user_id,
    parent_id,
    update
}) {
    const [content,setContent] = useState("")

    const handleReply = (event) => {
        event.preventDefault();
        // Send a POST request to create a new reply
        axios.post(`http://localhost:8080/replies`, {
            post_id,
            user_id, // Change this to user id
            content,
            parent_id
        })
            .then((res) => {
                setContent('');
                update();
            })
            .catch((err) => console.error(err));
    }
    return (
        <form onSubmit={handleReply}>
            <div className="form-group">
                <input type="text" className="form-control" placeholder="Enter Reply" onChange={e=>setContent(e.target.value)}
                 />
            </div>
            <button type="submit" className="btn btn-primary">Add Reply</button>
        </form>
    )
}
