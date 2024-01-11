
export interface textMessageBoxFileProps{
    onSendMessage: (props:{text: string, file: File}) => void
    placeholder?: string
    disableCorrections?: boolean
    accept?: string // ?  image/* 
}

interface apollo{
    text: string 
    file: File
}