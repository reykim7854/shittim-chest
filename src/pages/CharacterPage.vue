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

export default defineComponent({
  name: 'CharacterPage',
  components: { CharacterList },
  setup () {
    const characterStore = useCharacterStore()
    const loading = computed(() => characterStore.charactersLoading)
    if (characterStore.characters.length <= 0) {
      characterStore.dispatchCharacters()
    }
    const characters = computed(() => characterStore.characters)
    const characterImages = computed(() => characterStore.characterImages)

    return { characters, characterImages, loading }
  }
})
</script>
