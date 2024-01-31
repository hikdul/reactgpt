

import { useEffect, useState } from "react"
import { orthographyMessageProps } from "../../../intenfaces"// ? ver si es util aca o crear uno nuevo
import { GptMessage, MyMessage, TextMessageBox, TypingLoader } from "../../components"
import { createdThreadUseCase, postQuestionUseCase } from "../../../core/use-cases"

export const AssistantPage = () => {
  
  const [isLoading, setIsLoading] = useState<boolean>(false) 
  const [messages, setMessages] = useState<orthographyMessageProps[]>([])
  
  const [threadId, setthreadId] = useState<string>('')
  
  useEffect(() => {
    const threadIdLS = localStorage.getItem('threadId')
    if(threadIdLS)
      setthreadId(threadIdLS)
    if(!threadIdLS)
    {
      createdThreadUseCase().then( (id) =>{
        console.log(`se obtuvo ${id}`)
        setthreadId(id)
        localStorage.setItem('threadId', id)
      }).catch(err => console.log({err}))
    }
      
  }, [])
  
  
  useEffect(()=>{
    
    if(threadId)
      setMessages((prev)=> [...prev, {isGpt: true, text: `Identificador Thread de esta conversacion: ${threadId}`}])
    
  },[threadId])
  
  
  const hanlePost = async(text: string) => {
    if(!threadId) return //! Generar un mensaje o algun dato que de informacion al cliente de que hacer en estos casos
    
    setIsLoading(true)
    setMessages( (prev) => [...prev, {text, isGpt: false}])
    // TODO: useCase 
    const replace = await postQuestionUseCase(threadId, text)
    
    setIsLoading(false)
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
