const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteBtn = document.querySelectorAll("#deleteBtn");

const deleteComment = (id) => {
    const videoComments = document.querySelector(".video__comments ul");
    const comment = document.querySelector(`li[data-id="${id}"]`);
    videoComments.removeChild(comment);
};

const handleDelete = async (event) => {
    const commentId = event.target.parentNode.dataset.id;
    const { ok } = await fetch(`/api/comments/${commentId}/delete`, {
        method: "DELETE",
    });

    if (ok) {
        deleteComment(commentId);
    }
};

const addComment = (text, id) => {
    const videoComments = document.querySelector(".video__comments ul");
    const newComment = document.createElement("li");
    newComment.className = "video__comment";
    newComment.dataset.id = id;
    const icon = document.createElement("i");
    icon.className = "fas fa-comment";
    const span = document.createElement("span");
    span.innerText = ` ${text}`;
    const span2 = document.createElement("span");
    span2.innerText = "❌";
    span2.id = "deleteBtn";
    span2.addEventListener("click", handleDelete);
    newComment.appendChild(icon);
    newComment.appendChild(span);
    newComment.appendChild(span2);
    videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
    event.preventDefault();
    const textarea = form.querySelector("textarea");
    const text = textarea.value;
    const videoId = videoContainer.dataset.id;
    if (text === "") {
        return;
    }
    const response = await fetch(`/api/videos/${videoId}/comment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
    });
    if (response.status === 201) {
        textarea.value = "";
        const { newCommentId } = await response.json();
        addComment(text, newCommentId);
    }
};

if (form) {
    form.addEventListener("submit", handleSubmit);
}

if (deleteBtn.length > 0) {
    let i = 0;
    while (i < deleteBtn.length) {
        deleteBtn[i].addEventListener("click", handleDelete);
        i++;
    }
}
