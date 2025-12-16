<template>
  <div class="post-page">
    <div class="post-container">
      <h2>Add New Post</h2>

      <div class="post-body">
        <label for="body">Post Body:</label>
        <textarea id="body" v-model="body" rows="6"></textarea>
      </div>

      <div class="buttons">
        <button @click="submitPost">Add Post</button>
      </div>

      <div v-if="error" class="status">{{ error }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddPostPage',
  data() {
    return {
      body: '',
      error: ''
    };
  },
  methods: {
    async submitPost() {
      if (!this.body.trim()) {
        this.error = 'Post body cannot be empty';
        return;
      }

      try {
        const res = await fetch('http://localhost:3000/api/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ body: this.body })
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || 'Failed to add post');
        }

        const data = await res.json();
        console.log('Post added:', data);

        this.$router.push({ name: 'Main' });
      } catch (err) {
        console.error(err);
        this.error = err.message || 'Error adding post';
      }
    }
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

.post-body label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
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
