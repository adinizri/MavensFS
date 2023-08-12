interface IProps{
    message:string
}

export default function ResultMsg({message}:IProps){
return <h1>{message}</h1>
}