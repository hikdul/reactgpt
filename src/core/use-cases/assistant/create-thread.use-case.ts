
export const createdThreadUseCase = async () =>{

    try {
        const resp = await fetch(`${import.meta.env.VITE_ASSISTANT_API}/created-thread`,{
            method: 'post'
        })        
        
        const {id} = await resp.json() as {id:string}
        //console.log({id})
        return id
    } catch (error) {
        throw new Error("No se puede crear el Thread")
    }
}