import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Ad from '../components/Ad'
import AdList from '../components/AdList'
import NewAd from '../components/NewAd'
import Login from '../components/Login'
import Registration from '../components/Registration'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
    routes: [
        {path: '', name: 'home', component: Home, beforeEnter: AuthGuard},
        {path: '/ad/:id', props: true, name: 'ad', component: Ad, beforeEnter: AuthGuard},
        {path: '/list', name: 'list', component: AdList, beforeEnter: AuthGuard},
        {path: '/new', name: 'new', component: NewAd, beforeEnter: AuthGuard},
        {path: '/login', name: 'login', component: Login},
        {path: '/registration', name: 'reg', component: Registration}
    ],
    mode: 'history'
})