<template>
    <v-container fluid>
        
        <h1>Create New Ad</h1>
        <v-card class="mx-auto mt-5" max-width="400">
            <v-card-text>
                <h2>New Ad form</h2>
                <v-form ref="form" v-model="valid" validation>

                    <v-text-field
                        v-model="title"
                        label="Title"
                        required
                        type="text"
                        :rules="[v => !!v || 'Title is required!']"
                    ></v-text-field>

                    <v-textarea
                        v-model="desc"
                        class="mx-2"
                        rows="2"
                        label="Ad description"
                        required
                        :rules="[v => !!v || 'Description is required!']"
                        type="text"
                    ></v-textarea>

                    <v-switch  v-model="promo" label="Add to promo?"></v-switch>

                    <v-select :items="items" label="Background" v-model="backgroundColor"></v-select>
                    
                    <v-select :items="items" label="Text" v-model="textColor"></v-select>

                    <v-btn color="success" @click="createAd" :disabled="!valid">
                        Create ad
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
                title: '',
                desc: '',
                backgroundColor: 'black',
                textColor: 'yellow',
                promo: false,
                valid: false,
                items: ['red', 'yellow', 'black']
            }
        },
        computed: {
            user () {
                return this.$store.getters.user
            }
        },
        methods: {
            createAd () {
                if (this.$refs.form.validate()) {
                    const ad = {
                        title: this.title,
                        desc: this.desc,
                        color: {
                            text: this.textColor,
                            background: this.backgroundColor
                        },
                        promo: this.promo,
                        uid: this.user.id
                    }
                    this.colorsUpdate(ad)
                    this.$store.dispatch('createAd', ad)
                    this.title = this.desc = ''
                    this.promo = false
                    this.$router.push('/')
                }
            },
            colorsUpdate(ad) {
                ad.color.background = ad.color.background === 'black' ? '000000' : ad.color.background
                ad.color.background = ad.color.background === 'yellow' ? 'FFFF00' : ad.color.background
                ad.color.background = ad.color.background === 'red' ? 'FF0000' : ad.color.background
                ad.color.text = ad.color.text === 'black' ? '000000' : ad.color.text
                ad.color.text = ad.color.text === 'yellow' ? 'FFFF00' : ad.color.text
                ad.color.text = ad.color.text === 'red' ? 'FF0000' : ad.color.text
            }
        }
    }
</script>