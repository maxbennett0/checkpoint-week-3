import { appState } from "../AppState.js";
import { Note } from "../Models/Note.js";
import { saveState } from "../Utils/Store.js";
import { setText } from "../Utils/Writer.js";

let noteCount = 0
class NotesService {

  drawNoteCount() {
    if (noteCount >= 0) {
      setText('noteCount', 'Note Count: ' + noteCount.toString())
    }
  }
  deleteNote(id) {
    noteCount--
    let filteredArr = appState.notes.filter(n => n.id != id)
    appState.notes = filteredArr
    saveState('notes', filteredArr)
  }
  saveNote(value) {
    let activeNote = appState.activeNote
    activeNote.note = value
    appState.emit('activeNote')
    saveState('notes', appState.notes)
  }

  addNote(noteData) {
    noteCount++
    console.log('note data', noteData);
    const newNote = new Note(noteData)
    appState.notes = [...appState.notes, newNote]
    appState.activeNote = newNote
    saveState('notes', appState.notes)
    console.log('new active is', newNote);
  }

  selectNote(id) {
    let foundNote = appState.notes.find(n => n.id == id)
    console.log(foundNote);
    appState.activeNote = foundNote
    console.log('active is', foundNote);
  }
}

export const notesService = new NotesService()