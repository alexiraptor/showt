<template>
  <header class="position-relative header">
    <div class="h-100 px-5 d-flex justify-content-center align-items-center">
      <!--<router-link to="/register">
                <div class="userbar">
                    buttonS'identifier    Créer un compte
                </div>
            </router-link>-->
      <router-link to="/">
        <div class="headerbar">
          <img
            :src="require('@/assets/logo-showtime.png')"
            alt="Logo Showtime"
            class="logo-large"
          />
          <!--<img :src="require('@/assets/logo-showtime.png')" alt="Logo Showtime" class="logo-mobile">-->
          <h1 class="companyname">showtime</h1>
          <!-- <form id="search">
            <input type="text" />
            <a>
              <img src="@/assets/search.png" alt="" />
            </a>
          </form> -->
        </div>
      </router-link>

      <router-link to="/cart" class="cart">
        <div class="cart-position-relative">
          <div class="header-cart-count">{{ cartArticlesNumber }}</div>
          <i class="bi bi-cart3"></i>
        </div>
      </router-link>
    </div>
  </header>
</template>

<script>
/*export default {
	name: 'Header',
    computed: {
        cartArticlesNumber() {
            return this.$store.state.cart.cartTotalItemsNumber;
        }
    },
    mounted() {
        this.$store.dispatch("getCartArticlesNumber");
    }
}
*/
</script>

<style scoped>
.userbar {
  color: #ffffff;
  margin-left: 890px;
  margin-bottom: 20px;
}

.header {
  margin-right: auto;
  margin-left: auto;
  box-sizing: border-box;
  width: 1132px;
  padding: 17px 0 0;
}

.logo-large {
  display: none;
  display: inline-block;
  width: 4rem;
  height: auto;
  vertical-align: middle;
  margin: -40px 20px 0px 0px;
}

.companyname {
  display: inline-block;
  color: #ffffff;
  font: 400 66px/66px "Racing Sans One", sans-serif;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  margin: 0px 0px 0px 0px;
}

#search {
  float: right;
  margin-top: 32px;
  margin-right: 180px;
  position: relative;
  border-radius: 5px;
  border: 1px solid #363636;
  height: 26px;
  width: 413px;
  background: #000000;
  box-shadow: none;
  outline: none;
  box-sizing: border-box;
  -webkit-appearance: none;
  text-align: left;
  animation-fill-mode: both;
  padding: 0;
  font: inherit;
}

input {
  border-radius: 5px;
  font: 400 14px/14px "Droid Sans", sans-serif;
  color: #606060;
  position: relative;
  width: 388px;
  background: #000000;
  padding: 6px 0 6px 6px;
  height: 100%;
  border: none;
  box-shadow: none;
  box-sizing: border-box;
  -webkit-appearance: none;
  outline: none;
}

.cart {
  color: #ffffff;
  transition: color 300ms ease-out;
  right: 2rem;
  float: right;
  margin-top: -45px;
}

.cart:hover {
  color: #33bdea;
}

.cart-position-relative {
  position: relative;
}

.bi-cart3 {
  font-size: 2rem;
}

.header-cart-count {
  position: absolute;
  top: -0.5rem;
  right: -0.75rem;
  height: 1.2rem;
  width: 1.2rem;
  font-size: 0.75rem;
  background-color: #e611e9;
  border-radius: 50%;
  text-align: center;
  color: #ffffff;
}
</style>