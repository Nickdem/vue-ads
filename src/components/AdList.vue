<template>
    <v-container class="d-flex flex-wrap justify-space-between">
         
        <v-card
            max-width="500"
            v-for="ad of myAds"
            :key="+ad.id"
            class="mb-6"
        >
            <v-img :src="ad.imgSrc + ad.title" height="300px"></v-img>

            <v-card-title>{{ad.title}}</v-card-title>

            <v-card-subtitle>{{ad.desc}}</v-card-subtitle>

            <v-card-actions>
                <v-btn class="primary" :to="'/ad/' + +ad.id">Open</v-btn>
            </v-card-actions>
        </v-card>
        
    </v-container>
</template>

<script>
    export default {
        data: () => ({
            myAds: null
        }),
        async mounted () {
            const user = await this.$store.getters.user
            const id = await user.id
            this.myAds = await this.$store.getters.myAds(id)
        }
    }
</script>