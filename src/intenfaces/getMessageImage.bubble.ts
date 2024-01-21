
export interface gptImageMessageprops
{
    text: string
    imageUrl?: string
    alt?: string
    onImageSelected?: (imageUrl: string) => void
}