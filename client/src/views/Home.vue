<template>
  <div>
    <navbar/>
    <div class="home d-flex justify-content-center">
      <!-- <img src="../assets/logo.png"> -->
      <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
      <!-- <div>
        <form>
          <div class="form-group">
            <h3>Login</h3>
            <label for="exampleInputEmail1">Username</label>
            <input type="text" v-model="username" class="form-control" placeholder="Username">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" v-model="password" class="form-control" placeholder="Password">
          </div>
          <button type="submit" @click="login" class="btn btn-primary">Login</button>
        </form>
      </div>
      <div>
        <form>
          <div class="form-group">
            <h3>Register</h3>
            <label for="exampleInputEmail1">Username</label>
            <input type="text" v-model="usernameReg" class="form-control" placeholder="Username">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" v-model="passwordReg" class="form-control" placeholder="Password">
          </div>
          <div>
            <select v-model="role">
              <option disabled value="">Please select one</option>
              <option>user</option>
              <option>admin</option>
            </select>
          </div>
          <button type="submit" @click="register" class="btn btn-primary">Register</button>
        </form>
      </div> -->
        <div class="loginreg">
          <form>
            <div class="form-group">
              <h3>Login</h3>
              <label for="exampleInputEmail1">Email</label>
              <input type="text" @keyup="emailLoginValid" v-model="email" :id="emailLogVal" class="form-control" placeholder="email">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" @keyup="passLoginValid" v-model="password" :id="passLogVal" class="form-control" placeholder="Password">
            </div>
            <button v-if="logVal === false" type="submit" disabled="disabled" class="btn btn-primary">Login</button>
            <button v-if="mauSubmit === true && logVal === true" type="submit" @click="login" class="btn btn-primary">Login</button>
            <button v-if="mauSubmit === false" class="buttonload">
              <i class="fa fa-spinner fa-spin"></i>Loading
            </button>
          </form>
        </div>
        <div class="loginreg">
          <form>
            <div class="form-group">
              <h3>Register</h3>
              <label for="exampleInputEmail1">Email</label>
              <input type="text" @keyup="emailRegisValid" v-model="emailReg" class="form-control" :id="emailRegVal" placeholder="email">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" @keyup="passRegisValid" v-model="passwordReg" class="form-control" :id="passRegVal" placeholder="Password">
            </div>
            <div>
              <select v-model="role">
                <option disabled value="">Please select one</option>
                <option>user</option>
                <option>admin</option>
              </select>
              {{role}}
            </div>
            <button v-if="RegVal === false" type="submit" disabled="disabled" class="btn btn-primary">Register</button>
            <button v-if="mauSubmit === true && RegVal === true" type="submit" @click="register" class="btn btn-primary">Register</button>
            <button v-if="mauSubmit === false" class="buttonload">
              <i class="fa fa-spinner fa-spin"></i>Loading
            </button>
          </form>
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import navbar from '@/components/NavBar.vue'

export default {
  name: 'home',
  components: {
    navbar
  },
  data () {
    return {
      // username: '',
      // password: '',
      // usernameReg: '',
      // passwordReg: '',
      role: '',
      email: '',
      password: '',
      emailReg: '',
      passwordReg: '',
      mauSubmit: true,
      emailLogVal: '1',
      passLogVal: '2',
      emailRegVal: '3',
      passRegVal: '4'
    }
  },
  methods: {
    // register: function () {
    //   let payload = {
    //     username: this.usernameReg,
    //     password: this.passwordReg,
    //     role: this.role
    //   }

    //   this.$store.dispatch('register', payload)

    //   this.$router.push('/catalogue')
    // },
    // login: function () {
    //   let payload = {
    //     username: this.username,
    //     password: this.password,
    //     role: this.role
    //   }

    //   this.$store.dispatch('login', payload)

    //   this.$router.push('/catalogue')
    // }
    emailLoginValid: function () {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(String(this.email).toLowerCase())) {
        this.emailLogVal = 'emailVal'
        // this.logVal = true
      } else {
        this.emailLogVal = 'emailNotVal'
        // this.logVal = false
      }
    },
    passLoginValid: function () {
      if (this.password.length >= 4) {
        this.passLogVal = 'passVal'
      } else {
        this.passLogVal = 'passNotVal'
      }
    },


    emailRegisValid: function () {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(String(this.emailReg).toLowerCase())) {
        this.emailRegVal = 'emailRegVal'
        // this.logVal = true
      } else {
        this.emailRegVal = 'emailRegNotVal'
        // this.logVal = false
      }
    },
    passRegisValid: function () {
      if (this.passwordReg.length >= 4) {
        this.passRegVal = 'passRegVal'
      } else {
        this.passRegVal = 'passRegNotVal'
      }
    },


    register: function () {
      let payload = {
        email: this.emailReg,
        password: this.passwordReg,
        role: this.role
      }

      this.mauSubmit = false

      this.$store.dispatch('register', payload)
      .then((loggedin) => {
        this.$router.push('/catalogue')
      })
      .catch((err) => {
        alert(error)
      })
    },
    login: function () {
      let payload = {
        email: this.email,
        password: this.password
      }

      this.mauSubmit = false

      this.$store.dispatch('login', payload)
      .then((loggedin) => {
        this.$router.push('/catalogue')
      })
      .catch((err) => {
        this.mauSubmit = true
        alert('email atau pasword salah!')
      })
    }
  },
  computed: {
    logVal: function () {
      if (this.emailLogVal === 'emailVal' && this.passLogVal === 'passVal') {
        return true
      } else {
        return false
      }
    },
    RegVal: function () {
      if (this.emailRegVal === 'emailRegVal' && this.passRegVal === 'passRegVal') {
        return true
      } else {
        return false
      }
    }
  },
  created () {
    let token = localStorage.getItem('token')

    if (token) {
      // this.$router.push('/catalogue')
    }
  }
}
</script>

<style>
  .loginreg {
    margin: 20px;
    border-radius: 25px;
    border: 2px solid #73AD21;
    padding: 20px; 
    width: 200px;
    /* height: 150px;  */
  }
  #emailVal {
    border: 1px solid green;
  }
  #emailNotVal {
    border: 1px solid red;
  }
  #passVal {
    border: 1px solid green;
  }
  #passNotVal {
    border: 1px solid red;
  }

  #emailRegVal {
    border: 1px solid green;
  }
  #emailRegNotVal {
    border: 1px solid red;
  }
  #passRegVal {
    border: 1px solid green;
  }
  #passRegNotVal {
    border: 1px solid red;
  }

</style>
