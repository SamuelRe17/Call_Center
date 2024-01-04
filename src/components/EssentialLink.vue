<template>
  <q-item clickable tag="a" target="_blank">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>
    <q-expansion-item expand-separator class="menu-component-icon menu-component-label" icon="grid_view" :label="title"
      clickable>
      <q-item clickable tag="a" target="_blank" :href="item.url" v-for="item in data" :key="item">
        <q-item-section class="menu-component-section">
          <q-item-label class="menu-component-label">{{ item.element }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-expansion-item>
  </q-item>
  
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EssentialLink',
  data() {
    return {
      a: ''
    }

  },
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default: null
    }
  },
  setup() {
    return {

    }
  }
})
</script>
