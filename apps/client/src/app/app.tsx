import React, { useEffect, useState } from "react";
import axios from 'axios';
import styles from './app.module.css'
import { Note } from "./interfaces";
import NoteTitle from "./components/NoteTitle/NoteTitle";
import NoteArea from "./components/NoteArea/NoteArea";

const serverUrl = 'http://localhost:3000/notes'

const emptyNote = {
  id: 0,
  title: '',
  body: '',
  date: ''
}

function App() {

  const [notes, setNotes] = useState<Note[]>([])
  const [currentNote, setCurrentNote] = useState<Note>()

  useEffect(() => {
    loadNotes();
  }, []);

  const titleList = notes.map((note) => {
    return (
      <NoteTitle key={note.id} note={note} selected={note.id===currentNote?.id}/>
    )
  })
  
  const loadNotes = async () => {
    const data = await getNotes();
    setNotes(data);
  }

  async function getNotes(): Promise<Note[]> {
    const {data: response} = await axios.get(serverUrl);
    let notes: Note[] = []
    if(response.status !== "OK") {
      console.log("Error loading notes")
    }
    else {
      notes = response.data
    }
    return notes
  }

  return (
    <div className={styles.app}>
      <div className={styles.titleArea}>
        {titleList}
      </div>
      <div className={styles.noteArea}>
        <NoteArea note={currentNote || emptyNote} />
      </div>
    </div>
  );
}

export default App;