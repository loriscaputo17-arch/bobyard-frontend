import AddComment from "./AddComment";
import CommentCard from "./CommentCard";

export default function CommentFeed({comments, loading, error, role, onAdd, onUpdate, onDelete}) {
    return (
        <div className="space-y-6 overflow-y-auto p-6">
            {role === 'admin' && <AddComment onAdd={onAdd} />}

            {loading && 
                <p className="text-[13px] color-[#999] text-center px-[40px]">Loading...</p>
            }

            {error && 
                <div className="bg-[#FEE2E2] border-color-[#FECACA] rounded-md border text-sm text-[#991B1B]">
                    Error: {error}
                </div>
            }

            {!loading && !error &&comments.map(comment => (
                <CommentCard
                    key={comment.id}
                    comment={comment}
                    role={role}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                />
            ))}
        </div>
    );
}