import React from 'react'
import { Note } from '../../interfaces'
import styles from './NoteTitle.module.css'

const NoteTitle = (props: {note: Note, selected: boolean}) => {
    return (
        <div className={props.selected? styles.containerSelected:styles.containerUnselected}>
            <h1>{props.note.title}</h1>
            <h3>{props.note.date}</h3>
        </div>
    )
}

export default NoteTitle