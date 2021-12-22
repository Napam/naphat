<template>
  <TextCycler :texts="texts"/>
</template>

<script lang="ts" setup>
import TextCycler from './components/TextCycler.vue'

const texts = [
  'Good evening',
  'I am Naphat',
  'Welcome'
]
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
