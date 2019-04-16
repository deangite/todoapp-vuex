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
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'todo-check-all',
  computed: {
    ...mapGetters(['anyRemaining'])
  },
  methods: {
    ...mapActions(['allChecked'])
  }
}
</script>
