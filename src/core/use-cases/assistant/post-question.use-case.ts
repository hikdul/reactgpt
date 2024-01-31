import { AssistanResponse } from "../../../intenfaces"


export const postQuestionUseCase = async( threadId: string, question: string)=>
{
    try {
        const resp = await fetch(`${import.meta.env.VITE_ASSISTANT_API}/user-question`,{
            method: 'post',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({threadId,question})
        })
        
        console.log(resp)
        
        const replace = await resp.json() as AssistanResponse[]
        console.log(replace)

        return replace
        
    } catch (error) {
        console.log(error)
        throw new Error("error posting question");
        
    }
}


