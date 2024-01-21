
export interface imagePropsUseCase {
    prompt: string
    originalImage?: string
    maskImage?: string
}


export interface imageVariationPropsUseCase {
    originalImage: string
}