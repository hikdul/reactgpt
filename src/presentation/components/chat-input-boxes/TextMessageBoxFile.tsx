import { FormEvent, useRef, useState } from "react"
import { textMessageBoxFileProps, textMessageBoxProps } from "../../../intenfaces"


export const TextMessageBoxFile = ({accept, onSendMessage, placeholder, disableCorrections = false }: textMessageBoxFileProps) => {

    const [message, setMessage] = useState<string>('')
    const inputFileRef = useRef<HTMLInputElement>(null)
    const [selectedFile, setSelectedFile] = useState<File | null | undefined>(null)
    
    const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        //if(message.trim().length <= 0) retrn
        if(!selectedFile) return
        //? construllo el objeto con el que voy a enviar los datos
        const props ={
            text:message,
            file:selectedFile
        }
        onSendMessage(props)
        setMessage('')
        setSelectedFile(null)
    }

    return (
        <form
            onSubmit={handleSendMessage}
            className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
            <div className="mr-3">
                <button
                    type="button"
                    className="flex item-center justify-center text-gray-400 hover:text-gray-600 "
                    onClick={()=> inputFileRef.current?.click()}
                    >
                        <i className="fa-solid fa-paperclip text-xl"></i> 
                        <p className="hidden">que tochada esta maricada</p>
                </button>
                <input 
                    hidden
                    type="file"
                    ref={inputFileRef}
                    accept={accept}
                    onChange={(e)=>setSelectedFile(e.target.files?.item(0))}
                />
            </div>
            <div className="flex-grow">
                <div className="relative w-full">

                    <input
                        type="text"
                        autoFocus
                        name="message"
                        className="flex w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10"
                        placeholder={placeholder}
                        autoComplete={disableCorrections ? 'on' : 'off'}
                        autoCorrect={disableCorrections  ? 'on' : 'off'}
                        spellCheck={disableCorrections   ? 'true' : 'false'}
                        value={message}
                        onChange={(e) =>setMessage(e.target.value)}
                    />
                </div>
            </div>
            <div className="ml-4">
                <button 
                    className="btn-primary"
                    type="submit"
                    disabled={!selectedFile}>
                    {
                        (!selectedFile)
                        ?<span className="mr-2">Send</span>
                        : <span className="mr-2">{selectedFile.name.substring(0,10)+'...'}</span>
                    }
                    
                    <i className="fa-regular fa-paper-plane"></i>
                </button>
            </div>

        </form>
    )
}

