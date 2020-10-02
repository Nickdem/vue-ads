<template>
    <div v-if="!loading">
        <v-container fluid>
            <v-carousel>
                <v-carousel-item v-for="ad in promoAds" :key="ad.id" :src="ad.imgSrc + ad.title">
                    <div class="car-link">
                        <v-btn class="error" :to="'/ad/' + ad.id">{{ad.title}}</v-btn>
                    </div>
                </v-carousel-item>
            </v-carousel>
        </v-container>
        <v-container class="d-flex flex-wrap justify-space-around">
        
            <v-card
                max-width="400"
                v-for="ad of ads"
                :key="+ad.id"
                class="mb-6"
            >
                <v-img :src="ad.imgSrc + ad.title" height="200px"></v-img>

                <v-card-title>{{ad.title}}</v-card-title>

                <v-card-subtitle>{{ad.desc}} </v-card-subtitle>

                <v-card-actions>
                    <v-btn text :to="'/ad/' + ad.id">Open</v-btn>
                </v-card-actions>
            </v-card>
            
        </v-container>
    </div>
</template>

<script>
    export default {
        data: () => ({loading: true}),
        computed: {
            promoAds () {
                return this.$store.getters.promoAds
            },
            ads () {
                return this.$store.getters.ads
            }
        },
        async mounted() {
            await this.$store.dispatch('fetchAds')
            this.loading = false
        }
    }
</script>

<style scoped>
    .car-link {
        position: absolute;
        bottom: 50px;
        left: 50%;
        background: rgba(0,0,0,.5);
        transform: translate(-50%, 0);
        padding: 10px 10px;
        border-radius: 15px;
    }
</style>