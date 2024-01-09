import { ProsConsResponse } from "../../intenfaces";

export const ProsConsStreamUseCase = async (prompt: string): Promise<ReadableStreamDefaultReader<Uint8Array> | null>=>
{
    
    try {
        
        const resp = await fetch(`${import.meta.env.VITE_GPT_API}/pros-cons-discuser-stream`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({prompt})
            // TODO: mandar el abort signal

        })
        
        if(!resp.ok) throw new Error("algo salio mal en la peticion");
        
        const reader = resp.body!.getReader()
        
        if(!reader)
        {
            console.log('no se genero el reader')
            return null
        }
        
        return reader
        
        // note: esto se deberia de hacer en otro lugar
        // * creamos un decodificador
       // const decoder = new TextDecoder()
       // 
       // let text = ''
       // 
       // while(true)
       // {
       //     const {value, done} = await reader.read()
       //     
       //     if(done)
       //         break;
       //     
       //     const decodeChunk = decoder.decode(value, {stream: true})
       //     text += decodeChunk
       //     console.log(text)
       // }

        // note: otro tipo de respuesta
        //const data = await resp.json() as ProsConsResponse
        //data.ok = true
        
    } catch (error) {
        return  null
    }
}