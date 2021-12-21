<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <TextCycler :texts="texts" :interval="3500"/>
  <h1>Developer</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TextCycler from './components/TextCycler.vue'

export default defineComponent({
  name: 'App',
  components: {
    TextCycler
  },
  setup () {
    const texts = [
      'Hello, welcome',
      'Hei, velkommen',
      'ยินดีต้อนรับ',
      'Kisssshaa'
    ]
    return { texts }
  }
})
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
