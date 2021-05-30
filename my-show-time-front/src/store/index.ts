import { createStore } from 'vuex'
import { useToast } from 'vue-toastification'

const toast = useToast()

export default createStore({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  actions: {
    increment(context) {
      context.commit('increment')
      toast.success("incremented!")
    }
  },
  modules: {
  }
})
