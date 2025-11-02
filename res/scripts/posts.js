// Displaying the json posts from here
// Status is still to be added
const POSTS_ENDPOINT = "https://raw.githubusercontent.com/marcosmeVAL/WAD_group_AV/refs/heads/main/data/posts.json";

const container = document.getElementById("posts");
const statusBox = document.getElementById("status");  
const postTemplate = document.getElementById("post-template");

function formatDate(isoString) {
    const d = new Date(isoString);

    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const day = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${month} ${day}, ${year}`;
}

function createPostElement(postData) {
    const clone = postTemplate.content.cloneNode(true);

    const avatarPicEl = clone.querySelector(".post-avatar-pic");
    const titleEl = clone.querySelector(".post-title");
    const dateEl = clone.querySelector(".post-date");
    const imgEl = clone.querySelector(".post-img");
    const messageEl = clone.querySelector(".post-message");
    const likeBtn = clone.querySelector(".post-like");

    if (avatarPicEl) {
        avatarPicEl.src = postData.author?.avatar || "";
        avatarPicEl.alt = postData.author?.name || "author avatar";
    }

    if (titleEl) {
        const authorName = postData.author?.name || "Unknown";
        const titleText = postData.title ? `${postData.title} — ${authorName}` : authorName;
        titleEl.textContent = titleText;
    }

    if (dateEl) {
        dateEl.textContent = formatDate(postData.createdAt);
        dateEl.dateTime = postData.createdAt;
    }

    if (imgEl) {
        if (postData.image && postData.image.src) {
            imgEl.src = postData.image.src;
            imgEl.alt = postData.image.alt || "";
            imgEl.hidden = false;
        } else {
            imgEl.hidden = true;
        }
    }

    if (messageEl) {
        messageEl.textContent = postData.message || "";
    }

    if (likeBtn) {
        likeBtn.textContent = `👍 ${postData.likes ?? 0}`;

        likeBtn.addEventListener("click", () => {
            let currentLikes = postData.likes ?? 0;
            currentLikes += 1;
            postData.likes = currentLikes;
            likeBtn.textContent = `👍 ${currentLikes}`;
        });
    }

    return clone;
}

function renderPosts(postsArray) {
    container.innerHTML = "";

    postsArray.forEach(postObj => {
        const postEl = createPostElement(postObj);
        container.appendChild(postEl);
    })
}

function loadPostsFromEndpoint() {
    fetch(POSTS_ENDPOINT)
        .then(response => response.json())
        .then(data => {
            renderPosts(data)
        })
}

loadPostsFromEndpoint()
