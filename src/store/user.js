export default {
    state: {
        user: null
    },
    mutations: {
        setUser (state, payload) {
            state.user = payload
        }
    },
    actions: {
        async registerUser ({commit}, payload) {
            payload.id = Math.random() + Date.now()
            await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(payload)
            })
            await commit('setUser', payload)
        },
        async loginUser ({commit}, payload) {
            const data = await fetch('http://localhost:3000/users')
            const users = await data.json()
            const user = await users.find(user => ((user.email === payload.email) && (user.password === payload.password)))
            if (user) {
                await commit('setUser', user)
            } else {
                console.log('Err')
            }
        }
    },
    getters: {
        user (state) {
            return state.user
        },
        isLogin (state) {
            return state.user !== null
        }
    }
}