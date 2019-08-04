<template>
  <div class="mb-5" id="app">
    <nav class="navbar navbar-dark bg-dark">
      <router-link class="navbar-brand" to="/">CWSTATS</router-link>
    </nav>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Saira Stencil One", cursive;
  text-align: center;
  color: black;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
body {
  background-color: rgb(255, 242, 77);
}
</style>
