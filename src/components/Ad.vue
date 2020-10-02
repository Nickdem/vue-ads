<template>
    <v-container fluid>
        <h1>Ad page</h1>
        <p v-if="!ad">Ad with id: '{{id}}' undefined </p>
        <v-card v-else-if="!loading">

            <v-img :src="ad.imgSrc + ad.title" height="500"></v-img>

            <v-card-title>{{ad.title}}</v-card-title>

            <v-card-subtitle>{{ad.desc}}</v-card-subtitle>

            <v-card-actions v-if="user.id === ad.uid">
                <v-btn class="error" @click="deleteAd">Delete</v-btn>
                <v-btn class="warning" @click="updateToggle">Edit</v-btn>
            </v-card-actions>

        </v-card>
        <v-card v-if="toggle" class="mx-auto mt-5" max-width="400">
            <v-card-text>
                <h2>Edit Ad form</h2>
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

                <v-switch v-model="promo" label="Add to promo?"></v-switch>
                
                <v-btn color="success" @click="updateAd" :disabled="!valid">
                    Update ad
                </v-btn>
                
            </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        props: ['id'],
        data () {
            return {
                ad: null,
                loading: true,
                toggle: false,
                valid: false,
                title: '',
                desc: '',
                promo: false
            }
        },
        computed: {
            user () {
                return this.$store.getters.user
            }
        },
        async mounted () {
            const id = +this.id
            this.ad = await this.$store.getters.adById(id)
            if (!this.ad) {
                this.ad = null
            } else {
                this.title = this.ad.title
                this.desc = this.ad.desc
                this.promo = this.ad.promo
                this.loading = false
            }
            
        },
        methods: {
            async deleteAd () {
                this.$store.dispatch('deleteAd', this.id)
                this.$router.push('/')
            },
            updateToggle () {
                this.toggle = !this.toggle
            },
            async updateAd () {
                if (this.$refs.form.validate()) {
                    const ad = {
                        ...this.ad,
                        title: this.title,
                        desc: this.desc,
                        promo: this.promo
                    }
                    await this.$store.dispatch('updateAd', ad)
                    this.title = this.desc = ''
                    this.promo = false
                    this.toggle = false
                    this.$router.push('/')
                }
            }
        }
    }
</script>