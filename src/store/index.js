import { createStore } from 'vuex'

export default createStore({
    strict: true,

    state: {
        posts:[
            {
    id: 1,
    title: "Post 1",
    message: "Drone capture photo of Tartu",
    createdAt: "2025-10-01T10:00:00Z",
    image: { "src": "/images/tartuAboveShot.jpg", "alt": "Image of Tartu from sky" },
    author: { "name": "You", "avatar": "/images/me.png" },
    likes: 21,
    tags: ["tartu", "photo"]
  },
  {
    id: 2,
    title: "Post 2",
    message: "Anyone knows in which room is the lab today?",
    createdAt: "2025-10-01T08:45:00Z",
    image: {"src": "/images/villuK24.jpg"},
    author: { "name": "You", "avatar": "/images/matteusK24.png" },
    likes: 77,
    tags: ["question", "lab"]
  },
  {
    id: 3,
    title: "Post 3",
    message: "Flexbox is neat.",
    createdAt: "2025-09-30T16:30:00Z",
    image: null,
    author: { "name": "You", "avatar": "/images/me.png" },
    likes: 0,
    tags: ["css", "flexbox"]
  },
  {
    id: 4,
    title: "Post 4",
    message: "HM1 is neat.",
    createdAt: "2025-09-30T12:10:00Z",
    image: null,
    author: { "name": "You", "avatar": "/images/me.png" },
    likes: 0,
    tags: ["hm1"]
  },
  {
    id: 5,
    title: "Post 5",
    message: "Working on HM1.",
    createdAt: "2025-09-30T09:00:00Z",
    image: null,
    author: { "name": "You", "avatar": "/images/me.png" },
    likes: 0,
    tags: ["hm1", "progress"]
  },
  {
    id: 6,
    title: "Post 6",
    message: "Tartu riverside walk this morning.",
    createdAt: "2025-10-02T07:25:00Z",
    image: { "src": "/images/riverside.jpg", "alt": "Morning by the river in Tartu" },
    author: { "name": "You", "avatar": "/images/me.png" },
    likes: 0,
    tags: ["tartu", "morning"]
  },
  {
    id: 7,
    title: "Post 7",
    message: "Rounded corners + subtle shadow = chef’s kiss.",
    createdAt: "2025-10-02T18:40:00Z",
    image: null,
    author: { "name": "You", "avatar": "/images/me.png" },
    likes: 0,
    tags: ["ui", "css"]
  },
  {
    id: 8,
    title: "Post 8",
    message: "Anyone up for pair programming tonight?",
    createdAt: "2025-10-03T17:05:00Z",
    image: null,
    author: { "name": "You", "avatar": "/images/me.png" },
    likes: 0,
    tags: ["help", "pair"]
  },
  {
    id: 9,
    title: "Post 9",
    message: "Testing lazy-loading images on the feed.",
    createdAt: "2025-10-03T20:15:00Z",
    image: { "src": "/images/city-night.jpg", "alt": "City at night" },
    author: { "name": "You", "avatar": "/images/me.png" },
    likes: 0,
    tags: ["performance", "images"]
  },
  {
    id: 10,
    title: "Post 10",
    message: "Dropdown menu works—avatar click to open/close.",
    createdAt: "2025-10-04T10:50:00Z",
    image: null,
    author: { "name": "You", "avatar": "/images/me.png" },
    likes: 0,
    tags: ["js", "dropdown"]
  }
]
    },
    getters: {
        allPosts(state) {
            return state.posts;
    },
        postById: (state) => (id) => {
            return state.posts.find((p) => p.id === id);
    }
    },
    mutations: {
        IncreaseLike (state, postId) {
            const post = state.posts.find(p => p.id === postId)
            if (post) {
                post.likes += 1;
            }
        },

        ResetLike (state) {
            state.posts.forEach((p) => {
                p.likes = 0;
            })
        }
    },
    actions: {
    likePost({ commit }, postId) {
      commit("IncreaseLike", postId);
    },
    resetAllLikes({ commit }) {
      commit("ResetLike");
    }
  }
})