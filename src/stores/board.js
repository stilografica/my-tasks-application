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
      console.log(this.board.columns[index])
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
    }
  },
})
