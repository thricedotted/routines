import moment from 'moment'

class RoutineModel {
  constructor({_id = null, 
               _rev = null, 
               name = "", 
               endTime = "", 
               steps=[]} = {}) {
    this._id = _id
    this._rev = _rev
    this.name = name
    this.endTime = endTime

    // if this is a new routine, initialize with empty step
    this.steps = _id 
                 ? steps 
                 : [RoutineModel.newStep()] 
                    //RoutineModel.newStep(),
                    //RoutineModel.newStep()]
                    
  }

  /*
  Can't use these methods because setting `this.steps` indirectly
  means that `this.steps` is not reactive :(

  addStep() {
    this.steps = [...this.steps, this.newStep()]
  }

  removeStep(i) {
    this.steps = [...this.steps.slice(0, i), ...this.steps.slice(i + 1)]
  }
  */

  clone() {
    const cloneDoc = JSON.parse(JSON.stringify(this.doc))
    return new RoutineModel(cloneDoc)
  }

  get doc() {
    const doc = {
      name: this.name,
      endTime: this.endTime,
      steps: this.steps
    }

    // only include ID and revision on existing documents
    if (!this.isNew) {
      doc._id = this._id
      doc._rev = this._rev
    } 

    return doc
  }

  get totalTime() {
    return this.steps.map(x => x.duration)
                     .reduce((acc, d) => acc + d, 0)
  }

  get endTimeString() {
    return moment(this.endTime, 'HH:mm').format('LT')
  }

  get startTimeString() {
    const start = moment(this.endTime, 'HH:mm').subtract(this.totalTime, 'minutes')
    return start.format('LT')
  }

  get isNew() {
    return this._id === null
  }

  static newStep() {
    return {
      name: "",
      duration: 5,
      _id: randomId()
    }
  }
}

function randomId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export default RoutineModel