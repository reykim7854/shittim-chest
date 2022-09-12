<template>
  <q-layout view="lHh lpR lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer color="00d7fb">
      <q-tabs
        v-model="tab"
        align="justify"
        dense
        :breakpoint="0"
      >
        <q-route-tab
          v-for="(tab, i) in tabs"
          :key="`tab-${i}`"
          :icon="tab.icon"
          :to="tab.to"
        />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

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
  name: 'MobileLayout',

  components: {},

  setup () {
    const tab = ref('')
    return {
      tab,
      tabs
    }
  }
})
</script>
