import { OrthographyResponse } from "."

export interface orthographyMessageProps{
    text: string
    isGpt: boolean
    info?: OrthographyResponse
}