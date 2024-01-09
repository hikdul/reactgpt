import { ProsConsResponse } from "../../intenfaces";

export const ProsConsUseCase = async (prompt: string): Promise<ProsConsResponse> =>
{
    
    try {
        
        const resp = await fetch(`${import.meta.env.VITE_GPT_API}/pros-cons-discuser`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({prompt})
        })
        
        if(!resp.ok) throw new Error("algo salio mal en la peticion");
        
        const data = await resp.json() as ProsConsResponse
        data.ok = true
        
        return data
        
    } catch (error) {
        return {
            ok: false,
        }
    }
}