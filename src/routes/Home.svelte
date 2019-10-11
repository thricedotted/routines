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

      <i slot="nav-action" class="material-icons">home</i>

      <button type="button"
              slot="page-actions"
              on:click={() => push('/new')}
              ><i class="material-icons">add</i></button>
    </HeaderLayout>
  </div>

  <div slot="main">
    <p><br>Welcome to routines! Here are your routines.</p>
    <RoutinesList routines={$routines} />
  </div>

</AppLayout>


