<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Cadastro</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="container">
        <ion-card>
          <ion-card-header>
            <ion-card-title>Bem Vindo</ion-card-title>
            <ion-card-subtitle>Cadastre-se aqui</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            
            <ion-item>
              <ion-label position="stacked">Nome</ion-label>
              <ion-input
                v-model="nome"
                type="text"
                placeholder="Coloque aqui seu nome"
                :disabled="isLoading"
              ></ion-input>
            </ion-item>

             <ion-item>
              <ion-label position="stacked">Apelido</ion-label>
              <ion-input
                v-model="nickname"
                type="text"
                placeholder="Coloque aqui seu apelido"
                :disabled="isLoading"
              ></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="stacked">Foto de Perfil</ion-label>
              <input
              ref="inputFoto"
              type="file"
              accept="image/*"
            />
            </ion-item>


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
              <ion-label position="stacked">Data de nascimento</ion-label>
              <ion-input
                v-model="date_nasc"
                type="date"
                placeholder="Coloque aqui seu nascimento"
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
                @click="cadastro"
                expand="block"
                :disabled="isLoading || !email || !password || !inputFoto"
              >
                <ion-spinner v-if="isLoading" name="crescent"></ion-spinner>
                <ion-icon v-else name="log-in-outline" slot="start"></ion-icon>
                Cadastrar
              </ion-button>

              <ion-button
                @click="navigateToSignUp"
                expand="block"
                fill="outline"
                :disabled="isLoading"
              >
                <ion-icon name="person-add-outline" slot="start"></ion-icon>
                 Tem conta? loga-se
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
import { usePerfil } from "@/service/userPerfil";

const router = useRouter();
const { signUpNewUser } = useAuth();
const { PerfilInfoAdd } = usePerfil();

const nome = ref<string>('');
const nickname = ref("");

const email = ref("");
const date_nasc = ref<string>("");
const password = ref("");
const inputFoto = ref<HTMLInputElement | null>(null)
const isLoading = ref(false);
const error = ref("");

const cadastro = async () => {
  const arquivo = inputFoto.value?.files?.[0]

  if (!email.value || !password.value || !arquivo)  {
    error.value = "Preencha todos os campos";
    return;
  }

  try {
    isLoading.value = true;
    error.value = "";


    const Perfil = await signUpNewUser(email.value, password.value);
    if (!Perfil?.id) throw new Error("Não foi possível obter o ID do usuário criado.");
    const caminhoImagem =`${Perfil.id}/${crypto.randomUUID()}-${arquivo.name}`;
    await PerfilInfoAdd(nome.value, new Date(date_nasc.value), nickname.value, caminhoImagem, arquivo);
    
    nome.value = "";
    nickname.value = "";
    date_nasc.value = "";
    email.value = "";
    password.value = "";
    inputFoto.value = null;
    router.push("/tabs/Perfil");
  } catch (err) {
    error.value = err instanceof Error ? err.message : " Cadastro falhou";
  } finally {
    isLoading.value = false;
  }
};

const navigateToSignUp = () => {
  router.push("/tabs/login");
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
