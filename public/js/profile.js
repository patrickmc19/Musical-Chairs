const editButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/post/${id}`, {
            method: 'GET',
        });

        if (response.ok) {
            document.location.replace(`/api/post/${id}`);
        } else {
            alert('Failed to connect to post');
        }
    }
};


const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/post/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to delete post');
        }
    }
};

document
    .querySelector('.edit-post')
    .addEventListener('submit', editButtonHandler);

document
    .querySelector('.delete-post')
    .addEventListener('submit', delButtonHandler);
