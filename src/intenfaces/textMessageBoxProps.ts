
export interface textMessageBoxProps{
    onSendMessage: (message:string) => void
    placeholder?: string
    disableCorrections?: boolean
}