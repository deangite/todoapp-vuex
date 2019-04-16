<template>
  <div>
    <button :class="{active: filter === 'all'}"
    @click="changeFilter('all')">All</button>
    <button :class="{active: filter === 'active'}" 
    @click="changeFilter('active')">Active</button>
    <button :class="{active: filter === 'completed'}" 
    @click="changeFilter('completed')">Completed</button>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'todo-filtered',
  computed: {
    filter(){
      return this.$store.state.filter
    }
  },
  methods: {
    ...mapActions(['changeFilter'])
  }
}
</script>
