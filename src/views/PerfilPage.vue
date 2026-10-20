<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-grid class="profile-page">
        <ion-row class="page-heading ion-align-items-center">
          <ion-col>
            <ion-text class="eyebrow">SUA CONTA</ion-text>
            <ion-title class="page-title">Meu perfil</ion-title>
          </ion-col>
          <ion-col size="auto">
            <ion-button class="logout-button" fill="outline" color="danger" @click="sair()" >
              <ion-icon slot="start" :icon="logOutOutline"></ion-icon>
              Sair
            </ion-button>
          </ion-col>
        </ion-row>

        <ion-card v-if="carregando" class="profile-card state-card">
          <ion-card-content class="state-content">
            <ion-spinner name="crescent"></ion-spinner>
            <ion-text>Carregando seu perfil...</ion-text>
          </ion-card-content>
        </ion-card>
        <ion-card v-else-if="erro" class="profile-card state-card error-card">
          <ion-card-content class="state-content">
            <ion-text>{{ erro }}</ion-text>
          </ion-card-content>
        </ion-card>
        <ion-card v-else-if="perfil" class="profile-card">
          <ion-card-content>
            <ion-grid class="profile-hero">
              <ion-row>
                <ion-col class="ion-text-center">
                  <ion-avatar class="avatar">
                    <ion-img v-if="fotoUrl" :src="fotoUrl" alt="Foto de perfil"></ion-img>
                    <ion-text v-else class="avatar-placeholder">
                      {{ perfil.nome?.charAt(0)?.toUpperCase() || "?" }}
                    </ion-text>
                  </ion-avatar>
                  <ion-title class="profile-name">{{ perfil.nome || "Seu nome" }}</ion-title>
                  <ion-text class="profile-nickname">@{{ perfil.nickname || "sem apelido" }}</ion-text>
                </ion-col>
              </ion-row>
            </ion-grid>

            <ion-list class="profile-details">
              <ion-item>
                <ion-label>Nome</ion-label>
                <ion-note slot="end">{{ perfil.nome || "Não informado" }}</ion-note>
              </ion-item>
              <ion-item>
                <ion-label>Apelido</ion-label>
                <ion-note slot="end">{{ perfil.nickname || "Não informado" }}</ion-note>
              </ion-item>
              <ion-item>
                <ion-label>Data de nascimento</ion-label>
                <ion-note slot="end">{{ perfil.data_nascimento || "Não informada" }}</ion-note>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonText,
  IonTitle,
  IonButton,
  IonIcon,
  IonSpinner,
  IonAvatar,
  IonImg,
  IonList,
  IonItem,
  IonLabel,
  IonNote,
} from '@ionic/vue';
import { logOutOutline } from 'ionicons/icons';
import { usePerfil } from '@/service/userPerfil';
import { useAuth } from '@/service/userAuth';
import { ref } from 'vue';
import { onIonViewWillEnter } from '@ionic/vue';
import router from '@/router';
const { buscarPerfil } = usePerfil();
const { carregarImagem } = usePerfil();

const { deslogarUser } = useAuth();
const perfil = ref<{
  nome: string | null;
  nickname: string | null;
  data_nascimento: string | null;
  foto_url: string | null;
} | null>(null);

const fotoUrl = ref<string | null>("");


const carregando = ref(true);
const erro = ref("");

async function sair() {
  try {
    await deslogarUser();
    await router.replace("/tabs/login");
  } catch (err) {
    erro.value = err instanceof Error ? err.message : "Não foi possível deslogar.";
  }
}


onIonViewWillEnter(async () => {
  try {
    perfil.value = await buscarPerfil();
    fotoUrl.value = perfil.value?.foto_url ? await carregarImagem(perfil.value.foto_url): null;
  } catch (err) {
    erro.value = err instanceof Error ? err.message : "Não foi possível carregar o perfil.";
  } finally {
    carregando.value = false;
  }
});
</script>
