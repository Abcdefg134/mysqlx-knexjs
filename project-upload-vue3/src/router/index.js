import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index'
const routes = [
  {
    path: '/asd',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/login',
    component:()=>import('../components/Login.vue'),
    meta:{
      guest:true
    }
  },
  {
    path:'/',
    component:()=>import('../components/UploadScreen.vue'),
    meta: {
      requiresAuth: true,
    },
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next)=>{
  const token = store.getters.getToken
  
  if(to.matched.some((record)=>record.meta.requiresAuth)){
    if(!token.length){
      next({
        path:'/login',
        params:{nextUrl:to.fullPath}
      })
    } else next()
  } else if(to.matched.some((record)=>record.meta.guest)){
    if(token.length){
      next({
        path:'/',
        params:{nextUrl:to.fullPath}
      })
    } else next()
  } else next()
})

export default router
