import React from 'react'
import { Note } from '../../interfaces'
import styles from './NoteTitle.module.css'

// Component to represent the note information in the left panel
const NoteTitle = (props: {note: Note, selected: boolean, onSelect: (id: number) => void}) => {

    // Abbreviate the title when it is >14 characters
    function abbrevTitle(title: string) {
        if(title.length > 14) {
            return title.substring(0, 14) + "..."
        }
        return title
    }

    return (
        <div className={props.selected? styles.containerSelected:styles.containerUnselected} onClick={() => props.onSelect(props.note.id)}>
            <h1>{abbrevTitle(props.note.title)}</h1>
            <h4 className={styles.date}>{props.note.date}</h4>
            <hr className={styles.rule}/>
        </div>
    )
}

export default NoteTitle