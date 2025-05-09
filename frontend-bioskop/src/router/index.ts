import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import ListView from '@/views/ListView.vue'
import MovieView from '@/views/MovieView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home Page'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: {
        title: 'About Page'
      }
    },
    {
      path: '/movie/:link',
      name: 'movie',
      component: MovieView,
      meta: {
        title: 'Film'
      }
    },
    {
      path: '/list',
      name: 'list',
      component: ListView,
      meta: {
        title: 'Lista'
      }
    },
    {
      path: '/cinema',
      redirect: '/home'
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/'
    }
  ],
})

router.beforeEach((to, from, next) => {
  if(to.meta) {
    document.title = `${to.meta.title} :: PSEP`
  }

  next()
})

export default router
