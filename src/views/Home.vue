<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" class="logo">
    <TodoList />
  </div>
</template>

<script>
// @ is an alias to /src
import TodoList from '@/components/TodoList.vue'

export default {
  name: 'home',
  components: {
    TodoList
  }
}
</script>
