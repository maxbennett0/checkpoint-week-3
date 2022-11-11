import { Note } from "./Models/Note.js"
import { Value } from "./Models/Value.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"
import { loadState } from "./Utils/Store.js"

class AppState extends EventEmitter {
  /** @type {import('./Models/Value').Value[]} */
  values = loadState('values', [Value])

  /** @type {import('./Models/Note').Note[]} */
  // notes = [
  //   new Note({
  //     title: "my thoughts",
  //     note: "today I decided that this project is lame and not going to be fun to build",
  //     color: "#FF0000"
  //   }),
  //   new Note({
  //     title: 'your mom',
  //     note: 'yo mama is so big the earth is small hahaha',
  //     color: '#228B22'
  //   })
  // ]

  notes = loadState('notes', [Note])

  activeNote = null
}

export const appState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
