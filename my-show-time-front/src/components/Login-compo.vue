<template>
  <div class="container">
    <h2 class="title">Login :</h2>

    <input v-model="email" placeholder="EMAIL" />

    <input type="password" v-model="pwd" placeholder="PASSWORD" />

    <button type="button" class="btn" id="loginbtn" v-on:click="loginUser">
      LOGIN
    </button>

    <h2>{{ errormessage }}</h2>

    <router-link to="register">Don't have an account ?</router-link>
  </div>
</template>

<script>
import api from "../http.js";
import { useToast } from "vue-toastification";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      pwd: "",
      errormessage: "",
    };
  },

  methods: {
    loginUser() {
      if (![this.email, this.pwd].every(Boolean)) {
        console.log("NULL");
        this.errormessage = "All fields are required !";
      } else {
        console.log("ATTEMPT TO LOGIN USER");

        api
          .post("", {
            query: `mutation Login { login(email: "${this.email}", password: "${this.pwd}")}`,
          })
          .then((response) => {
            if (response.data.data == null) {
              console.log("ERROR");
              this.errormessage = "Email or password doesn't match";
            } else {
              var token = response.data.data.login;
              localStorage.setItem("authtoken", token);

              // console.log(localStorage.getItem("authtoken"));

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
                  // console.log(response.data.data.CurrentUser.email);

                  if (response.data.data.CurrentUser.email == "admin") {
                    console.log("ADMIN IT IS");

                    var admintoken = response.data.data.CurrentUser.email;
                    localStorage.setItem("admintoken", admintoken);
                    const toast = useToast();
                    // console.log(localStorage.getItem("admintoken"));
                    toast(
                      "Ceci est la notif d'authentification d'un admin, que tu peux fermer en appuyant sur la croix ou en swipant comme un BG",
                      {
                        timeout: 30000,
                      }
                    );
                    this.$router.push("/admin");
                    return { toast };
                  } else {
                    const toast = useToast();
                    toast(
                      "Ceci est la notif d'authentification d'un user, que tu peux fermer en appuyant sur la croix ou en swipant comme un BG",
                      {
                        timeout: 30000,
                      }
                    );
                    // console.log(localStorage.getItem("admintoken"));
                    this.$router.push("/myspace");
                    return { toast };
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
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
  font-family: "Racing Sans One", sans-serif !important;
}
.title {
  font-size: 40px;
  font-family: "Racing Sans One", sans-serif !important;
}

button {
  font-family: "Racing Sans One", sans-serif !important;
  font-size: 15px;
}
#loginbtn {
  color: black;
  font-weight: bold;
}
a {
  color: #e611e9;
}
</style>