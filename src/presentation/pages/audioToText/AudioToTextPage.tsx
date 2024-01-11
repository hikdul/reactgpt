import { useState } from "react"
import { orthographyMessageProps } from "../../../intenfaces"
import { GptMessage, MyMessage, TypingLoader, TextMessageBoxFile } from "../../components"

export const AudioToTextPage = () => {
  
  const [isLoading, setIsLoading] = useState<boolean>(false) 
  const [messages, setMessages] = useState<orthographyMessageProps[]>([])
  
  
  const hanlePost = async(text: string) => {
    setIsLoading(true)
    setMessages( (prev) => [...prev, {text, isGpt: false}])
    // TODO: useCase 
    setIsLoading(false)
    // TODO:  agregar  mensaje de respuesta de GPT
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-col-12 gap-y-2">
          
          <GptMessage text={`### Hola, Que deseas transcribir.
          * recuerda que el peso maximo permitido es de 2MB.`}/>         
          {
            messages.map((message, index) =>(
              message.isGpt ? (
                <GptMessage key={index} text={message.text}/>         
              )
              : (
                <MyMessage key={index} text={message.text} />
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
      <TextMessageBoxFile
        onSendMessage={hanlePost} 
        placeholder="Pregunta pues!!"
        disableCorrections
        />

    </div>
  )
}

