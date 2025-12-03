<template>
    <header class="top-bar">
        <nav class="nav">
            <h1 class="logo">Logo</h1>

            <router-link to="/" class="nav-link">Home</router-link>
            <router-link to="/login" class="nav-link">Login</router-link> 
        </nav>
    </header>
</template>

<script>
export default {
    name: "headerBar"
}
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
</style>