<script>
  import { push } from 'svelte-spa-router'

  import { routines } from '../stores'

  import AppLayout from '../layouts/AppLayout.svelte'
  import HeaderLayout from '../layouts/HeaderLayout.svelte'

  import RoutineViewer from '../components/RoutineViewer.svelte'

  export let params = {}

  $: routine = $routines.find(x => x._id === params.id)
  // TODO: redirect if routine is not found!
</script>

{#if routine}
<AppLayout>

  <!-- 
    Svelte doesn't support placing components in named slots,
    so we have to use a wrapper for now.
  -->
  <div slot="header">
    <HeaderLayout>
      <span slot="title">{routine.name}</span>

      <button type="button"
              slot="nav-action"
              class="icon"
              aria-label="back to routines"
              on:click={() => push('/')}
              ><i class="material-icons">arrow_back</i></button>

      <button type="button"
              slot="page-actions"
              class="icon"
              aria-label="edit this routine"
              on:click={() => push(`/routine/${routine._id}/edit`)}
              ><i class="material-icons">edit</i></button>
    </HeaderLayout>
  </div>

  <div slot="main">
    <RoutineViewer {routine} />
  </div>

</AppLayout>
{/if}