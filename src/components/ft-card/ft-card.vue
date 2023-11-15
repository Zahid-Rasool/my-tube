<template>
  <div
    class="ft-card"
    @focusout="$emit('focusout')"
  >
    <slot />
  </div>
</template>

<script src="./ft-card.ts" />
<style scoped lang="scss" src="./ft-card.scss" />
