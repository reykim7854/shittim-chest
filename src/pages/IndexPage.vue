<template>
  <q-page class="row items-center justify-evenly">
    <!--  -->
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMetaStore } from 'src/stores/meta-store'

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const metaStore = useMetaStore()
    metaStore.setMetaData(
      'Home',
      'Welcome to Shittim Chest! A Blue Archive Interactive App'
    )
  }
})
</script>
