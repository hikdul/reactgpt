import { GeneratedImage, imageVariationPropsUseCase } from "../../intenfaces"

export const imageVariationUseCase = async ({ originalImage}:imageVariationPropsUseCase):
Promise<GeneratedImage> =>
{
    try {
        
        const resp = await fetch(`${import.meta.env.VITE_GPT_API}/image-generation-variation`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ baseImage:originalImage})
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