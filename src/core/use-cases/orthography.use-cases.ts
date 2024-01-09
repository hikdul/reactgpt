import type { OrthographyResponse, OrthographyResponseData } from "../../intenfaces";

export const orthographyUseCase = async (prompt: string): Promise<OrthographyResponseData> =>
{
    
    try {
        
        const resp = await fetch(`${import.meta.env.VITE_GPT_API}/orthography-check`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({prompt})
        })
        
        if(!resp.ok) throw new Error("algo salio mal en la peticion");
        
        const data = await resp.json() as OrthographyResponse
        
        return {
            ok: true,
            ...data
        }
        
    } catch (error) {
        return {
            ok: false,
            userScore: 0,
            errors:[],
            message: 'no se puede realisar la correccion'
        }
    }
}