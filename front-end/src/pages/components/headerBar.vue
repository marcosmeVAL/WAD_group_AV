<template>
    <header class="top-bar">
        <nav class="nav">
            <h1 class="logo">Logo</h1>

            <router-link to="/" class="nav-link">Home</router-link>
            <router-link to="/contacts" class="nav-link">Contacts</router-link>
            <router-link v-if="!isAuth" to="/login" class="nav-link">Login</router-link>
            <button v-else class="nav-link btn-link" @click="logout">Logout</button>
        </nav>
    </header>
</template>

<script>
import { api } from "@/api";

export default {
  name: "headerBar",
  data() {
    return { isAuth: false };
  },
  async mounted() {
    await this.refreshAuth();
  },
  watch: {
    "$route.fullPath": async function () {
      await this.refreshAuth();
    }
  },
  methods: {
    async refreshAuth() {
      const r = await api("/auth/authenticate").catch(() => ({ authenticated: false }));
      this.isAuth = !!r.authenticated;
    },
    async logout() {
      await api("/auth/logout");
      this.isAuth = false;
      this.$router.push({ name: "Login" });
    }
  }
};
</script>

<style>
.top-bar {
  background: #6a6b6bff;
  padding: 10px 12px;
}
.nav {
    display: flex;
    align-items: center;
    gap: 12px;
}
.logo {
    margin-right: auto;
    font-size: 1.2rem;
}
.nav-link {
    text-decoration: none;
    color: #fff;
    padding: 6px 10px;
    border-radius: 75%;
}
.nav-link:hover {
    background: #1898b8ff;
}
.nav-link.router-link:active {
    background: #640764ff;
}
.nav-button {
  border: none;
  background: transparent;
  cursor: pointer;
  font: inherit;
  color: inherit;
}
.btn-link {
  border: none;
  background: transparent;
  cursor: pointer;
}
</style>