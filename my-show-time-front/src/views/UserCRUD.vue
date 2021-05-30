<template>
  <div class="adminbtn">
    <button
      type="button"
      class="btn"
      id="CRUDconcert"
      v-on:click="gotoCRUDconcert"
    >
      CRUD CONCERTS
    </button>
    <button type="button" class="btn" id="CRUDadmin" v-on:click="gotoCRUDadmin">
      CRUD USERS
    </button>
  </div>
  <div class="Users">
    <Users />
  </div>
  <div class="container">
    <button class="modalbtn" @click="$refs.modalName.openModal()">
      DELETE YOUR ACCOUNT
    </button>
  </div>
  <modal ref="modalName">
    <template v-slot:header>
      <div class="usure">Are you sure you want to delete your account ?</div>
    </template>

    <template v-slot:body></template>

    <template v-slot:footer>
      <div class="container">
        <button class="deletebtn" @click="$refs.modalName.DeleteUser()">
          DELETE
        </button>
      </div>
    </template>
  </modal>
</template>

<script>
import Users from "../components/Users.vue";
import Modal from "../components/Modal";

export default {
  components: { Users, Modal },

  async mounted() {
    if (localStorage.getItem("authtoken") != null) {
      console.log("LOGGED");
      var A = document.getElementById("CRUDconcert");
      var B = document.getElementById("CRUDadmin");
      // console.log(A + B);
      if (localStorage.getItem("admintoken")) {
        // A.style.display = "block";
        // B.style.display = "block";
      } else {
        A.style.display = "none";
        B.style.display = "none";
      }
    } else {
      console.log("NOT LOGGED");
      this.$router.push("/login");
    }
  },

  methods: {
    gotoCRUDconcert() {
      this.$router.push(`/crudconcert`);
    },
    gotoCRUDadmin() {
      this.$router.push(`/admin`);
    },
  },
};
</script>

<style scoped>
.container {
  font-family: "Racing Sans One", sans-serif !important;
  color: #ffffff;
  text-align: center;
}
.usure {
  color: black;
  font-size: 20px;
  text-align: center;
  font-family: "Racing Sans One", sans-serif !important;
  letter-spacing: 2px;
}
.overflow-hidden {
  overflow: hidden;
}

.deletebtn {
  background-color: #dc3545;
  font-weight: bold;
}
button {
  font-family: "Racing Sans One", sans-serif !important;
  font-size: 15px;
}

.modalbtn {
  margin-top: 20px;
}

.adminbtn {
  text-align: center;
  margin-top: 15px;
}
</style>