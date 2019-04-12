import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    filter: 'all',
    todos: [
      {
        id: 1,
        title: 'Finish vue screencast',
        completed: false,
        editing: false
      },
      {
        id: 2,
        title: 'Take over world',
        completed: false,
        editing: false
      }
    ]
  },
  getters: {
    remaining: state => {
      return state.todos.filter(t => !t.completed).length
    },
    anyRemaining: (state, getters) => {
      return getters.remaining != 0
    },
    todosFiltered: state => {
      if(state.filter === 'all'){
        return state.todos
      } else if(state.filter === 'active'){
        return state.todos.filter(t => !t.completed)
      } else if(state.filter === 'completed'){
        return state.todos.filter(t => t.completed)
      }

      return state.todos
    },
    showClearCompletedButton: state => {
      return state.todos.filter(t => t.completed).length > 0
    }
  },
  mutations: {

  },
  actions: {

  }
})
