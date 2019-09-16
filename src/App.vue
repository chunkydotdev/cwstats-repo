<template src="./App.html"></template>
<script src="./App.ts" lang="ts"></script>
<style lang="scss">
@import "../node_modules/bootstrap/scss/functions";
@import "../node_modules/bootstrap/scss/variables";
@import "../node_modules/bootstrap/scss/mixins/_breakpoints";
@import "./shared/scss/bootstrap-ext.scss";
@import "./shared/scss/colors.scss";
#app {
  font-family: "code-saver";
  text-align: center;
  color: black;

  @include media-breakpoint-up(md) {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 60px auto 100px;
    align-items: stretch;
  }

  button,
  h1,
  h2,
  h3,
  h4,
  h5 {
    font-family: exocet;
  }
}
body {
  background-color: rgb(255, 242, 77);
}
@font-face {
  font-family: "Exocet";
  src: url("./assets/exocet.ttf");
}
@font-face {
  font-family: "code-saver";
  src: url("./assets/CodeSaver-Regular.otf") format("opentype");
}

button {
  &:focus {
    outline-color: $color-yellow-primary;
  }
}

a {
  &:active,
  &:focus {
    outline-color: $color-yellow-05;
  }
}
</style>
