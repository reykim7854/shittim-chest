<template>
  <q-layout view="lHh lpR lFf">
    <q-page-container class="q-pa-md row justify-center">
      <div class="route-wrapper">
        <router-view />
      </div>
    </q-page-container>
    <q-footer color="00d7fb">
      <q-tabs v-model="tab" align="justify" :breakpoint="0">
        <q-route-tab
          v-for="(tab, i) in tabs"
          :key="`tab-${i}`"
          :icon="tab.icon"
          :to="tab.to"
        />
      </q-tabs>
    </q-footer>
    <q-page-scroller
      position="bottom-right"
      :scroll-offset="150"
      :offset="[18, 18]"
    >
      <q-btn fab icon="keyboard_arrow_up" color="primary" />
    </q-page-scroller>
  </q-layout>
</template>

<style lang="sass" scoped>
.route-wrapper
  width: 100%
  max-width: 1024px
</style>

<script lang="ts">
import { defineComponent, ref } from 'vue'

const tabs = [
  {
    icon: 'home',
    to: '/'
  },
  {
    icon: 'badge',
    to: '/characters'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {},

  setup() {
    const tab = ref('')
    return {
      tab,
      tabs
    }
  }
})
</script>
