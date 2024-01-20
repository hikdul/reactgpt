

import { useState } from "react"
import { imageMessageProps } from "../../../intenfaces"
import { GptMessage, GptMessageImage, MyMessage, TextMessageBox, TypingLoader } from "../../components"
import { imageGenerationUseCase } from "../../../core/use-cases"

export const ImageGenerationPage = () => {
  
  const [isLoading, setIsLoading] = useState<boolean>(false) 
  const [messages, setMessages] = useState<imageMessageProps[]>([])
  
  
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
  )
}

