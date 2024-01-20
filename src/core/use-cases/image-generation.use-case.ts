import { GeneratedImage, imagePropsUseCase } from "../../intenfaces"

export const imageGenerationUseCase = async ({prompt, originalImage, maskImage}:imagePropsUseCase):
Promise<GeneratedImage> =>
{
    try {
        
        const resp = await fetch(`${import.meta.env.VITE_GPT_API}/image-generation`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({prompt, originalImage, maskImage})
        })
        
        let {url, revised_prompt:alt} = await resp.json()
        if(!alt)
         alt= prompt
        //console.log({url, alt})
        return{url, alt}
        
    } catch (error) {
        console.log({error})
        return null
    }
    
}