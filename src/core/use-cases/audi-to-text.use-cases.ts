
import type { AudioToTextResponse } from "../../intenfaces";

export const audioToTextUseCase = async (audio: File, prompt: string): Promise<AudioToTextResponse> =>
{
    
    try {
        // ! se envia todo mediante un formData. y asi nos evitamos un buen de problemas 
        const formData = new FormData()
        formData.append('audio',audio)
        if(prompt)
            formData.append('prompt',prompt)
        
         const resp = await fetch(`${import.meta.env.VITE_GPT_API}/audio-to-text`,{
             method: 'POST',
             body: formData
         })
         
         if(!resp.ok) throw new Error("algo salio mal en la peticion");
         
         const data = await resp.json() as AudioToTextResponse
         data.ok = true
         
         return {
             ...data
         }
        
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            task:     '',
            language: '',
            duration: 0,
            text:     '',
            segments: []
        }
    }
}