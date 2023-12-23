import React, { ChangeEvent, useEffect, useState } from "react";
import axios from 'axios';
import styles from './app.module.css'
import { Note } from "./interfaces";
import NoteTitle from "./components/NoteTitle/NoteTitle";
import NoteArea from "./components/NoteArea/NoteArea";
import Navbar from "./components/Navbar/Navbar";

const serverUrl = 'http://localhost:3000/notes'

const emptyNote = {
  id: 0,
  title: '',
  body: '',
  date: '',
  time: ''
}

function App() {

  const [notes, setNotes] = useState<Note[]>([])
  const [currentNote, setCurrentNote] = useState<Note>()

  useEffect(() => {
    loadNotes();
  }, []);

  const titleList = notes.map((note) => {
    return (
      <NoteTitle key={note.id} onSelect={selectNote} note={note} selected={note.id===currentNote?.id}/>
    )
  })

  function selectNote(id: number) {
    setCurrentNote(notes.filter(note => note.id === id)[0])
  }

  async function createNote() {
    const newNote: Note = {
      id: 0,
      title: 'New Note',
      body: 'Text',
      date: getDate(),
      time: new Date().toLocaleTimeString('en-US')
    }

    const {data: response} = await axios.post(serverUrl, {
      newNote
    })
    newNote.id = response.data
    if(response.status !== "OK") {
      setCurrentNote(newNote)
      setNotes(prevNotes => [newNote, ...prevNotes])
    }
  }

  function getDate(): string {
    const today = new Date()
    const yyyy = today.getFullYear()
    const monthNum = today.getMonth() + 1
    const dayNum = today.getDate()

    let mm = monthNum.toString()
    let dd = dayNum.toString()

    if (dayNum < 10) dd = '0' + dd
    if (monthNum < 10) mm = '0' + mm

    return mm + '/' + dd + '/' + yyyy
  }

  async function saveNote() {
    if(currentNote !== emptyNote) {
      const savedId = currentNote?.id
      const {data: response} = await axios.put(serverUrl + "/" + savedId, {
        ...currentNote,
        date: getDate(),
        time: new Date().toLocaleTimeString('en-US')
      })
      setNotes(prevNotes => [response.note, ...prevNotes.filter(note => note.id !== savedId)])
      setCurrentNote(response.note)
    }
  }

  async function deleteNote() {
    const deletedId = currentNote?.id
    const {data: response} = await axios.delete(serverUrl + "/" + deletedId)
    if(response.status !== "OK") {
      setCurrentNote(emptyNote)
      setNotes(prevNotes => prevNotes.filter(note => note.id !== deletedId))
    }
  }
  
  const loadNotes = async () => {
    const data = await getNotes();
    setNotes(orderNotes(data));
  }

  function orderNotes(data: Note[]): Note[] {
    return data.sort((a, b) => compareTimes(a.date, a.time, b.date, b.time));
  }

  function compareTimes(dateA: string, timeA: string, dateB: string, timeB: string) {
  const A = new Date(`${dateA} ${timeA}`);
  const B = new Date(`${dateB} ${timeB}`);
  return B.getTime() - A.getTime();
  }

  function onInputUpdate(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) {
    const {name, value} = event.target
    setCurrentNote(prevNote => {
        return {
          ...emptyNote,
          ...prevNote,
          [name]: value
        }
    })
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
      <div className={styles.navbar}>
        <Navbar onSave={saveNote} onDelete={deleteNote} onCreate={createNote}/>
      </div>
      <div className={styles.titleArea}>
        {titleList}
      </div>
      <div className={styles.noteArea}>
        <NoteArea handleInputChange={onInputUpdate} note={currentNote || emptyNote} />
      </div>
    </div>
  );
}

export default App;