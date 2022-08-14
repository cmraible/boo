// send upvote to server for commentId and logged in user
function upvote(commentId) {
    const userId = document.getElementById('userId').value
    fetch('/api/comments/' + commentId + '/upvote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        // Add the logged in user to the body
        // Won't need this with user authentication
        body: JSON.stringify({
            userId: userId
        })
    })
    .then(function(response) {
        // parse response json
        return response.json()
    })
    .then(function(response) {
        const link = document.getElementById(`upvote-${commentId}`).textContent = "Upvoted"
    })
}

// focus the comment input
function reply() {
    document.getElementById('comment-input').focus();
}

// Wait until the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // TODO: Add authentication
    // Randomly select a user by ID — would normally just pull logged in user's id
    const userId = document.getElementById('userId').value
    const commentForm = document.getElementById('comment-form');
    commentForm.addEventListener('submit', function() {
        // Grab some values from the form
        const commentInput = document.getElementById('comment-input');
        const postId = document.getElementById('postId').value
        // Post to /api/posts/:postId/comments endpoint to create a comment
        if (commentInput.value.length > 0 && commentInput.value.length <= 800) {
            fetch('/api/posts/' + postId + '/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    body: commentInput.value,
                    authorId: userId
                })
            })
            .then(function(response) {
                // parse response json
                return response.json()
            })
            .then(function(response) {
                // add new comment to the DOM
                const divider = document.getElementById('comment-divider');
                var container = document.createElement('div')
                container.innerHTML = `
                    <div class="flex-container w-100 comment-container">
                        <div style="flex: none;">
                            <a href="#">
                                <img src="/images/${response.author.avatar}" height="36px" width="36px" class="avatar" />
                            </a>
                        </div>
                        <div style="flex-grow: 8; padding: 4px;">
                            <div>
                                <a href="#" class="author-link">${response.author.name}</a> <span class="text-light middle text-small">&#183; ${luxon.DateTime.fromISO(response.created).toRelative()}</span>
                            </div>
                            <p class="comment-body">${response.body}</p>
                            <div class="comment-actions">
                                <div>
                                    <a href="#" onclick="upvote(${response.id})" class="middle" id="upvote-${response.id}"><span class="text-small middle">&#9650;</span> Upvote</a>
                                </div>
                                <div>
                                    <a href="#" onclick="reply()">Reply</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;  
                divider.after(container);
                // reset form value
                commentInput.value = '';
            })
        }
        
    });
});
