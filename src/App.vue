<template>
  <nav class="navbar navbar-light px-5 nav-color">
    <a class="navbar-brand" href="#">Pomodoro Timer</a>
  </nav>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
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
  background-color: #E8DCB9 !important;
  background-repeat: no-repeat !important;
  background-size: 100% 100% !important;
}
html {
  height: 100% !important
}
.nav-color {
  background-color: #7798AB !important;
  border-bottom: 1px solid;
  //box-shadow: 2px 0px 20px 5px #6694af;
}
.multiselect {
  background-color: #E8DCB9 !important;
}
</style>
