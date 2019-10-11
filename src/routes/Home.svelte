<script>
  import { push } from 'svelte-spa-router'

  import { routines } from '../stores'

  import AppLayout from '../layouts/AppLayout.svelte'
  import HeaderLayout from '../layouts/HeaderLayout.svelte'

  import RoutinesList from '../components/RoutinesList.svelte'
</script>

<AppLayout>

  <!-- 
    Svelte doesn't support placing components in named slots,
    so we have to use a wrapper for now.
  -->
  <div slot="header">
    <HeaderLayout>
      <span slot="title">Routines</span>

      <div slot="page-actions" class="action-container">
        <button type="button"
                aria-label="about this app"
                on:click={() => push('/about')}
                ><i class="material-icons">info</i></button>
        <button type="button"
                aria-label="add new routine"
                on:click={() => push('/new')}
                ><i class="material-icons">add</i></button>
      </div>
    </HeaderLayout>
  </div>

  <div slot="main">
    <section class="my-routines">
      <h2>My Routines</h2>
      <RoutinesList routines={$routines} />
    </section>
  </div>

</AppLayout>


