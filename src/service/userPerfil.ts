import { supabase } from "@/supabase";

export function usePerfil() {
    async function PerfilInfoAdd(nameUser: string, dt_nasc: Date, nicknameUser: string, fotoUrl: string, foto: File) {
        const { data: { user }, error: UserError } = await supabase.auth.getUser();
        
        if (UserError) throw UserError;
        if (!user) throw new Error("Usuário não autenticado");

        const { data, error } = await supabase
            .from('perfil')
            .update({
                nome: nameUser,
                data_nascimento: dt_nasc,
                nickname: nicknameUser,
                foto_url: fotoUrl
            })
            .eq("id", user.id);

        if (error) {
            throw new Error("Ao procurar perfil");
        }

        await uploadImagem(fotoUrl, foto);

        return data
    }



    async function buscarPerfil() {
        const { data: { user }, error: UserError } = await supabase.auth.getUser();


        if (UserError) throw UserError;
        if (!user) throw new Error("Usuário não autenticado");

        const { data, error } = await supabase
            .from("perfil")
            .select("id, nome, data_nascimento, nickname, foto_url")
            .eq("id", user.id)
            .maybeSingle();

        if (error) throw error;

        return data;
    }

    async function carregarImagem(caminho: string) {
        const { data, error } = await supabase
            .storage
            .from("fotos-perfil")
            .createSignedUrl(caminho, 3600);

        if (error) throw error;
        return data.signedUrl;
    }

    async function uploadImagem(imageUrl: string, image: File) {
        const { data, error } = await supabase.storage.from('fotos-perfil').upload(imageUrl, image, {
            contentType: 'image/jpeg',
        })

        if (error) {
            throw error;
        }
    }



    return {
        PerfilInfoAdd,
        buscarPerfil,
        carregarImagem
    }
}