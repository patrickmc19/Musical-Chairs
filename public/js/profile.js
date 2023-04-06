const newFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
    const tracks = document.querySelector('#post-track').value.trim();

    if (title && content && tracks) {
        const response = await fetch(`/api/profile`, {
            method: 'POST',
            body: JSON.stringify({ title, tracks, content }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create blog');
        }
    }
};




// const editButtonHandler = async (event) => {
//     if (event.target.hasAttribute('data-id')) {
//         const id = event.target.getAttribute('data-id');

//         const response = await fetch(`/api/post/${id}`, {
//             method: 'GET',
//         });

//         if (response.ok) {
//             document.location.replace(`/api/post/${id}`);
//         } else {
//             alert('Failed to connect to post');
//         }
//     }
// };


// const delButtonHandler = async (event) => {
//     if (event.target.hasAttribute('data-id')) {
//         const id = event.target.getAttribute('data-id');

//         const response = await fetch(`/api/post/${id}`, {
//             method: 'DELETE',
//         });

//         if (response.ok) {
//             document.location.replace('/profile');
//         } else {
//             alert('Failed to delete post');
//         }
//     }
// };



document
    .querySelector('.new-blog-form')
    .addEventListener('submit', newFormHandler);

// document
//     .querySelector('.edit-post')
//     .addEventListener('submit', editButtonHandler);

// document
//     .querySelector('.delete-post')
//     .addEventListener('submit', delButtonHandler);
