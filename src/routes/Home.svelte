<script>
  import { push, link } from 'svelte-spa-router'

  import { routines } from '../stores'

  import AppLayout from '../layouts/AppLayout.svelte'
  import HeaderLayout from '../layouts/HeaderLayout.svelte'

  import RoutinesList from '../components/RoutinesList.svelte'
</script>

<style>
.new {
  display: flex;
  flex-flow: column;
  align-items: center;
}

.my-routines {
  overflow: hidden;
}

h2 {
  display: flex;
  align-items: center;
  background: var(--color-bg);
}

h2::after {
  content: '';
  display: block;
  flex-grow: 1;
  margin-left: var(--gutter);
  height: 0.2rem;
  background: var(--color-fg);
}
</style>

<AppLayout>

  <!-- 
    Svelte doesn't support placing components in named slots,
    so we have to use a wrapper for now.
  -->
  <div slot="header">
    <HeaderLayout>
      <span slot="title">Routines</span>

      <div slot="page-actions">
        <button type="button"
                class="icon"
                aria-label="about this app"
                on:click={() => push('/about')}
                ><i class="material-icons">info</i></button>
        <button type="button"
                class="icon"
                aria-label="add new routine"
                on:click={() => push('/new')}
                ><i class="material-icons">add</i></button>
      </div>
    </HeaderLayout>
  </div>

  <div slot="main">
    {#if $routines.length > 0}

    <section class="my-routines">
      <h2>My Routines</h2>
      <RoutinesList routines={$routines} />
    </section>

    {:else}

    <section class="new space-between">
      <p>No routines yet!</p>
      <button type="button"
              class="primary"
              aria-label="add new routine"
              on:click={() => push('/new')}
              >create my first routine</button>
    </section>

    {/if}
  </div>

</AppLayout>


