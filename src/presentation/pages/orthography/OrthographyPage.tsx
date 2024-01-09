import { useState } from "react"
import { GptMessage, MyMessage, TextMessageBox, TypingLoader } from "../../components"
import { orthographyMessageProps } from "../../../intenfaces"
import { orthographyUseCase } from "../../../core/use-cases"
import { GptOrthographyMessage } from "../../components/chat-bubbles/GptOrthographyMessage"

export const OrthographyPage = () => {
  
  const [isLoading, setIsLoading] = useState<boolean>(false) 
  const [messages, setMessages] = useState<orthographyMessageProps[]>([])
  
  
  const hanlePost = async(text: string) => {
    setIsLoading(true)
    setMessages( (prev) => [...prev, {text, isGpt: false}])
    
     const resp = await orthographyUseCase(text)
     if(!resp.ok)
     {
        setMessages( (prev) => [...prev, {text:'No se pudo realizar la correccion', isGpt: true}])
     }
     if(resp.ok)
     {
        setMessages( (prev) => [...prev, {text:resp.message, isGpt: true, info: {...resp}}])
     }
    setIsLoading(false)
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-col-12 gap-y-2">
          
          {
            messages.map((message, index) =>(
              message.isGpt ? (
                <GptOrthographyMessage key={index} {...message.info!}/>         
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

      <TextMessageBox
        onSendMessage={hanlePost} 
        placeholder="Pregunta pues!!"
        disableCorrections
        />
    </div>
  )
}
