
export interface textMessageBoxFileProps{
    onSendMessage: (message:string) => void
    placeholder?: string
    disableCorrections?: boolean
    accept?: string // ?  image/* 
}