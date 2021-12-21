<template>
  <transition name="fade" mode="out-in">
    <h1 :key="currentText"  class="textRoller">{{ currentText }}</h1>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'

export default defineComponent({
  props: {
    texts: {
      default: () => ['Sample', 'text'],
      type: Array as PropType<string[]>
    },
    interval: {
      default: () => 3500,
      type: Number
    }
  },
  setup (props) {
    const currentText = ref(props.texts[0])
    let i = 0
    const updateText = () => {
      i = ++i % props.texts.length
      currentText.value = props.texts[i]
    }

    setInterval(updateText, props.interval)

    return { currentText }
  }
})
</script>

<style lang="postcss" scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-leave-active {
  transition: opacity 0.75s;
}
.fade-enter-active {
  transition: opacity 1s;
}

.fade-leave-from,
.fade-enter-to {
  opacity: 1;
}
</style>
