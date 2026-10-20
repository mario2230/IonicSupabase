import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import { supabase } from '@/supabase.js';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/login'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/login'
      },
      {
        path: 'login',
        component: () => import('@/views/LoginPage.vue')
      },
      {
        path: 'RecPass',
        component: () => import('@/views/RecPassPage.vue')
      },
      {
        path: 'Perfil',
        component: () => import('@/views/PerfilPage.vue'),
        meta: { autenticado: true }
      },
      {
        path: 'Cadastro',
        component: () => import('@/views/CadastroPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})


router.beforeEach(async (to) => {

  if(!to.meta.autenticado) return true;

  const { data: { user }, error } = await supabase.auth.getUser();
  

  if(error || !user ) {
    return {
      path: "/tabs/login",
      query: { redirect: to.fullPath }
    };
  }

  return true;
})
export default router
