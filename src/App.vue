<template>
  <div class="mb-5" id="app">
    <nav class="navbar navbar-dark bg-dark">
      <router-link class="navbar-brand" to="/">CWSTATS</router-link>
      <form v-if="currentRoute !== 'home'" class="form-inline d-flex flex-nowrap">
        <input
          v-model="wizardId"
          @keyup.enter="lookupWizardById()"
          type="number"
          class="form-control color-black"
          placeholder="Id..."
          aria-label="Lookup a wizard by id"
          aria-describedby="home-title"
        />
        <div class="input-group-append">
          <button class="btn border-black text-warning" type="button" @click="lookupWizardById()">Go</button>
        </div>
      </form>
    </nav>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>
<script src="./App.ts" lang="ts"></script>
<style lang="scss">
@import "./shared/scss/bootstrap-ext.scss";
#app {
  font-family: exocet, cursive;
  text-align: center;
  color: black;
}
body {
  background-color: rgb(255, 242, 77);
}
@font-face {
  font-family: "Exocet";
  src: url("./assets/exocet.ttf");
}
</style>
