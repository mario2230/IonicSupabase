import { supabase } from "@/supabase";
import { IonToast } from "@ionic/vue";

async function signUpNewUser(email: string, senha: string) {
    const { data, error } = await supabase.auth.signUp({email: email, password: senha});

    if(error) {
        throw error;
    }

    return data.user
}


async function signInWithEmail(email: string, senha: string) {
    const {data, error} = await supabase.auth.signInWithPassword({
        email: email, password: senha
    })

    if(error) {
        throw error;
    }

    return data.user
}



async function atualizarPerfil(senhaAtual: string, senhaNova: string) {
    const { data: {user}, error} = await supabase.auth.getUser()

    if (error) {
  throw error;
}

const emailAtual = user.email;
}