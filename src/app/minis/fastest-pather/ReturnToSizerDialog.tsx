import { useRef } from 'react'
import backIcon from './icons/leftArrow.svg'
import ToolBarButton from './toolBarElements/ToolBarButton'
import BaseDialog from './BaseDialog'
import { usePages } from './contexts/PageContext'

type Props = {

}

const ReturnToSizerDialog = (props: Props) => {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const {setPage} = usePages()

    const buttonClassnames = ``;

    return (
        <>
            <ToolBarButton onClick={()=>dialogRef.current?.showModal()} image={backIcon} alt="Return to Sizer" />
            <BaseDialog dialogRef={dialogRef}>
                {/* <p className={`text-3xl p-5`}> */}
                <p className={``}>
                    {`Are you sure you want to return to the sizer?`}
                </p>
                <div className='flex flex-row gap-2 items-stretch'>
                    <button onClick={()=>setPage('SIZER')} className={`${buttonClassnames}`}>
                        Yes
                    </button>
                    <button onClick={()=>dialogRef.current?.close()} className={`${buttonClassnames}`}>
                        No
                    </button>
                </div>
            </BaseDialog>
        </>
    )
}

export default ReturnToSizerDialog;