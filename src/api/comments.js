const BASE = import.meta.env.VITE_URL_BASE;


export const getComments = () => 
    fetch(`${BASE}/comments`).then((response) => response.json());

export const addComment = (text) =>
    fetch(`${BASE}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
    }).then((response) => response.json()
    );

export const deleteComment = (id) =>
    fetch(`${BASE}/comments/${id}`, {
        method: 'DELETE',
    }).then((response) => response.json());

export const editComment = (id, text) =>
    fetch(`${BASE}/comments/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
    }).then((response) => response.json());
