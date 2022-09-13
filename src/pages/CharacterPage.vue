<template>
  <q-page>
    <character-list
      :characters="characters"
      :character-images="characterImages"
      :loading="loading"
    ></character-list>
  </q-page>
</template>

<script lang="ts">
import CharacterList from 'components/CharacterList.vue'
import { defineComponent, computed } from 'vue'
import { useCharacterStore } from 'src/stores/character-store'
import { useMetaStore } from 'src/stores/meta-store'

export default defineComponent({
  name: 'CharacterPage',
  components: { CharacterList },
  setup () {
    const characterStore = useCharacterStore()
    const loading = computed(() => characterStore.charactersLoading)
    if (characterStore.characters.length <= 0) {
      characterStore.setCharacters()
    }
    const characters = computed(() => characterStore.characters)
    const characterImages = computed(() => characterStore.characterImages)

    const metaStore = useMetaStore()
    metaStore.setMetaData('Character', 'Test 3')

    return { characters, characterImages, loading }
  }
})
</script>
