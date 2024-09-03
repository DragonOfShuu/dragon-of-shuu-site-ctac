import Image from "next/image"

// <button onClick={()=>{setFlagLoc('end')}} className="px-4">Set End</button>
// <button className="" onClick={playSim}>
//     <Image src={playIcon} alt={"Play Simulation"} className="h-full w-14" />
// </button>

type Props = {
    className?: string
    imageClassName?: string
    onClick: ()=>void
    text?: string
    alt?: string
    image?: any
}

const ToolBarButton = (props: Props) => {
    const isText = props.image==undefined

    return (
        <button onClick={props.onClick} className={`${isText?'px-4':''} ${props.className?props.className:''}`} title={props.alt}>
            {
                isText?(props.text?props.text:'N/A'):<Image 
                    src={props.image}
                    alt={props.alt?props.alt:''}
                    className={`h-full w-14 ${props.imageClassName?props.imageClassName:''}`}
                />
            }
        </button>
    )
}

export default ToolBarButton;