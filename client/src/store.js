import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username: '',
      role: ''
    },
    itemList: [],
    itemCart: []
  },
  mutations: {
    setUser: function (state, payload) {
      state.user.username = payload.username
      // Vue.set(state.user, 'password', payload.password)
      // state.role = Object.assign({}, state.role, payload.role)
      state.user.role = payload.role
    },
    setItemList: function (state, payload) {
      state.itemList = payload.data
      // console.log(payload.data)
      console.log(state.itemList)
      console.log(state.user)
    },
    setCart: function (state, payload) {
      if (state.itemCart.length > 0) {
        state.itemCart.forEach(item => {
          console.log(item)
          if (item.itemName === payload.itemName) {
            item.total++
          } else {
            state.itemCart.push(payload)
          }
        })
      } else {
        state.itemCart.push(payload)
      }
      // console.log(typeof state.itemCart)
    }
  },
  actions: {
    register: function (context, payload) {
      console.log('masuk')
      axios.post('http://localhost:3000/register', {
        username: payload.username,
        password: payload.password,
        role: payload.role
      })
        .then(function (response) {
          context.commit('setUser', payload)
          localStorage.setItem('token', response.data.token)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    login: function (context, payload) {
      axios.post('http://localhost:3000/login', {
        username: payload.username,
        password: payload.password
      })
        .then(function (response) {
          // console.log('response' + JSON.stringify(response.data.user.role))
          localStorage.setItem('role', response.data.user.role)
          context.commit('setUser', response.data.user)
          localStorage.setItem('token', response.data.token)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getItem: function (context) {
      let token = localStorage.getItem('token')

      axios
        .get('http://localhost:3000/items', { headers: { token: token } })
        .then(response => {
          // If request is good...
          console.log(response.data)
          context.commit('setItemList', response.data)
        })
        .catch((error) => {
          console.log('error 3 ' + error)
        })
    },
    addItem: function (context, payload) {
      let token = localStorage.getItem('token')

      // console.log(payload)
      axios.post('http://localhost:3000/items/additem', payload, { headers: { token: token } })
        .then(response => {
          console.log(response)
        })
    },
    addToCart: function (context, payload) {
      context.commit('setCart', payload)
    }
  }
})
