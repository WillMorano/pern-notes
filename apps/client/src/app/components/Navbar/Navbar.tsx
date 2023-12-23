import React from 'react'
import styles from './Navbar.module.css'
import { BsTrash3 } from "react-icons/bs";
import { IoCreateOutline } from "react-icons/io5";
import { RiSave3Line } from "react-icons/ri";
import { Tooltip } from 'react-tooltip'

const Navbar = (props: { onSave: () => Promise<void>, onCreate: () => Promise<void>, onDelete: () => Promise<void>}) => {
    return (
        <div className={styles.container}>
            <div className={styles.title}>PERN Notes App</div>
            <div className={styles.create} 
                onClick={() => props.onCreate()}
                data-tooltip-id="create"
                data-tooltip-content="Create a note"
                data-tooltip-place="top">
                <IoCreateOutline />
            </div>
            <div className={styles.edit}
            onClick={() => props.onSave()}
                data-tooltip-id="edit"
                data-tooltip-content="Save selected note"
                data-tooltip-place="top">
                <RiSave3Line />
            </div>
            <div className={styles.trash}
                onClick={() => props.onDelete()}
                data-tooltip-id="delete"
                data-tooltip-content="Delete"
                data-tooltip-place="top">
                <BsTrash3 />
            </div>
            <Tooltip id="create" />
            <Tooltip id="edit" />
            <Tooltip id="delete" />
        </div>
    )
}

export default Navbar