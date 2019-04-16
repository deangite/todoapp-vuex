<template>
  <div>
    <label for="">
      <input 
      type="checkbox" 
      :checked="!anyRemaining" 
      @change="allChecked"
      /> Check All
    </label>
  </div>
</template>

<script>
export default {
  name: 'todo-check-all',
  computed: {
    anyRemaining() {
      return this.$store.getters.anyRemaining
    }
  },
  methods: {
    allChecked(){
      this.$store.state.todos.forEach(t => t.completed = event.target.checked)
    }
  }
}
</script>
