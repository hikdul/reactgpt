
export interface textMessageBoxWhitSelectProps{
    onSendMessage: (message:string, selectedOpt:string) => void
    placeholder?: string
    disableCorrections?: boolean
    options: option[]
}

interface option {
    id: string
    text: string
}