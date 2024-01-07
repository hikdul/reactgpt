import { GptMessage, MyMessage } from "../../components"

export const OrthographyPage = () => {
  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-col-12 gap-y-2">
          <GptMessage text="Hola, puedes escribir tu texto para correguirlo en espaniol"/>         
          <MyMessage text="Hola mundo!" />
        </div>
      </div>
    </div>
  )
}
