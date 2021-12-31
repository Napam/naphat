<template>
  <section class="TextCycler">
    <transition :name="props.animationType" :class="props.animationType" mode="out-in">
      <h1 :key="currentText">{{ currentText }}</h1>
    </transition>
  </section>
</template>

<script lang="ts" setup>
import { ref, defineProps, PropType } from 'vue'
const props = defineProps({
  texts: {
    default: () => ['Sample', 'text'],
    type: Array as PropType<string[]>
  },
  interval: {
    default: () => 4000,
    type: Number
  },
  animationType: {
    default: () => 'upAndUp',
    type: String as PropType<'fade' | 'upAndDown' | 'upAndUp'>
  },
  animationSpeed: {
    default: () => 'auto',
    type: String,
    note: 'as CSS variable e.g. 2s, auto will use interval / 6000'
  }
})

const currentText = ref(props.texts[0])

let i = 0
const updateText = () => {
  i = ++i % props.texts.length
  currentText.value = props.texts[i]
}
setInterval(updateText, props.interval)

let transitionTime: string
if (props.animationSpeed === 'auto') {
  transitionTime = String(props.interval / 6000) + 's'
} else {
  transitionTime = props.animationSpeed.slice()
}
</script>

<style lang="scss" scoped>
.fade {
  &-enter-from, &-leave-to {
    opacity: 0;
  }

  &-leave-active, &-enter-active {
    transition: opacity v-bind(transitionTime);
  }

  &-leave-from, &-enter-to {
    opacity: 1;
  }
}

.upAndDown {
  &-enter-from, &-leave-to {
    transform: translateY(-20px);
    opacity: 0;
  }

  &-leave-active, &-enter-active {
    transition: all v-bind(transitionTime);
  }

  &-leave-from, &-enter-to {
    transform: translateY(0px);
    opacity: 1;
  }
}
.upAndUp {
  &-enter-from {
    transform: translateY(2rem);
    opacity: 0;
  }
  &-enter-to, &-leave-from {
    transform: translateY(0px);
    opacity: 1;
  }
  &-leave-active, &-enter-active {
    transition: all v-bind(transitionTime);
  }
  &-leave-to {
    opacity: 0;
    transform: translateY(-2rem);
  }
}
</style>
