import { supabase } from "@/supabase";

export async function signUpNewUser(email: string, senha: string) {
    const { data, error } = await supabase.auth.signUp({email: email, password: senha});

    if(error) {
        throw error;
    }

    return data.user
}


export async function signInWithEmail(email: string, senha: string) {
    const {data, error} = await supabase.auth.signInWithPassword({
        email: email, password: senha
    })

    if(error) {
        throw error;
    }

    return data.user
}



export async function atualizarSenha(senhaAtual: string, senhaNova: string) {
    const { data: {user}, error: UserError} = await supabase.auth.getUser()
    if(UserError) {
        throw UserError;
    }

    if(!user?.email) {
        throw new Error("Erro email faltando.");
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user?.email,
        password: senhaAtual,
    });

    if(signInError) {
        throw new Error("Erro ao validar.");
    }

    const {data, error} = await supabase.auth.updateUser({
        password: senhaNova
    });

    if(error) {
        throw new Error("Erro ao atualizar sua senha.");
    }

    return data.user

}



