import { appState } from "../AppState.js";
import { notesService } from "../Services/NotesService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { setHTML } from "../Utils/Writer.js";

function _drawActive() {
  let activeNote = appState.activeNote
  console.log('drawing active', activeNote);
  if (activeNote == appState.activeNote) {
    setHTML('active-template', activeNote.ActiveTemplate)
  }
}

function _drawTitle() {
  let notes = appState.notes
  let template = ''
  notes.forEach(n => template += n.TitleArea)
  setHTML('title-area', template)
}

function _drawNoteCount() {
  notesService.drawNoteCount()
}

export class NotesController {
  constructor() {
    appState.on('notes', _drawTitle)
    appState.on('activeNote', _drawActive)
    _drawTitle()
  }

  addNote() {
    window.event?.preventDefault()
    const form = window.event?.target
    let noteData = getFormData(form)
    notesService.addNote(noteData)
    _drawNoteCount()
    form.reset()
  }

  selectNote(id) {
    notesService.selectNote(id)
  }

  saveNote() {
    let newNote = document.querySelector('.noteArea')
    console.log(newNote.value);
    notesService.saveNote(newNote.value)
  }

  deleteNote(id) {
    notesService.deleteNote(id)
    _drawActive()
  }
}