import Home from './routes/Home.svelte'
import About from './routes/About.svelte'
import EditRoutine from './routes/EditRoutine.svelte'
import ViewRoutine from './routes/ViewRoutine.svelte'
import NotFound from './routes/NotFound.svelte'

const routes = {
  // list of all routines
  '/': Home,

  // about/info page
  '/about': About,

  // create a routine
  '/new': EditRoutine,

  // edit existing routine
  '/routine/:id/edit': EditRoutine,

  // view existing routine
  '/routine/:id': ViewRoutine,

  // final catch-all
  '*': NotFound
}

export default routes