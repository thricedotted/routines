import moment from 'moment'

import PouchDB from 'pouchdb'
import { writable, readable } from 'svelte/store'

import RoutineModel from './models/Routine'
import { DB_NAME } from './config'

const db = new PouchDB(DB_NAME)

// The routine store... is also our controller.

function createRoutineStore() {
  const { subscribe, set, update } = writable([])

  const load = async () => {
    const result = await db.allDocs({include_docs: true})
    const routines = result.rows.map(row => new RoutineModel(row.doc))
    set(routines)
    console.log('Routines loaded from PouchDB into Svelte store!')
  }

  const ready = load()

  const findIndex = id => {
    let idx

    const unsubscribe = subscribe(arr => {
      idx = arr.findIndex(x => x._id === id)
    })
    unsubscribe()

    return idx
  }

  const save = async routine => {
    const isNew = routine.isNew

    const saveFunc = isNew ? db.post : db.put
    const response = await saveFunc(routine.doc)

    console.log('routine saved?', response)

    if (response.ok) {
      routine._id = response.id
      routine._rev = response.rev

      if (isNew) {
        update(arr => [...arr, routine])
      } else {
        const idx = findIndex(routine._id)
        update(arr => [...arr.splice(0, idx), 
                      routine, 
                      ...arr.splice(idx + 1)])
      }

      return routine
    }
  }

  const remove = async routine => {
    const response = await db.remove(routine.doc)

    console.log('routine deleted?', response)

    if (response.ok) {
      const idx = findIndex(routine._id)
      update(arr => [...arr.splice(0, idx), ...arr.splice(idx + 1)])
    }
  }

  return {
    subscribe,
    ready,
    save,
    remove
  }
}

export const routines = createRoutineStore()

export const currentTime = readable(moment(), set => {
	const interval = setInterval(() => {
		set(moment())
	}, 1000)

	return () => {
		clearInterval(interval)
	}
})
