import {useEffect, useState} from "react";
import {getComments} from "../api/comments";
import CommentFeed from "../components/CommentFeed";

export default function CommentsPage({role, onMenuClick}) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        getComments()
            .then(setComments)
            .catch(() => setError('Could not load comments. Is the backend running?'))
            .finally(() => setLoading(false));
    }, []);

    const handleAdd    = (c)  => setComments(prev => [c, ...prev]);
    const handleUpdate = (c)  => setComments(prev => prev.map(x => x.id === c.id ? c : x));
    const handleDelete = (id) => setComments(prev => prev.filter(x => x.id !== id));
    
    return (
            <CommentFeed
                comments={comments}
                loading={loading}
                error={error}
                role={role}
                onAdd={handleAdd}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
            />
    );
}