<template>
  <div id="app" class="container">
    <router-view/>
  </div>
</template>

<style>

* {
  box-sizing: border-box;
}
.container{
  max-width: 600px;
  margin: 0 auto;
}
.logo{
  display: block;
  margin: 20px auto;
  height: 75px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 18px;
  /* text-align: center; */
  color: #2c3e50;
}
</style>
