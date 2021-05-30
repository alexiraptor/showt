import axios from "axios";
// var token = localStorage.getItem("authtoken")

export default axios.create({
    baseURL: "http://localhost:3000/graphql",
    // headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": `Bearer ${token}`
    // }
})
