import { useState } from "react"
import { orthographyMessageProps } from "../../../intenfaces"
import { GptMessage, MyMessage, TypingLoader, TextMessageBoxFile } from "../../components"
import { audioToTextUseCase } from "../../../core/use-cases"

export const AudioToTextPage = () => {
  
  const [isLoading, setIsLoading] = useState<boolean>(false) 
  const [messages, setMessages] = useState<orthographyMessageProps[]>([])
  
  
  const hanlePost = async(props:{text: string, file: File}) => {
    const {text, file} = props
    setIsLoading(true)
    setMessages( (prev) => [...prev, {text, isGpt: false}])
    // TODO: useCase 
    var resp = await audioToTextUseCase(file,text)
    setIsLoading(false)
    if(!resp.ok) return;
    
    const gptResponse = `
**Datos del Audio **
--- 

**Duracion:** ${Math.round(resp.duration)} sg

**lenguaje:** ${resp.language}

**texto:** ${resp.text}

`
    setMessages( (prev) => [...prev, {text: gptResponse, isGpt: true}])
    
    resp.segments.forEach(segment => {
      const Smessage = `
**De ${Math.round(segment.start)} sg hasta ${ Math.round(segment.end)} Segundos**
---
${segment.text}

      `

    setMessages( (prev) => [...prev, {text: Smessage, isGpt: true}])
    });
    
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
        accept="audio/*"
        />

    </div>
  )
}

