import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Replyform from './Replyform';

export default function Reply({ reply, user }) {

    const [replies, setReplies] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        nestedReplies();
    }, [reply,refresh]);

    const nestedReplies = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/replies/${reply.id}`)
            setReplies(res.data)
        } catch (error) {
            console.log(error);
            return [];
        }
    }
    const update = () => setRefresh(!refresh)

    return (
        <div key={reply.id} className=' p-2'>
            <p>
                {reply.username}: {reply.content}
            </p>
            <div className='border border-1 border-primary p-2'>
                {
                    replies.map((rp) => {
                        return (<Reply key={rp.id} reply={rp} user={user} />)
                    })
                }
            </div>
            <Replyform
                update={update}
                post_id={null}
                user_id={user.id}
                parent_id={reply.id}
            />
        </div>


    )

}
