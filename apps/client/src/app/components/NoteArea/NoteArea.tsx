import React, { ChangeEvent } from 'react'
import { Note } from '../../interfaces'
import styles from './NoteArea.module.css'

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const NoteArea = (props: {note: Note, handleInputChange: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void}) => {

    function extendDate(date: string): string {
        let dateExtended = ""
        if(date !== "") {
            const numbers = date.split('/')
            dateExtended += months[Number(numbers[0])-1] + " " + numbers[1] + ", " + numbers[2]
        }
        return dateExtended
    }

    return (
        <div className={styles.container}>
            <div className={styles.date}>{extendDate(props.note.date)} {props.note.date !== "" && 'at'} {props.note.time}</div>
            {props.note.date !== "" && <form>
                <input
                    className={styles.title}
                    type="text"
                    onChange={props.handleInputChange}
                    name="title"
                    value={props.note.title}
                />
                <br />
                <textarea
                    className={styles.body}
                    value={props.note.body}
                    onChange={props.handleInputChange}
                    name="body"
                />
            </form>}
        </div>
    )
}

export default NoteArea