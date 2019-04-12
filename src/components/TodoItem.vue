<template>
  <div class="todo-item">
    <div class="todo-item-left">

        <!-- Label -->
        <div 
        v-if="!editing" 
        @dblclick="editTodo"
        :class="{completed: completed}"
        class="todo-item-label">
          <input type="checkbox" v-model="completed" @change="doneEdit"/>
          {{ title }}
        </div>
        <!-- end label -->

        <!-- Input -->
        <input
        v-else
        type="text" 
        class="todo-item-edit"
        v-model="title" 
        @blur="doneEdit"
        @keyup.enter="doneEdit"
        @keyup.esc="cancelEdit"
        v-focus
        />
        <!-- end input -->

      </div>
      <div>
        <button @click="pluralize">Pluralize</button>
        <span class="remove-item" @click="removeTodo(index)">
          &times;
        </span>
      </div>
  </div>
</template>

<script>
export default {
  name: 'todo-item',
  props: {
    todo: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    checkAll: {
      type: Boolean,
      required: true
    }
  },
  data(){
    return {
      id: this.todo.id,
      title: this.todo.title,
      completed: this.todo.completed,
      editing: this.todo.editing,
      beforeEditCache: '',
    }
  },
  methods: {
    removeTodo(index){
      eventBus.$emit('removedTodo', this.index)
    },
     editTodo(){
      this.beforeEditCache = this.title
      this.editing = true
    },
    doneEdit(){
      if (this.title.trim() === 0){
        this.title = this.beforeEditCache
      }
      this.editing = false
      eventBus.$emit('finishedEdit', {
        id: this.id,
        title: this.title,
        completed: this.completed,
        editing: this.editing
      })
    },
    cancelEdit(){
      this.title = this.beforeEditCache
      this.editing = false
    },
    pluralize(){
      eventBus.$emit('pluralize')
    },
    handlePluralize(){
      this.title = this.title + 's'
      eventBus.$emit('finishedEdit', {
        id: this.id,
        title: this.title,
        completed: this.completed,
        editing: this.editing
      })
    }
  },
  directives: {
    focus: {
      // directive definition
      inserted: function (el) {
        el.focus()
      }
    }
  },
  watch: {
    checkAll(){
      this.completed = this.checkAll 
      ? true 
      : this.todo.completed
    }
  },
  beforeDestroy(){
    eventBus.$off('pluralize', this.handlePluralize)
  },
  created(){
    eventBus.$on('pluralize', this.handlePluralize)
  }
}
</script>
