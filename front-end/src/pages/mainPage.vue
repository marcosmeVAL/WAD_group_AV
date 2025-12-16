<template>
  <div class="home-page">

    <div class="top-actions">
      <button @click="logout">Logout</button>
    </div>

    <main class="layout">
      <section class="feed">
        <h2 class="feed-header">Latest Posts</h2>

        <div v-if="!posts.length" class="status">No posts yet.</div>

        <div class="posts">
          <div 
            v-for="post in posts" :key="post.id" 
            class="post" @click="$router.push({ name: 'Post', params: { id: post.id } })"
            style="cursor: pointer;"
          >
            <div class="post-head">
              <time class="post-date">{{ formatDate(post.created_at) }}</time>
            </div>
            <p class="post-message">{{ post.body }}</p>
          </div>
        </div>


        <div class="buttons">
          <button @click="$router.push({name: 'AddPost'})">Add Post</button>
          <button @click="deleteAllPosts">Delete All</button>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      posts: []
    };
  },
  methods: {
    async fetchPosts() {
      try {
        const res = await fetch('http://localhost:3000/api/posts', {
          credentials: 'include'
        });
        if (!res.ok) {
          console.error('Not authenticated or fetch failed');
          return;
        }
        this.posts = await res.json();
      } catch (err) {
        console.error(err);
      }
    },
    formatDate(dateStr) {
      const d = new Date(dateStr);
      const hours = String(d.getHours()).padStart(2, '0');
      const minutes = String(d.getMinutes()).padStart(2, '0');
      const month = d.toLocaleString('en-US', { month: 'short' });
      const day = d.getDate();
      const year = d.getFullYear();
      return `${hours}:${minutes} ${month} ${day}, ${year}`;
    },
    async deleteAllPosts() {
      try {
        const res = await fetch('http://localhost:3000/api/posts', {
          method: 'DELETE',
          credentials: 'include'
        });
        if (!res.ok) throw new Error('Delete failed');
        this.posts = [];
      } catch (err) {
        console.error(err);
      }
    },
    async logout() {
      try {
        const res = await fetch('http://localhost:3000/auth/logout', {
          method: 'GET',
          credentials: 'include'
        });
        console.log(await res.json());
        this.$router.push('/login');
      } catch (err) {
        console.error(err);
      }
    }
  },
  mounted() {
    this.fetchPosts();
  }
};
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  background-color: #f0f0f0;
}

.layout {
  display: flex;
  justify-content: center;
  width: 100%;
}

.feed {
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.feed-header {
  margin-bottom: 12px;
  text-align: center;
  width: 100%;
}

.posts {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 80%;
}

.post {
  background: #ffffff;
  border-radius: 12px;
  padding: 12px;
  width: 100%;
  box-sizing: border-box;
}

.post-head {
  display: flex;
  align-items: center;
}

.post-date {
  margin-left: auto;
  color: #555;
  font-size: 0.9rem;
}

.post-message {
  margin: 8px 0 0 0;
}

.top-actions {
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.top-actions button {
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  background: #007bff;
  color: white;
  cursor: pointer;
}

.top-actions button:hover {
  background: #0056b3;
}

.buttons {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  justify-content: center;
  width: 100%;
}

.buttons button {
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  background: #007bff;
  color: white;
  cursor: pointer;
}

.buttons button:hover {
  background: #0056b3;
}

.status {
  margin-top: 8px;
  padding: 10px;
  border-radius: 8px;
  background: #fff8e1;
  border: 1px solid #ffe082;
  color: #775900;
  text-align: center;
}

</style>