import {useState, useEffect} from 'react';
import {addComment} from '../api/comments';

export default function AddComment({onAdd}) {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim()) { return; }
        setLoading(true);
        const newComment = await addComment(text.trim());
        onAdd(newComment);
        setText('');
        setLoading(false);
    };

    return (
        <div className='bg-[#e5e5e5] rounded-2xl p-5 shadow-sm'>
            <div className='flex gap-3'>
                <Avatar initials="A" bg="#111" color="#F5F0E8" />
                <div className='flex-1'>
                    <textarea
                        className='w-full resize-none border-none bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:ring-0 outline-none'
                        rows={3}
                        placeholder="Write a comment..."
                        value={text}
                        onKeyDown={e => {if (e.key === 'Enter' && e.metaKey) handleSubmit();}}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <div className='flex justify-end mt-2'>
                        <button
                            type="button"
                            className='px-5 py-3 bg-black text-white text-sm rounded-lg font-semibold disabled:hover:bg-black hover:bg-white disabled:hover:text-white hover:text-black disabled:cursor-not-allowed cursor-pointer transition-colors disabled:opacity-50'
                            onClick={handleSubmit}
                            disabled={loading || !text.trim()}
                        >
                            {loading ? 'Adding...' : 'Add Comment'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function Avatar({initials, bg, color}) {
    return (
        <div style={{width: 40, height: 40, borderRadius: '50%', backgroundColor: bg, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'}}>
            {initials}
        </div>
    )
}