import Markdown from "react-markdown"
import { OrthographyResponse } from "../../../intenfaces"

export const GptOrthographyMessage = ({userScore, errors, message}:OrthographyResponse) => {
  return (
    <div className="col-start-1 col-end-8 p-3 rounded-lg">
        <div className="flex flex-row items-start">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0 ">
                G 
            </div>
            <div className="relative ml-3 text-sm bg-black backdrop-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl">
                {(errors.length == 0)?<>
                  <p>{message}</p>
                </>:<>
                  <h3 className="text-2xl">Puntaje: {userScore}</h3>
                  <p>{message}</p>
                  <ul>
                    {errors.map((err) => <li key={err}>{err}</li> )}
                  </ul>
                </>}
                
            </div>
        </div>
    </div>
  )
}
