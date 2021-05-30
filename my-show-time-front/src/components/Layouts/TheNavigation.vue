<template>
<div class="block-navigation">
        <nav class="navbar navbar-expand-md p-0">
            <div class="container">

                <button class="navbar-light navbar-toggler" type="button" data-toggle="collapse" 
                data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" 
                aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse block-navigation-wrapper" id="navbarContent">
                        <ul class="navbar-nav">
                            <li class="">
                                <router-link to="/" class="block-navigation-link">Accueil</router-link>
                            </li>
                        </ul>

                        <ul class="navbar-nav list-unstyled d-flex justify-content-end py-1 m-0">
                            <template v-if="authenticated">
                                <li class="mr-5 block-navigation-message"> Bonjour {{ user.firstname }} ! </li>
                                <li class="mr-3">
                                    <router-link class="block-navigation-link" :to="{
                                        name: 'Dashboard'
                                    }">
                                    Mon compte
                                    </router-link>
                                </li>

                                <li class="">
                                    <a class="block-navigation-link" href="#" @click.prevent="signOut">
                                    Se déconnecter
                                    </a>
                                </li>
                            </template>

                            <template v-else>
                                <li class="mr-3">
                                    <router-link class="block-navigation-link" :to="{
                                        name: 'SignIn'
                                    }">
                                    Se connecter
                                    </router-link>
                                </li>
                                <li class="">
                                    <router-link class="block-navigation-link" :to="{
                                        name: 'SignUp'
                                    }">
                                    Créer votre compte
                                    </router-link>
                                </li>
                            </template>
                        </ul>

                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    computed: {
            ...mapGetters({
                authenticated: 'auth/authenticated',
                user: 'auth/user',
            })
        },

    methods: {
            ...mapActions({
                signOutAction: 'auth/signOut'
            }),

            signOut () {
                this.signOutAction().then(() => {
                    this.$router.replace({
                        name: 'Home'
                    })
                })
            }
        }
}
</script>

<style scoped>
.block-navigation {
    margin-right: auto;
    margin-left: auto;
    box-sizing: border-box;
    width: 1132px;
    padding: 5px 0 0;
}
.block-navigation-wrapper {
    margin-left: 1rem;
}
.block-navigation-link {
    font-weight: 500;
    color:rgb(255, 255, 255);
    transition: color 300ms ease-out;
}
.block-navigation-wrapper:hover {
    text-decoration: none;
    color:rgb(240, 127, 255);
}
.block-navigation-message {
    transition: all 300ms ease-out;
    color:aqua;
}
.block-navigation-message:hover {
    transform: translateX(-1rem);
    color:aquamarine;
}
</style>
