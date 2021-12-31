<template>
  <section class="NavBar">
    <button class="NavBar-buttonContainer">Resume</button>
    <button class="NavBar-buttonContainer">Github</button>
    <button class="NavBar-buttonContainer">More</button>
    <button class="NavBar-buttonContainer">Gallery</button>
  </section>
</template>

<script lang="ts" setup>

</script>

<style lang="scss">
button, input[type="submit"], input[type="reset"] {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
}
.NavBar {
  background-color: rgb(61, 59, 56);
  width: 100%;
  display: flex;
  justify-content: center;

  &-buttonContainer {
    color: gainsboro;
    background-color: transparent;
    margin: 0.5rem 0.75rem 0.5rem 0.75rem;
    font-size: 0.8rem;
    display: inline-flex;
    align-items: center;

    &:hover {
      transition: all 1s ease;
      color: white;
    }
  }
}
</style>
