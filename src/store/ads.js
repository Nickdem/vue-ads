export default {
    state: {
        ads: []
    },
    mutations: {
        updateAds(state, payload) {
            state.ads = payload
        }
    },
    actions: {
        async fetchAds ({commit}) {
            const res = await fetch('http://localhost:3000/ads')
            const data = await res.json()

            await commit('updateAds', data)
        },
        async createAd ({commit}, payload) {
            payload.id = Math.random()
            payload.imgSrc = `https://via.placeholder.com/1900x500/${payload.color.background}/${payload.color.text}/?text=`
            await fetch('http://localhost:3000/ads', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(payload)
            })

            await commit('updateAds', payload)
        },
        async deleteAd ({commit}, payload) {
            await fetch(`http://localhost:3000/ads/${payload}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                }
            })

            await commit('updateAds', payload)
        },
        async updateAd ({commit}, payload) {
            await fetch(`http://localhost:3000/ads/${payload.id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(payload)
            })
            
            await commit('updateAds', payload)
        }
    },
    getters: {
        ads (state) {
            return state.ads
        },
        promoAds (state) {
            return state.ads.filter(ad => {
                return ad.promo
            })
        },
        myAds (state) {
            return userId => {
                return state.ads.filter(ads => ads.uid === userId)
            }
        },
        adById (state) {
            return adId => {
                return state.ads.find(ad => ad.id === adId)
            }
        }
    }
}