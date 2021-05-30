<template>
  <div class="container">
    <h2 class="title">Personal space :</h2>
    <div>
      <input v-model="new_email" placeholder="NEW EMAIL" />

      <button type="button" class="btn" id="update" v-on:click="updateEmail">
        UPDATE EMAIL
      </button>
    </div>
    <div>
      <input type="password" v-model="pwd" placeholder="OLD PASSWORD" />

      <input type="password" v-model="new_pwd" placeholder="NEW PASSWORD" />

      <button type="button" class="btn" id="update" v-on:click="updatePwd">
        UPDATE PASSWORD
      </button>
    </div>
    <div>
      <input v-model="new_fname" placeholder="FIRSTNAME" />

      <input v-model="new_lname" placeholder="LASTNAME" />

      <button type="button" class="btn" id="update" v-on:click="UpdateUser">
        UPDATE
      </button>
    </div>
    <ul>
      <li>EMAIL : {{ people.email }}</li>

      <li>FIRSTNAME : {{ people.firstName }}</li>

      <li>LASTNAME : {{ people.lastName }}</li>

      <li>WISHLIST : {{ people.wishlist }}</li>
    </ul>
    <div>
      <button type="button" class="btn" id="logout" v-on:click="logout">
        LOG OUT
      </button>
      <button @click="seewishlist(people._id)" class="wishlist">
        SHOW WISHLIST
      </button>
      <qrcode-vue :value="value" :size="size" level="H" />
    </div>
  </div>
</template>

<script>
import api from "../http.js";
import QrcodeVue from "qrcode.vue";

export default {
  name: "Users",
  data() {
    return {
      people: [],
      firstname: "",
      lastname: "",
      email: "",
      new_email: "",
      new_pwd: "",
      pwd: "",
      pwd_confirm: "",
      new_fname: "",
      new_lname: "",
      value: "",
      size: 200,
    };
  },
  components: {
    QrcodeVue,
  },
  async mounted() {
    console.log("ATTEMPT TO LOAD CURRENT USER");
    // console.log("PRE MOUNT TOKEN :");
    // console.log(localStorage.getItem("authtoken"));
    var token = localStorage.getItem("authtoken");

    api
      .get("", {
        params: {
          query: `query CurrentUser { CurrentUser { _id, firstName, lastName, email, wishlist } }`,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        // console.log(response.data.data.CurrentUser);
        this.people = response.data.data.CurrentUser;
        this.value = `https://localhost:8080/wishlist?_id=${this.people._id}.com`;
        return this.value;
        // console.log("POST MOUNT TOKEN :");
        // console.log(localStorage.getItem("authtoken"));
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    UpdateUser() {
      console.log("ATTEMPT TO DELETE USER");
      var token = localStorage.getItem("authtoken");
      api
        .post(
          "",
          {
            query: `mutation updateInput {
                      UpdateUserInput(updateUserInput: {
                        firstName: "${this.new_fname}"
                        lastName: "${this.new_lname}"
                      }) {
                        _id
                        email
                        firstName
                        lastName
                        password
                        createdAt
                        roles
                      }
                    }`,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.people = response.data.data.UpdateUserInput;
          console.log(this.people);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    updateEmail() {
      console.log(this.new_email);
      var token = localStorage.getItem("authtoken");
      api
        .post(
          "",
          {
            query: `mutation updateInput { UpdateUserInput(updateUserInput: { email: "${this.new_email}" }) { firstName, email }}`,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.people.email = this.new_email;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    updatePwd() {
      console.log(this.new_pwd);
      var token = localStorage.getItem("authtoken");
      api
        .post(
          "",
          {
            query: `mutation UpdatePass { UpdateUserPass(currPass: "${this.pwd}", newPass: "${this.new_pwd}") { firstName password }}`,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    logout() {
      localStorage.removeItem("authtoken");
      localStorage.removeItem("admintoken");
      this.$router.push("/login");
    },
    seewishlist(_id) {
      console.log(`/wishlist?_id=${_id}`);
      this.$router.push(`/wishlist?_id=${_id}`);
    },
  },
};
</script>

<style scoped>
.container {
  color: #ffffff;
  text-align: center;
  font-family: "Racing Sans One", sans-serif !important;
}

input {
  font-size: 15px;
  color: black;
  width: 15%;
  text-align: center;
  padding: 12px 20px;
  margin: 20px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-family: "Racing Sans One", sans-serif !important;
}
input::placeholder {
  color: black;
  font-weight: bold;
}
.title {
  font-size: 40px;
  font-family: "Racing Sans One", sans-serif !important;
}
#createbtn {
  color: black;
  font-weight: bold;
}
a {
  color: #e611e9;
}
button {
  font-family: "Racing Sans One", sans-serif !important;
  font-size: 15px;
}
</style>