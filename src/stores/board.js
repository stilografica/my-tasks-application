import { defineStore } from 'pinia'
import defaultBoard from '@/defaultBoard'
import { saveStatePlugin, uuid } from '@/utils'

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

export const useBoardStore = defineStore('board', {
  plugins: [saveStatePlugin],
  state: () => ({
    board
  }),
  getters: {
    getTask(state) {
      return (id) => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              return task
            }
          }
        }
      }
    }
  },
  actions: {
    createNewTask(task, column) {
      const index = this.board.columns.findIndex(col => col.name === column)
      this.board.columns[index].tasks.push(
        {
          name: task,
          description: '',
          userAssigned: null,
          id: uuid(),
        }
      )
      localStorage.setItem(
        'board',
        JSON.stringify(this.board)
      )
    },
    editTask(id, event) {
      const columnIndex = this.board.columns.findIndex((item) => {
        if (item.tasks.filter(task =>  task.id === id).length > 0 ) {
          return item
        }
        
      })
      
      const taskIndex = this.board.columns[columnIndex].tasks.findIndex(task => task.id === id)
      this.board.columns[columnIndex].tasks[taskIndex].name = event
      localStorage.setItem(
        'board',
        JSON.stringify(this.board)
      )
    },
    sortTaks() {
      localStorage.setItem(
        'board',
        JSON.stringify(this.board)
      )
    }
  },
})
