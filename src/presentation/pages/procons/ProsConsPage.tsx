
import { useState } from "react"
import { orthographyMessageProps } from "../../../intenfaces"
import { GptMessage, MyMessage, TextMessageBox, TypingLoader } from "../../components"
import { ProsConsUseCase } from "../../../core/use-cases"

export const ProsConsPage = () => {
  
  const [isLoading, setIsLoading] = useState<boolean>(false) 
  const [messages, setMessages] = useState<orthographyMessageProps[]>([])
  
  
  const hanlePost = async(text: string) => {
    setIsLoading(true)
    setMessages( (prev) => [...prev, {text, isGpt: false}])
    

    const {ok, content} = await ProsConsUseCase(text)
    console.log({content})
    setIsLoading(false)
    const resp = content && ok ? content : 'no se puede generar la comparacion'

    if(!ok)
    {
      setMessages( (prev) => [...prev, {text: resp, isGpt: false}])
    }

    if(ok)
    {
      setMessages( (prev) => [...prev, {text: resp, isGpt: true}])
    }
    
    // TODO:  agregar  mensaje de respuesta de GPT
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-col-12 gap-y-2">
          
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
      <TextMessageBox
        onSendMessage={hanlePost} 
        placeholder="Pregunta pues!!"
        disableCorrections
        />

    </div>
  )
}

