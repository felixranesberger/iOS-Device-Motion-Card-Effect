<script setup>
import { ref, computed } from 'vue'

const orientation = ref({});

const calcValue = (value) => Math.min(Math.max(value, -20), 20);

const requestPermission = () => {
  DeviceMotionEvent.requestPermission();
}

window.addEventListener('deviceorientation', ({ beta, gamma }) => {
  orientation.value = {
    beta: calcValue(beta),
    gamma: calcValue(gamma)
  };
});

const foregroundStyle = computed(() => `translateX(${orientation.value.gamma / 3.5 || 0}px) translateY(${orientation.value.beta / 3.5 || 0}px)`);
const backgroundStyle = computed(() => `translateX(${(orientation.value.gamma / 6 || 0)}px) translateY(${(orientation.value.beta / 6) || 0}px)`);
</script>

<template>
  <div id="container" class="container" />

  <button
      class="absolute bottom-4 right-4 hover:bottom-5 transition-all"
      @click="requestPermission"
  >
    Request Permission
  </button>
</template>

<style lang="scss">
.container {
  @apply relative w-64 h-96 rounded-3xl bg-cover overflow-hidden;

  &::before {
    --base-indent: -20px;

    position: absolute;
    top: var(--base-indent);
    bottom: var(--base-indent);
    left: var(--base-indent);
    right: var(--base-indent);
    transform: v-bind(backgroundStyle);

    content: '';
    background-image: url('src/assets/background.png');
    background-size: cover;
  }

  &::after {
    --base-indent: -20px;

    position: absolute;
    top: var(--base-indent);
    bottom: var(--base-indent);
    left: var(--base-indent);
    right: var(--base-indent);
    transform: v-bind(foregroundStyle);
    z-index: 1;

    background-image: url('src/assets/foreground.png');
    background-size: cover;
    content: '';
  }
}
</style>
