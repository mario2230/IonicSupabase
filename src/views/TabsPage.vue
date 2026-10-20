<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/Perfil">
          <ion-icon aria-hidden="true" :icon="home" />
          <ion-label>Perfil</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/login">
          <ion-icon aria-hidden="true" :icon="person" />
          <ion-label>Login</ion-label>
        </ion-tab-button>


      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { home, person } from 'ionicons/icons';
</script>
