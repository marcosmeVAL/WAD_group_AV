<template>
  <article v-if="post" class="post">
    <header class="post-head">
      <div class="post-avatar" aria-hidden="true">
        <img
          class="post-avatar-pic"
          :src="post.author.avatar"
          :alt="post.author.name"
        />
      </div>
      <div class="post-head-main">
        <h3 class="post-title">{{ post.title }}</h3>
        <time class="post-date" :datetime="post.createdAt">
          {{ formattedDate }}
        </time>
      </div>
    </header>

    <img
      v-if="post.image && post.image.src"
      class="post-img"
      :src="post.image.src"
      :alt="post.image.alt"
      loading="lazy"
    />

    <p class="post-message">
      {{ post.message }}
    </p>

    <footer class="post-footer">
      <div class="post-tags">
        <span v-for="tag in post.tags" :key="tag" class="post-tag">
          #{{ tag }}
        </span>
      </div>
      <button class="post-like" type="button" @click="like">
        👍 <span class="like-count">{{ post.likes }}</span>
      </button>
    </footer>
  </article>
</template>

<script>
export default {
  name: "PostItem",
  props: {
    postId: {
      type: Number,
      required: true
    }
  },
  computed: {
    post() {
      return this.$store.getters.postById(this.postId);
    },
    formattedDate() {
      if (!this.post) return "";
      try {
        return new Date(this.post.createdAt).toLocaleString();
      } catch (e) {
        return this.post.createdAt;
      }
    }
  },
  methods: {
    like() {
      this.$store.dispatch("likePost", this.postId);
    }
  }
};
</script>

<style scoped>
.post {
  background: #ffffff;
  border-radius: 12px;
  padding: 12px 14px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.post-head {
  display: flex;
  align-items: center;
  gap: 10px;
}

.post-avatar-pic {
  width: 40px;
  height: 40px;
  border-radius: 999px;
  object-fit: cover;
}

.post-head-main {
  display: flex;
  flex-direction: column;
}

.post-title {
  margin: 0;
  font-size: 1rem;
}

.post-date {
  font-size: 0.8rem;
  color: #666;
}

.post-img {
  max-width: 100%;
  border-radius: 10px;
  margin-top: 4px;
}

.post-message {
  margin: 4px 0 0;
  font-size: 0.95rem;
}

.post-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 6px;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  font-size: 0.8rem;
}

.post-tag {
  background: #e6f4ff;
  border-radius: 999px;
  padding: 2px 8px;
}

.post-like {
  border: none;
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 0.9rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: #1da1f2;
  color: #fff;
}

.post-like:hover {
  filter: brightness(1.05);
}
</style>