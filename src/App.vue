<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { supabase } from './supabase';
import router from './router';
import { onMounted } from 'vue';

async function syncAuthRedirect() {
    const { data } = await supabase.auth.getClaims();
    const claims = data?.claims;
    const path = router.currentRoute.value.path;

    if( claims && path === '/'){
      router.replace('/login');
    } else if (!claims && path === '/login') {
       router.replace('/');
    }
}

const {
  data: { subscription },
} = supabase.auth.onAuthStateChange(() => {
  syncAuthRedirect();
});

onMounted(() => {
  subscription.unsubscribe();
});

</script>
