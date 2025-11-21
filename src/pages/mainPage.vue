<template>
  <div class="layout">
    <div class="left-rail"></div>

    <div class="feed">
      <h2 class="feed-header">Main Page</h2>

      <div class="posts">
        <!-- later: v-for PostItem here -->
      </div>
    </div>

    <div class="right-rail"></div>
  </div>
</template>

<script>
export default {
  name: 'mainPage'
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