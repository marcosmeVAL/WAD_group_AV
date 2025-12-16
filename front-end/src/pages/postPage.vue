<template>
  <div class="post-page">
    <div v-if="!post" class="status">Loading...</div>

    <div v-else class="post-container">
      <h2>Post Details</h2>

      <div class="post-head">
        <time class="post-date">{{ formatDate(post.created_at) }}</time>
      </div>

      <textarea v-model="post.body" rows="6"></textarea>

      <div class="buttons">
        <button @click="updatePost">Update</button>
        <button @click="deletePost">Delete</button>
      </div>

      <div v-if="status" class="status">{{ status }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostPage",
  data() {
    return {
      post: null,
      status: ''
    };
  },
  methods: {
    async fetchPost() {
      try {
        const res = await fetch(`http://localhost:3000/api/posts/${this.$route.params.id}`, {
          credentials: 'include'
        });
        if (!res.ok) throw new Error('Failed to fetch post');
        this.post = await res.json();
      } catch (err) {
        console.error(err);
        this.status = 'Error loading post.';
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
    async updatePost() {
      try {
        const res = await fetch(`http://localhost:3000/api/posts/${this.post.id}`, {
          method: 'PUT',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ body: this.post.body })
        });
        if (!res.ok) throw new Error('Update failed');
        this.status = 'Post updated successfully!';
      } catch (err) {
        console.error(err);
        this.status = 'Update failed.';
      }
    },
    async deletePost() {
      try {
        const res = await fetch(`http://localhost:3000/api/posts/${this.post.id}`, {
          method: 'DELETE',
          credentials: 'include'
        });
        if (!res.ok) throw new Error('Delete failed');  
        this.$router.push({ name: 'Main' });
      } catch (err) {
        console.error(err);
        this.status = 'Delete failed.';
      }
    }
  },
  mounted() {
    this.fetchPost();
  }
};
</script>

<style scoped>
.post-page {
  display: flex;
  justify-content: center;
  padding: 20px;
  min-height: 100vh;
  width: 100%;
}

.post-container {
  width: 100%;
  max-width: 600px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

textarea {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  resize: vertical;
  font-size: 1rem;
}

.buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
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
  text-align: center;
  color: #775900;
}
</style>
