<style lang="sass" scoped>
.filter-wrapper
  width: 100%
</style>

<template>
  <div class="filter-wrapper row">
    <div class="col-12 col-sm-4 col-md-6">
      <slot name="left"></slot>
    </div>
    <div
      class="q-mt-md q-mt-sm-none col-12 col-sm-8 col-md-6 row align-center"
      :class="{
        'justify-end': $q.screen.gt.xs,
        'justify-evenly': $q.screen.lt.sm
      }"
    >
      <slot name="right"></slot>
    </div>
  </div>
</template>
