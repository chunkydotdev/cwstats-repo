<template src="./App.html"></template>
<script src="./App.ts" lang="ts"></script>
<style lang="scss">
@import "./shared/scss/bootstrap-ext.scss";
@import "./shared/scss/colors.scss";
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

button {
  &:active,
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
