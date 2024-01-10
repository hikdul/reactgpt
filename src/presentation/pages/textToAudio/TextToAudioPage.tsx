import { useState } from "react"
import { voices } from "./voices"
import { textToAudioProps } from "../../../intenfaces"
import { textToAudioUseCase } from "../../../core/use-cases"
import { GptMessage, MyMessage, TypingLoader, TextMessageBoxWhitSelect, GptMessageAudio } from "../../components"

export const TextToAudioPage = () => {
  
  const [isLoading, setIsLoading] = useState<boolean>(false) 
  const [messages, setMessages] = useState<textToAudioProps[]>([])
  const displaimer = `## hola, ingresa el texto que deseas transformar en audio!!
  * todos los audios generados los realiza una IA; no son boces humanas`

  const hanlePost = async(text: string, selectedOption: string) => {
    setIsLoading(true)
    setMessages( (prev) => [...prev, {text, isGpt: false}])
    // !: useCase 
    const resp = await textToAudioUseCase(text,selectedOption)
    setIsLoading(false)
    setMessages( (prev) => [...prev, {text, isGpt: true, info:resp}])
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-col-12 gap-y-2">

          <GptMessage  text={displaimer}/>         
          
          {
            messages.map((message, index) =>(
              message.isGpt ? (
                <GptMessageAudio urlFile={message.info?.UrlFile} key={index} text={message.text}/>         
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
        options={voices}
        />

    </div>
  )
}