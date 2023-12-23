import React from 'react'
import { Note } from '../../interfaces'
import style from './NoteArea.module.css'

const NoteArea = (props: {note: Note}) => {
    return (
        <div className={style.container}>NoteArea</div>
    )
}

export default NoteArea