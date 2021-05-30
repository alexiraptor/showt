<template>
  <div class="container">
    <h2 class="title">WISHLIST :</h2>
    <table>
      <thead>
        <tr>
          <th>WISHLIST :</th>
        </tr>
      </thead>

      <tbody>
        <!-- <tr>
          <td>{{ people._id }}</td>
          <td>{{ people.wishlist }}</td>
        </tr> -->
        <tr v-for="i in people" :key="i">
          <td>{{ i }}</td>
        </tr>
      </tbody>
    </table>
    <div>
      <input v-model="addtowishlist" placeholder="WISHLIST" />
      <button v-on:click="Addto" class="update">ADD</button>
    </div>
    <div>
      <input v-model="dltofwishlist" placeholder="WISHLIST" />
      <button v-on:click="Deleteto" class="update">DELETE</button>
    </div>
  </div>
</template>

<script>
import api from "../http.js";

export default {
  name: "ShowUser",
  data() {
    return {
      people: [],
      //   firstname: "",
      //   lastname: "",
      //   email: "",
      //   new_email: "",
      //   new_pwd: "",
      //   pwd: "",
      //   pwd_confirm: "",
      addtowishlist: "",
      dltofwishlist: "",
    };
  },
  async mounted() {
    // console.log(this.$route);
    // console.log(this.$route.fullPath);
    var ID = this.$route.fullPath.slice(14);
    // console.log(ID);
    // console.log("PRE MOUNT TOKEN :");
    // console.log(localStorage.getItem("authtoken"));
    var token = localStorage.getItem("authtoken");

    api
      .get("", {
        params: {
          query: `query findOne {
                            findOne(_id: "${ID}") {
                                _id
                                wishlist
                                }
                            }`,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        // console.log(response.data.data.CurrentUser);
        this.people = response.data.data.findOne;
        this.people = this.people.wishlist.split(", ");
        // console.log(this.people._id);
        // console.log(this.people.wishlist);
        // console.log(localStorage.getItem("authtoken"));
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    Addto() {
      console.log("ATTEMPT TO UPDATE WISHLIST");
      var token = localStorage.getItem("authtoken");
      var ID = this.$route.fullPath.slice(14);
      //   console.log(ID);
      //
      api
        .get("", {
          params: {
            query: `query findOne {
                            findOne(_id: "${ID}") {
                                _id
                                wishlist
                                }
                            }`,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          // console.log(response.data.data.CurrentUser);
          this.people = response.data.data.findOne;
          //   console.log(this.people.wishlist);
          var old_wishlist = this.people.wishlist;
          //   console.log(old_wishlist);
          var new_wishlist = old_wishlist + ", " + this.addtowishlist;
          //   console.log(new_wishlist);
          //   console.log(this.addtowishlist);
          //   console.log(this.addtowishlist.length);
          // console.log(localStorage.getItem("authtoken"));
          if (this.addtowishlist.length > 0) {
            api
              .post(
                "",
                {
                  query: `mutation updateInput {
                        UpdateUserInput(updateUserInput: {
                          wishlist: "${new_wishlist}"
                        }) {
                          _id
                          wishlist
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
                // console.log(response);
                this.people = response.data.data.UpdateUserInput;
                this.people = this.people.wishlist.split(", ");
                // console.log(this.people);
                // this.people.wishlist =
                //   response.data.data.UpdateUserInput.wishlist;
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            console.log("NOTHING TO ADD");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    Deleteto() {
      console.log("ATTEMPT TO UPDATE WISHLIST");
      var token = localStorage.getItem("authtoken");
      var ID = this.$route.fullPath.slice(14);
      //   console.log(ID);
      //
      api
        .get("", {
          params: {
            query: `query findOne {
                            findOne(_id: "${ID}") {
                                _id
                                wishlist
                                }
                            }`,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          // console.log(response.data.data.CurrentUser);
          this.people = response.data.data.findOne;
          //   console.log(this.people.wishlist);
          var old_wishlist = this.people.wishlist;
          //   console.log(old_wishlist);
          var strtodlt = ", " + this.dltofwishlist;
          //   console.log(strtodlt);
          var new_wishlist = old_wishlist.replace(strtodlt, "");
          //   console.log(new_wishlist);
          //   console.log(this.dltofwishlist);
          //   console.log(this.dltofwishlist.length);

          if (this.dltofwishlist.length > 0) {
            api
              .post(
                "",
                {
                  query: `mutation updateInput {
                          UpdateUserInput(updateUserInput: {
                            wishlist: "${new_wishlist}"
                          }) {
                            _id
                            wishlist
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
                this.people = this.people.wishlist.split(", ");
                console.log(this.people);
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            console.log("NOTHING TO ADD");
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
table {
  margin: auto;
  width: 15%;
}
</style>