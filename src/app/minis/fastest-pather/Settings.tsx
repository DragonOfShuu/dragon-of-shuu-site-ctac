import { useEffect, useRef, useState } from 'react'
import gearIcon from './icons/gear.svg'
import Rotate from './icons/rotateItems.svg'
import CheckBox from '@/components/inputs/CheckBox'
import BaseDialog from './BaseDialog'
import ToolBarButton from './toolBarElements/ToolBarButton'
import RangeInput from '@/components/inputs/RangeInput'
import { useSettings } from './contexts/SettingsContext'

export type SettingsProps = {
    // setSettings: (newSettings: SettingsType)=>any
    // settings: SettingsType
    // resetSettings: ()=>SettingsType
}

const Settings = (props: SettingsProps) => {
    const diaglogBox = useRef<HTMLDialogElement>(null)

    const {sData, sDispatch} = useSettings()

    return (
        <>
            <ToolBarButton onClick={()=>diaglogBox.current?.showModal()} alt='Settings' image={gearIcon} />
            
            <BaseDialog dialogRef={diaglogBox} topBar={[{alt: 'Reset Settings', click: ()=>sDispatch({type: 'reset'}), image: Rotate}]}>
                <RangeInput
                    min={0}
                    max={2000}
                    step={5}
                    text='Speed of Path Showing (ms)'
                    value={sData.pathRevealSpeed}
                    onChange={(e)=> sDispatch({type: 'update', data: {pathRevealSpeed: Number.parseFloat(e.target.value)}})} />
                <RangeInput
                    min={0}
                    max={100}
                    text='Speed of Algorithm (ms)'
                    value={sData.algoSpeed}
                    onChange={(e)=>sDispatch({type: 'u', algoSpeed: Number.parseFloat(e.target.value)})}/>
                <label>
                    <input
                        type='number'
                        min={1}
                        max={30}
                        onChange={(e)=> sDispatch({type: 'u', heuristicMultiplier: Number.parseFloat(e.target.value)})}
                        value={sData.heuristicMultiplier}
                        className={`mr-[10px]`}
                        />
                    {`Directional Magnet Strength`}
                </label>
                <CheckBox 
                    text={`Normalize trudge`} 
                    onChange={(e)=> sDispatch({type: 'u', normalizeDirection: e.target.checked})} 
                    checked={sData.normalizeDirection} />
                <CheckBox 
                    text={`Can perform diagonals`} 
                    onChange={(e)=> sDispatch({type: 'u', canPerformDiagonals: e.target.checked})} 
                    checked={sData.canPerformDiagonals} />
            </BaseDialog>
        </>
    )
}

export default Settings;