
export interface imageMessageProps{
    text: string
    isGpt: boolean
    info?: infoImageProps
}

export interface infoImageProps{
    imageUrl: string
    alt: string
}