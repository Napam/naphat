<template>
  <NavBar>
  </NavBar>
  <TextCycler :texts="texts"/>
</template>

<script lang="ts" setup>
import TextCycler from './components/TextCycler.vue'
import NavBar from './components/NavBar.vue'
import { getPartOfDay } from './utils'

const texts = [
  'Good ' + getPartOfDay(),
  'I am Naphat',
  'Welcome to my site'
]
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.NavBar {
  margin-bottom: 4rem;
}

body {
  margin: 0px;
}
</style>
