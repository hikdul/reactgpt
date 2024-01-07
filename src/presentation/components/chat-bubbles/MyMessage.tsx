import { gptMessageprops } from '../../../intenfaces'

export const MyMessage = ({text}:gptMessageprops) => {
  return (
    <div className="col-start-6 col-end-13 p-3 rounded-lg">
        <div className="flex  items-center justify-start flex-row-reverse">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0 ">
                H
            </div>
            <div className="relative mr-3 text-sm bg-black backdrop-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl">
                <div>{text}</div>
            </div>
        </div>
    </div>
  )
}
