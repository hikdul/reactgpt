import Markdown from "react-markdown"
import { gptMessageWhitAudioprops } from "../../../intenfaces"

export const GptMessageAudio = ({text, urlFile}:gptMessageWhitAudioprops) => {
  return (
    <div className="col-start-1 col-end-8 p-3 rounded-lg">
        <div className="flex flex-row items-start">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0 ">
                G
            </div>
            <div className="relative ml-3 text-sm bg-black backdrop-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl">
                <Markdown>{text}</Markdown>
                {urlFile &&
                <audio
                  controls
                  src={urlFile}
                  className="w-full"
                  autoPlay
                  />
                }
            </div>
        </div>
    </div>
  )
}
