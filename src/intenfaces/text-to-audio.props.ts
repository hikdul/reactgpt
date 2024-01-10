import { textToAudioResponse } from "."

export interface textToAudioProps{
    text: string
    isGpt: boolean
    info?: textToAudioResponse
}