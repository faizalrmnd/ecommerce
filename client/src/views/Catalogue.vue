<template>
  <div>
    <navbar/>
    <!-- <button type="button" v-if="user.role == 'admin'" class="btn btn-primary">Add Item</button> -->
    <!-- Button trigger modal -->
    <button type="button" v-if="this.role == 'admin'" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
      Add Item
    </button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Add Item</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <p>Item name:</p>
              <input class="form-control" v-model="itemName" type="text" placeholder="item name">
              <p>Item price:</p>
              <input class="form-control" v-model="price" type="number" placeholder="price">
              <p>Item seller:</p>
              <input class="form-control" v-model="penjual" type="text" placeholder="seller">
              <p>Item stock:</p>
              <input class="form-control" v-model="stock" type="number" placeholder="stock">
              <div class="form-group">
                <label for="exampleFormControlFile1">Input Photo</label>
                <input type="file" id="image" class="form-control-file">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" @click="addItem" data-dismiss="modal" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    <Cart/>
    <itemCard></itemCard>
  </div>
</template>

<script>
// @ is an alias to /src
import ItemCard from '@/components/ItemCard.vue'
import Cart from '@/components/Cart.vue'
import navbar from '@/components/NavBar.vue'
import { mapState } from 'vuex'

export default {
  name: 'catalogue',
  data () {
    return {
      itemName: '',
      price: '',
      penjual: '',
      stock: ''
    }
  },
  components: {
    ItemCard,
    Cart,
    navbar
  },
  methods: {
    addItem: function () {
      const fileInput = document.querySelector('#image')

      const payload = new FormData()

      payload.append('image', fileInput.files[0])
      payload.append('itemName', this.itemName)
      payload.append('price', this.price)
      payload.append('stock', this.stock)
      payload.append('penjual', this.penjual)

      this.$store.dispatch('addItem', payload)
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    let role = localStorage.getItem('role')
    let self = this

    self.role = role

    if (!role) {
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
