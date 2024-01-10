import { textToAudioResponse } from "../../intenfaces/text-to-audio.response";

export const textToAudioUseCase = async (prompt: string, voice: string): Promise<textToAudioResponse> =>
{
    
    try {
        
        const resp = await fetch(`${import.meta.env.VITE_GPT_API}/text-to-audio`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({prompt, voice})
        })
        
        if(!resp.ok) throw new Error("algo salio mal en la peticion, no se genero el audio :(");
        
        const data = await resp.blob()
        const UrlFile = URL.createObjectURL(data)
        
        return {
            ok: true,
            message: prompt,
            UrlFile
        }
        
    } catch (error) {
        return {
            ok: false,
            message: prompt,
        }
    }
}