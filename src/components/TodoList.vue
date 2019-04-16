<template>
  <div>
    <input 
    type="text" 
    class="todo-input" 
    placeholder="What need to be done" 
    @keyup.enter="addToDo" 
    v-model="newTodo"
    />
    <TodoItem v-for="(todo, index) in todosFiltered"
    :key="todo.id" 
    :index="index"
    :todo="todo"
    :checkAll="!anyRemaining"
    />
    <div class="extra-container">
      <TodoCheckAll/>
      <TodoItemsRemaining />
    </div>
    <div class="extra-container">
      <TodoFiltered />
      <TodoClearCompleted />
    </div>
  </div>
</template>

<script>
import TodoItem from './TodoItem'
import TodoItemsRemaining from './TodoItemsRemaining'
import TodoCheckAll from './TodoCheckAll'
import TodoFiltered from './TodoFiltered'
import TodoClearCompleted from './TodoClearCompleted'
import {mapGetters, mapActions, mapState} from 'vuex'
export default {
  name: 'todo-list',
  components: {
    TodoItem,
    TodoItemsRemaining,
    TodoCheckAll,
    TodoFiltered,
    TodoClearCompleted
  },
  computed: {
    ...mapGetters([
      'remaining',
      'anyRemaining',
      'todosFiltered',
      'showClearCompletedButton'
    ])
  },
  data () {
    return {
      newTodo: '',
      idForTodo: 3,
      beforeEditCache: ''
    }
  },
  methods: {
    ...mapActions(['setTodo']),
    addToDo(){
      if (this.newTodo.trim() === 0) return false
      this.setTodo({
        id: this.idForTodo,
        title: this.newTodo
      })
      this.newTodo = ''
      this.idForTodo += 1
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .todo-input{
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;

    &:focus{
      outline: 0;
    }
  }
  .todo-item{
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  .remove-item{
    cursor: pointer;
    margin-left: 14px;
    &:hover{
      color: black;
    }
  }
  .todo-item-label{
    padding: 10px 0;
    border: 1px solid white;
    // margin-left: 12px;
  }
  .todo-item-edit{
    font-size: 18px;
    color: #2c3e50;
    margin-left: 12px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    &:focus{
      outline: none;
    }
  }
  .completed{
    text-decoration: line-through;
    color: darkgray;
  }
  .extra-container{
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    border-top: 1px solid lightgrey;
    padding-top: 14px;
    margin-bottom: 14px;
  }
  button{
    font-size: 12px;
    background-color: white;
    appearance: none;
    
    &:hover{
      background: lightgreen;
    }

    &:focus{
      outline: none;
    }
  }
  .active{
    background-color: lightgreen;
  }
</style>

