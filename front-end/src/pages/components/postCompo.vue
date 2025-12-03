<template>
  <section class="posts">
    <PostItem
      v-for="post in posts"
      :key="post.id"
      :post-id="post.id"
    />
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import PostItem from "./PostItem.vue";

export default {
  name: "PostList",
  components: { PostItem },
  computed: {
    ...mapGetters(["allPosts"]),
    posts() {
      return this.allPosts;
    }
  }
};
</script>

<style scoped>
.posts {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>