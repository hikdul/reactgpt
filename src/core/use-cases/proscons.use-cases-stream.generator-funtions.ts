
export async function* ProsConsStreamUseCaseG(prompt: string, abortSignal:  AbortSignal) : AsyncGenerator<string, null | undefined, unknown>
{
    
    try {
        
        const resp = await fetch(`${import.meta.env.VITE_GPT_API}/pros-cons-discuser-stream`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({prompt}),
            // !: mandar el abort signal 
            signal: abortSignal
        })
        
        if(!resp.ok) throw new Error("algo salio mal en la peticion");
        
        const reader = resp.body!.getReader()
        
        if(!reader)
        {
            console.log('no se genero el reader')
            return null
        }
        
        
        const decoder = new TextDecoder()
        
        let text = ''
        
        while(true)
        {
            const {value, done} = await reader.read()
            
            if(done)
                break;
            
            const decodeChunk = decoder.decode(value, {stream: true})
            text += decodeChunk
            yield text
        }
        
    } catch (error) {
        return  null
    }
}