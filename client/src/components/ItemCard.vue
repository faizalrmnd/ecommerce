<template>
  <div class="cards">
    <div class="card" v-for="(item, index) in itemList" v-bind:key='index' style="width: 18rem;">
      <img class="card-img-top" :src="item.image" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">{{ item.itemName }}</h5>
        <p class="card-text">{{ item.price }}</p>
        <p class="card-text">{{ item.penjual }}</p>
        <a href="#" @click="addToCart(item.itemName, item.price, item.penjual)" class="btn btn-primary">Add to Cart</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ItemCard',
  data () {
    return {
      itemName: '',
      price: '',
      penjual: ''
    }
  },
  methods: {
    addToCart: function (itemNameCart, priceCart, penjualCart) {
      let payload = {
        itemName: itemNameCart,
        price: priceCart,
        penjual: penjualCart,
        total: 1
      }

      this.$store.dispatch('addToCart', payload)
    }
  },
  computed: {
    ...mapState(['itemList'])
  },
  created: function () {
    this.$store.dispatch('getItem')
  }
}
</script>

<style scoped>
  .cards {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .card {
    margin: 5px;
  }
</style>
