// import { useState } from "react";
import { Trudge } from "../CommonTypes";
import MultiChooser, { TileType } from "./ChooseElements";


type Prop = {
    // content: TrudgeTileType[]
    setTrudge: (newTrudge: Trudge)=>any
}

const TileTypeChooser = (prop: Prop) => {
    const content: TileType<Trudge>[] = [
        {
            returns: Trudge.GRASS,
            color: '#4eff5f',
            tooltip: 'Grass - Neutral'
        },
        {
            returns: Trudge.ASPHALT,
            color: '#454d4f',
            tooltip: 'Asphalt - Fast'
        },
        {
            returns: Trudge.MUD,
            color: '#4a200f',
            tooltip: 'Mud - Slow'
        },
        {
            returns: Trudge.WATER,
            color: '#05b5fa',
            tooltip: 'Water - Very Slow'
        }
    ]

    const onchange = (value: Trudge) => {
        prop.setTrudge(value)
    }

    return (
        <MultiChooser content={content} changedCallback={onchange}  />
    )
}

export default TileTypeChooser;
