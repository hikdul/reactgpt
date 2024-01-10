
import { useState } from "react"
import { orthographyMessageProps } from "../../../intenfaces"
import { GptMessage, MyMessage, TypingLoader, TextMessageBoxWhitSelect } from "../../components"
import { languages } from "./langs"
import { translateUseCase } from "../../../core/use-cases"

export const TranslatePage = () => {
  
  const [isLoading, setIsLoading] = useState<boolean>(false) 
  const [messages, setMessages] = useState<orthographyMessageProps[]>([])
  
  
  const hanlePost = async(text: string, selectedOption: string) => {
    setIsLoading(true)
    const newMessage = `traduce el siguiente texto "${text}" al siguiente idioma ${selectedOption}`
    setMessages( (prev) => [...prev, {text:newMessage, isGpt: false}])
    // TODO: useCase 

    setIsLoading(false)
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-col-12 gap-y-2">
          
          <GptMessage  text="hola, que deseas traducir?"/>         
          
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
      <TextMessageBoxWhitSelect
        onSendMessage={hanlePost}
        placeholder="Pregunta pues!!"
        options={languages}
        />

    </div>
  )
}
