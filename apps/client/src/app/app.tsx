import React, { ChangeEvent, useEffect, useState } from "react";
import axios from 'axios';
import styles from './app.module.css'
import { Note } from "./interfaces";
import NoteTitle from "./components/NoteTitle/NoteTitle";
import NoteArea from "./components/NoteArea/NoteArea";
import Navbar from "./components/Navbar/Navbar";

// backend route
const serverUrl = 'http://localhost:3000/notes'

// note to populate NoteArea with when no note is selected
const emptyNote = {
  id: 0,
  title: '',
  body: '',
  date: '',
  time: ''
}

function App() {

  // Keep track of the notes in the planner
  const [notes, setNotes] = useState<Note[]>([])

  // Keep track of the selected note to show in the right window
  const [currentNote, setCurrentNote] = useState<Note>()

  // When webpage is loaded, query the notes from backend
  useEffect(() => {
    loadNotes();
  }, []);

  // Create left panel to display note title and dates
  const titleList = notes.map((note) => {
    return (
      <NoteTitle key={note.id} onSelect={selectNote} note={note} selected={note.id===currentNote?.id}/>
    )
  })

  // Function to run when note is selected on left side
  function selectNote(id: number) {
    setCurrentNote(notes.filter(note => note.id === id)[0])
  }

  // Create a note with the current date and time
  async function createNote() {
    const newNote: Note = {
      id: 0,
      title: 'New Note',
      body: 'Text',
      date: getDate(),
      time: new Date().toLocaleTimeString('en-US')
    }

    // Post to server
    const {data: response} = await axios.post(serverUrl, {
      newNote
    })
    newNote.id = response.data

    // On success update the currentNote and list of Notes
    if(response.status !== "OK") {
      setCurrentNote(newNote)
      setNotes(prevNotes => [newNote, ...prevNotes])
    }
  }

  // Function to get the date and return it in mm/dd/yyyy
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

  // Save the note to the database
  async function saveNote() {
    // If a note is selected
    if(currentNote && currentNote !== emptyNote) {
      // Send the put request to the server with the updated date and time
      const savedId = currentNote?.id
      const {data: response} = await axios.put(serverUrl + "/" + savedId, {
        ...currentNote,
        date: getDate(),
        time: new Date().toLocaleTimeString('en-US')
      })
      // Update the note data
      setNotes(prevNotes => [response.note, ...prevNotes.filter(note => note.id !== savedId)])
      setCurrentNote(response.note)
    }
  }

  // Delete the currently selected note
  async function deleteNote() {
    // Send delete request to backend
    const deletedId = currentNote?.id
    const {data: response} = await axios.delete(serverUrl + "/" + deletedId)
    // On good response, update note data
    if(response.status !== "OK") {
      setCurrentNote(emptyNote)
      setNotes(prevNotes => prevNotes.filter(note => note.id !== deletedId))
    }
  }
  
  // Perform get request and order the notes before updating the information
  const loadNotes = async () => {
    const data = await getNotes();
    setNotes(orderNotes(data));
  }

  // Order notes newest to oldest based on date/time
  function orderNotes(data: Note[]): Note[] {
    return data.sort((a, b) => compareTimes(a.date, a.time, b.date, b.time));
  }

  // Helper function to compare the date/time of each note
  function compareTimes(dateA: string, timeA: string, dateB: string, timeB: string) {
  const A = new Date(`${dateA} ${timeA}`);
  const B = new Date(`${dateB} ${timeB}`);
  return B.getTime() - A.getTime();
  }

  // When the form is changed update the note area text
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

  // Perform get request to get the notes and return the queried data
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