<template>
  <div class="col-md-4 allcard">
    <p class="card-date">{{ concert.date }}</p>
    <div class="my-2">
      <div class="product-container">
        <div class="card product-card">
          <img
            src="https://pyxis.nymag.com/v1/imgs/280/a09/831956806c59629838ae46bd3e08255aaa-12-concerts.rsquare.w1200.jpg"
            class="card-img-top"
            alt=""
          />

          <div class="card-body">
            <h4 class="card-title">{{ concert.artiste }}</h4>
            <br />
            <h3>Genre : {{ concert.genre }}</h3>
            <h3>Title : {{ concert.title }}</h3>
            <br /><br />
            <div class="btn">
              <p class="card-text">{{ concert.price }}</p>
              <div class="btn-cart">
                <button
                  @click="toggleModale"
                  type="submit"
                  class="btn btn-secondary"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Ajouter au panier"
                >
                  Add to cart
                </button>
                <ProductModale
                  @add-to-cart="addToCart"
                  @toggleModale="toggleModale"
                  v-bind:revele="revele"
                  v-bind:concert="concert"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductModale from "./ProductModale.vue";
import axios from "axios";
export default {
  name: "Concert",
  props: {
    concert: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      token: null,
      isAddedToWishlist: false,
      wishlistString: "Add to wishlist",
      revele: false,
    };
  },
  components: {
    ProductModale,
  },
  methods: {
    toggleModale: function (ConcertId = null) {
      if (ConcertId === null) {
        return;
      } else {
        this.revele = !this.revele;
      }
    },
    addToWishList(productId) {
      console.log(this.isAddedToWishlist);
      axios
        .post(
          "http://remotedevs.org:8080/api/wishlist/add?token=" + this.token,
          {
            id: productId,
          }
        )
        .then(
          (response) => {
            console.log(response);
            if (response.status == 201) {
              this.isAddedToWishlist = true;
              console.log(this.isAddedToWishlist);
              this.wishlistString = "Added to WishList";
            }
          },
          (error) => {
            console.log(error);
          }
        );
    },
  },
  mounted() {
    this.token = localStorage.getItem("token");
  },
};
</script>

<style scoped>
.allcard {
  width: 1132px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 50px;
  box-sizing: border-box;
}
.my-2 {
  width: 300px;
  height: 450px;
  background-color: #36094b;
}
.product-container {
  padding: 15px 10px;
}
.product-card {
  text-align: center;
  display: block;
  overflow: hidden;
  position: relative;
  transition: all 0.5s;
}
img {
  overflow: hidden;
  position: relative;
}

.card-img-top {
  height: 250px;
  max-height: 250px;
  object-fit: contain;
}
.card-body {
  margin: 0 12px 15px;
  padding: 8px 0 0;
  text-align: center;
}
h4 {
  margin: 0;
  margin-bottom: 8px;
  font-weight: 600;
  line-height: 1.1;
  color: rgb(255, 255, 255);
  font: 400 20px/20px "Racing Sans One", sans-serif;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  margin: 0px 0px 0px 0px;
  overflow: hidden;
  white-space: nowrap;
}
h3 {
  color: #ffffff;
  font-size: 15px;
  text-align: left;
}

.btn {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
.card-text {
  margin: 0;
  margin-bottom: 8px;
  font-weight: 600;
  line-height: 1.1;
  color: rgb(255, 255, 255);
  font: 400 25px/25px "Racing Sans One", sans-serif;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  margin: 0px 0px 0px 0px;
  overflow: hidden;
  white-space: nowrap;
  text-align: left;
}

.card-date {
  position: absolute;
  color: rgb(255, 255, 255);
  font: 400 25px/25px "Racing Sans One", sans-serif;
  text-transform: uppercase;
  z-index: 10;
  background-color: #e611e9;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
}

@import url(//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css);
* {
  margin: 0;
  padding: 0;
  border: 0;
}

button {
  background-color: #33bdea;
  border: none;
  color: white;
  padding: 5px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  transition-duration: 0.4s;
}

button:hover {
  background-color: #04759b;
}
</style>