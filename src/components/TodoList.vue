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
      <TodoCheckAll :anyRemaining="anyRemaining"/>
      <TodoItemsRemaining />
    </div>
    <div class="extra-container">
      <TodoFiltered />
      <div>
        <button v-if="showClearCompletedButton" 
        @click="clearCompleted">Clear Completed</button>
      </div>
    </div>
  </div>
</template>

<script>
import TodoItem from './TodoItem'
import TodoItemsRemaining from './TodoItemsRemaining'
import TodoCheckAll from './TodoCheckAll'
import TodoFiltered from './TodoFiltered'
import {mapGetters} from 'vuex'
export default {
  name: 'todo-list',
  components: {
    TodoItem,
    TodoItemsRemaining,
    TodoCheckAll,
    TodoFiltered
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
    addToDo(){
      if (this.newTodo.trim() === 0) return false
      this.$store.state.todos.push({
        id: this.idForTodo,
        title: this.newTodo,
        completed: false,
        editing: false
      })
      this.newTodo = ''
      this.idForTodo += 1
    },
    finishedEdit(data){
      const index = this.$store.state.todos.findIndex(item => item.id === data.id)
      this.$store.state.todos.splice(index, 1, data)
    },
    removeTodo(index){
      this.$store.state.todos.splice(index, 1)
    },
    checkAllTodos(){
      this.$store.state.todos.forEach(t => t.completed = event.target.checked)
    },
    clearCompleted(){
      this.$store.state.todos = this.$store.state.todos.filter(t => !t.completed)
    }
  },
  created(){
    eventBus.$on('removedTodo', (index) => this.removeTodo(index))
    eventBus.$on('finishedEdit', (data) => this.finishedEdit(data))
    eventBus.$on('checkAllChanged', (checked) => this.checkAllTodos(checked))
    eventBus.$on('filterChanged', (filter) => this.$store.state.filter = filter)
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

