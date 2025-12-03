<template>
  <div class="layout">
    <div class="left-rail"></div>

    <div class="feed">
      <header class="feed-header-row">
        <h2 class="feed-header">Main Page</h2>
        <button class="reset-likes" type="button" @click="resetAllLikes">
          Reset likes
        </button>
      </header>
      <post-compo />
    </div>

    <div class="right-rail"></div>
  </div>
</template>

<script>
import postCompo from './components/postCompo.vue'
export default {
  components: { postCompo },
  name: 'mainPage',
  methods: {
    resetAllLikes: function() {
      this.$store.dispatch("resetAllLikes")
    }
  }
}
</script>


<style>
.layout {
    display: flex;
    flex: 1;
    justify-content: center;
    gap: 16px;
    padding: 16px;
}
.left-rail,
.right-rail {
    display: none;
    flex: 1 0 0;
    background-color: gray;
    min-width: 0;
}
.feed {
  flex: 1 1 auto;
  max-width: 600px;
  width: min(100%, 600px);
  min-width: 0;
}
.posts {
    display: flex;
    flex-direction: column;
    gap: 12px;
}
.feed-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.feed-header {
  margin: 0;
}
.reset-likes {
  border: none;
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 0.9rem;
  cursor: pointer;
  background: #e0e0e0;
}
.reset-likes:hover {
  background: #d0d0d0;
}
@media (max-width: 700px) {
  .layout { padding: 12px; gap: 12px; }
  .post { padding: 8px; }
  .feed { max-width: 100%; padding: 0 10px;}
}

@media (min-width: 701px) {
  .left-rail,
  .right-rail {
    display: block;
  }

  .feed {
    flex: 0 0 600px;
    max-width: var(--feed-max);
    width: auto;
  }
}
</style>