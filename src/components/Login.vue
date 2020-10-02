<template>
    <v-container fluid>
        <h1 v-if="warning" style="text-align: center;">Please log in to access this page.</h1>
        <v-card class="mx-auto mt-5" max-width="400">
            <v-card-text>
                <h2>Login form</h2>
                <v-form ref="form" v-model="valid" validation>

                    <v-text-field
                        v-model="email"
                        label="E-mail"
                        required
                        type="email"
                        :rules="emailRules"
                    ></v-text-field>

                    <v-text-field
                        v-model="password"
                        label="Password"
                        required
                        :rules="passwordRules"
                        type="password"
                        :counter="6"
                    ></v-text-field>

                    <v-btn
                        color="success"
                        class="mr-4"
                        @click="onSub"
                        :disabled="!valid"
                    >
                        Login
                    </v-btn>

                </v-form>
            </v-card-text>
            </v-card>
    </v-container>
</template>

<script>
    export default {
        data () {
            return {
                email: '',
                password: '',
                valid: false,
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ],
                passwordRules: [
                    v => !!v || 'Password is required',
                    v => (v && v.length >= 6) || 'Password must be equal or more 6 characters'
                ],
                warning: false
            }
        },
        methods: {
            async onSub () {
                if (this.$refs.form.validate()) {
                    const user = {
                        email: this.email,
                        password: this.password
                    }
                    await this.$store.dispatch('loginUser', user)
                    this.$router.push('/')
                }
            }
        },
        created () {
            if (this.$route.query['loginError']) {         
                this.warning = true
            }
        }
    }
    
</script>