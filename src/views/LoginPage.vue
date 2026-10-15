<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Logar</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="container">
        <ion-card>
          <ion-card-header>
            <ion-card-title>Bem Vindo</ion-card-title>
            <ion-card-subtitle>Logar aqui</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <ion-item>
              <ion-label position="stacked">Email</ion-label>
              <ion-input
                v-model="email"
                type="email"
                placeholder="Coloque aqui seu email"
                :disabled="isLoading"
              ></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Password</ion-label>
              <ion-input
                v-model="password"
                type="password"
                placeholder="Coloque aqui seu password"
                :disabled="isLoading"
              ></ion-input>
            </ion-item>

            <div class="ion-padding">
              <ion-button
                @click="logar"
                expand="block"
                :disabled="isLoading || !email || !password"
              >
                <ion-spinner v-if="isLoading" name="crescent"></ion-spinner>
                <ion-icon v-else name="log-in-outline" slot="start"></ion-icon>
                Logar
              </ion-button>

              <ion-button
                @click="navigateToSignUp"
                expand="block"
                fill="outline"
                :disabled="isLoading"
              >
                <ion-icon name="person-add-outline" slot="start"></ion-icon>
                Não tem conta? Cadastra-se
              </ion-button>
            </div>

            <ion-item v-if="error" color="danger">
              <ion-icon name="warning" slot="start"></ion-icon>
              <ion-label> error</ion-label>
            </ion-item>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>


<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonSpinner,
} from "@ionic/vue";
import { useAuth } from "../service/userAuth";

const router = useRouter();
const { signInWithEmail } = useAuth();

const email = ref("");
const password = ref("");
const isLoading = ref(false);
const error = ref("");


const logar = async () => {
  if (!email.value || !password.value) {
    error.value = "Preencha todos os campos";
    return;
  }

  try {
    isLoading.value = true;
    error.value = "";

    await signInWithEmail(email.value, password.value);

    email.value = "";
    password.value = "";
    router.push("/tabs/Perfil");
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Login falhou";
  } finally {
    isLoading.value = false;
  }
};

const navigateToSignUp = () => {
  router.push("/tabs/Cadastro");
};
</script>

<style scoped>
.container {
  padding: 16px;
  max-width: 400px;
  margin: 0 auto;
}

ion-item {
  --padding-start: 0;
  --inner-padding-end: 0;
}

ion-button {
  margin: 8px 0;
}
</style>
