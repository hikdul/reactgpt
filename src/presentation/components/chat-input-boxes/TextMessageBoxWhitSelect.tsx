import { FormEvent, useState } from "react"
import { textMessageBoxProps, textMessageBoxWhitSelectProps } from "../../../intenfaces"


export const TextMessageBoxWhitSelect = ({ onSendMessage, placeholder,options, disableCorrections = false }: textMessageBoxWhitSelectProps) => {

    const [message, setMessage] = useState<string>('')
    const [selectedOpt, setSelectedOpt] = useState<string>('')
    
    const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(message.trim().length <= 0 || selectedOpt.trim().length <= 0) 
            return
        onSendMessage(message, selectedOpt)
        setMessage('')
    }
    

    return (
        <form
            onSubmit={handleSendMessage}
            className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
            <div className="flex-grow">
                <div className="flex">

                    <input
                        type="text"
                        autoFocus
                        name="message"
                        className="w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10"
                        placeholder={placeholder}
                        autoComplete={disableCorrections ? 'on' : 'off'}
                        autoCorrect={disableCorrections  ? 'on' : 'off'}
                        spellCheck={disableCorrections   ? 'true' : 'false'}
                        value={message}
                        onChange={(e) =>setMessage(e.target.value)}
                    />
                    
                    <select 
                        name="select"
                        className="w-2/5 ml-5 border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10"
                        value={selectedOpt}
                        onChange={e => setSelectedOpt(e.target.value)}
                        >
                            <option value=''> [== Seleccione una Opcion ==] </option>
                            {options && options.map((opt)=>(
                                <option key={opt.id} value={opt.id}>{opt.text}</option>
                            ))}
                    </select>
                </div>
            </div>
            <div className="ml-4">
                <button className="btn-primary" type="submit">
                    <span className="mr-2">Send</span>
                    <i className="fa-regular fa-paper-plane"></i>
                </button>
            </div>

        </form>
    )
}

