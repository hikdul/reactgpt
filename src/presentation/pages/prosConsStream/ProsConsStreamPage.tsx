
import { useRef, useState } from "react"
import { orthographyMessageProps } from "../../../intenfaces"
import { GptMessage, MyMessage, TextMessageBox, TypingLoader } from "../../components"
import { ProsConsStreamUseCase, ProsConsStreamUseCaseG } from "../../../core/use-cases"

export const ProsConsStreamPage = () => {
  
  const abortController = useRef(new AbortController())
  const isRuning = useRef(false)

  const [isLoading, setIsLoading] = useState<boolean>(false) 
  const [messages, setMessages] = useState<orthographyMessageProps[]>([])
  
  
  const hanlePost = async(text: string) => {
    
    // ? asi se ejecuta nada mas aparesca el handlet request 
    if(isRuning.current)
    {
      abortController.current.abort() // ** ==> otra forma seria llamar esta funcion por medio de un boton que permita genera la cancelacion del mismo
      // ? esto se hace ya que aca deberia de generarse un nuevo elemento o si no seguimas cancelando sobre el mismo
      abortController.current = new AbortController()
    }
    
    setIsLoading(true)
    isRuning.current = true
    setMessages( (prev) => [...prev, {text, isGpt: false}])
    // note: este es el modo de trabajar con el caso de uso que tiene la function generator
    const stream = ProsConsStreamUseCaseG(text, abortController.current.signal)
    setIsLoading(false)
    
    setMessages( (msgs) => [...msgs, {text, isGpt:true}])

    for await (const CurrentMessage of stream) {
      setMessages((messages) =>{
        const newMsg = [...messages]
        newMsg[newMsg.length - 1].text = CurrentMessage
        return newMsg
      })
    }

    isRuning.current = false
    // note: desde aqui en adelande es el modo de trabajar con el caso sin la function generator
 // * //   const reader = await ProsConsStreamUseCase(text)
 // * //   setIsLoading(false)
 // * //   
 // * //   if(!reader) return alert('!!OJO: no se pude generar el reader!!');
 // * //   
 // * //   const decoder = new TextDecoder()
// * //
 // * //   let CurrentMessage = ''
// * //
 // * //   setMessages((messages) => [...messages, {text: CurrentMessage, isGpt: true}])
 // * // 
 // * //   while(true)
 // * //   {
 // * //     const {value, done} = await reader.read();
 // * //     if(done) break
 // * //     
 // * //     const decodeChunk = decoder.decode(value, {stream: true})
 // * //     CurrentMessage += decodeChunk
 // * //     
 // * //     setMessages((messages) =>{
 // * //       const newMsg = [...messages]
 // * //       newMsg[newMsg.length - 1].text = CurrentMessage
 // * //       return newMsg
 // * //     })
 // * //     
 // * //   }

  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-col-12 gap-y-2">
          
            <GptMessage  text="Que deseas comparar?"/>         
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

