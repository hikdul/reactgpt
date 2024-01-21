
import { useState } from "react"
import { imageMessageProps } from "../../../intenfaces"
import { GptMessage, GptMessageImage,  TextMessageBox, TypingLoader } from "../../components"
import { imageGenerationUseCase, imageVariationUseCase } from "../../../core/use-cases"


export const ImageTunningPage = () => {
  
  const [isLoading, setIsLoading] = useState<boolean>(false) 
  const [messages, setMessages] = useState<imageMessageProps[]>([])
  const [originalImageAndMask, setOriginalImageAndMask] = useState({
  original:'http://localhost:3000/gpt/image-generation/1705838814279' as string | undefined,
  mask: undefined as string | undefined
})


  const hanleVariation = async() =>{
    setIsLoading(true)
    const resp = await imageVariationUseCase({originalImage:originalImageAndMask.original!})
    setIsLoading(false)
    if(!resp)
      return

      setMessages(prev => [...prev, 
        {
          text:'variation', 
          isGpt: true,
          info:{
            imageUrl:resp.url,
            alt: resp.alt
          }
      }])
  }
  
  const hanlePost = async(text: string) => {
    setIsLoading(true)
    setMessages( (prev) => [...prev, {text, isGpt: false}])
    const resp = await imageGenerationUseCase({prompt:text})
    setIsLoading(false)
    
    if(!resp)
      setMessages(prev => [...prev, {text:'no se pudo generar la imagen', isGpt: true}])
    if(resp)
    {
      setMessages(prev => [...prev, 
        {
          text, 
          isGpt: true,
          info:{
            imageUrl:resp.url,
            alt: resp.alt
          }
      }])
    }
  }

  return (
    <>
    {originalImageAndMask.original && (
      <div className="fixed flex flex-col item-center top-10 right-10 z-10 fade-in">
        <span>Editando</span>
        <img className="border rounded-xl w-36 h-36 object-contain" src={originalImageAndMask.original} alt="imagen original"/>
        <button onClick={hanleVariation} className="btn-primary mt-2">Generated</button>
        
      </div>
    )}
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-col-12 gap-y-2">
          
          <GptMessage  text="Hola, ingresa la descripcion de la imagen que deseas que te genere!!"/>         
          
          {
            messages.map((message, index) =>(
              message.isGpt ? (
                <GptMessageImage key={index} text={message.text} imageUrl={message.info?.imageUrl} alt={message.info?.alt}/>
                )
                : (
                <GptMessage key={index} text={message.text}/>         
              )
            ))
          }

          {isLoading &&(
            <div className="col-start-1 col-end-12 fade-in">
              <TypingLoader className="fade-in"  />
            </div>
          ) }

        </div>
      </div>
      <TextMessageBox 
        onSendMessage={hanlePost} 
        placeholder="Pregunta pues!!"
        disableCorrections
        />

    </div>
    </>
  )
}

