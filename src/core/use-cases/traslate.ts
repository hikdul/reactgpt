import type {  TranslateResponse } from "../../intenfaces";

export const translateUseCase = async (prompt: string, lang: string): Promise<TranslateResponse> =>
{
    
    try {
        
        const resp = await fetch(`${import.meta.env.VITE_GPT_API}/translate`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({prompt, lang})
        })
        if(!resp.ok) throw new Error("algo salio mal en la peticion");
        
        const data = await resp.json() as TranslateResponse
        data.ok = true
        
        return data 
        
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'no se puede realisar la correccion'
        }
    }
}