import { generateId } from "../Utils/generateId.js"

export class Note {
  constructor(data) {
    this.id = generateId()
    this.title = data.title
    this.note = data.note || ''
    this.color = data.color
  }

  get ActiveTemplate() {
    return `
    <div class="col-md-8 col-12 thicc-border" style="background-color:${this.color}">
      <section class="row">
        <div class="col-4 text-light p-5">
          <h3>${this.title}</h3><br>
          <h6>Created:</h6><br>
          <h6>Updated:</h6><br>
          <h6>Words: 0</h6><br>
          <h6>Characters: 0</h6><br>
        </div>
        <div class="col-md-8 col-12 p-4">
          <textarea name="note-area" id="note-area" cols="70" rows="20" class="noteArea">${this.note}</textarea>
          <div class="d-flex justify-content-center ">
          <button class="btn btn-success mx-3" onclick="app.notesController.saveNote()">Save</button>
          <button class="btn btn-danger mx-3" onclick="app.notesController.deleteNote('${this.id}')">Delete</button>
          </div>
        </div>
      </section>
    </div>
    `
  }

  get TitleArea() {
    return `
      <div class="col-1 p-2 m-3 fw-bold selectable border" style="background-color:${this.color}" onclick="app.notesController.selectNote('${this.id}')">
        <span>${this.title}</span>
      </div>
    `
  }
}