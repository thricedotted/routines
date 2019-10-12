<script>
  import { location, push } from 'svelte-spa-router'
  import { routines } from '../stores'

  import AppLayout from '../layouts/AppLayout.svelte'
  import HeaderLayout from '../layouts/HeaderLayout.svelte'
  import RoutineEditor from '../components/RoutineEditor.svelte'

  export let params = {}

  const isNew = $location === '/new'

  $: routine = $routines.find(x => x._id === params.id)
  // TODO: handle routine not found!

  function onCancel() {
    const redirect = isNew ? '/' : `/routine/${routine._id}`
    push(redirect)
  }

  async function onSave(event) {
    try {
      const r = await routines.save(event.detail)
      push(`/routine/${r._id}`)
    }
    catch (err) {
      console.error(err)
    }
  }

  async function onRemove(event) {
    const confirmDialog = isNew
                          ? 'You want to stop editing this routine?'
                          : `hey! you want to delete ${routine.name}?`

    const confirmed = confirm(confirmDialog)

    if (confirmed) {
      if (!isNew) {
        try {
          await routines.remove(routine)
        }
        catch (err) {
          console.error(err)
        }
      }
      push(`/`)
    }
  }
</script>

{#if routine || isNew}
<AppLayout>

  <!-- 
    Svelte doesn't support placing components in named slots,
    so we have to use a wrapper for now.
  -->
  <div slot="header">
    <HeaderLayout>
      <span slot="title">
        {isNew ? 'Create' : 'Edit'} routine
      </span>

      <button type="button"
              slot="nav-action"
              class="icon"
              aria-label="cancel"
              on:click={onCancel}
              ><i class="material-icons">close</i></button>

      <div slot="page-actions">
        <button type="button"
                class="icon"
                aria-label="delete"
                on:click={onRemove}
                ><i class="material-icons">delete</i></button>

        <button type="button"
                class="icon"
                aria-label="save"
                on:click={onSave}
                ><i class="material-icons">save</i></button>
      </div>
    </HeaderLayout>
  </div>

  <div slot="main">
    <RoutineEditor {routine}
                   on:save={onSave}
                   on:cancel={onCancel}
                   on:remove={onRemove}
                   />
  </div>

</AppLayout>
{/if}
