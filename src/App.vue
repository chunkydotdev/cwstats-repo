<template>
  <div id="app">
    <div class="d-none" id="nav">
      <router-link to="/">Home</router-link>
    </div>
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
