<script>
  import { push } from 'svelte-spa-router'

  import AppLayout from '../layouts/AppLayout.svelte'
  import HeaderLayout from '../layouts/HeaderLayout.svelte'
</script>

<style>
section.error {
  display: flex;
  flex-flow: column;
  align-items: center;
}

.to-routines {
  font-weight: 600;
  background: var(--color-fg);
  color: var(--color-bg);
  border-radius: 0.8rem;
  padding: var(--gutter);
  box-shadow: 0 0 0.2rem var(--color-accent);
}
</style>

<AppLayout>

  <div slot="header">
    <HeaderLayout>
      <span slot="title">???</span>

      <button type="button"
              slot="nav-action"
              class="back"
              aria-label="back to routines"
              on:click={() => push('/')}
              ><i class="material-icons">arrow_back</i></button>
    </HeaderLayout>
  </div>

  <div slot="main">
    <section class="error space-between">
      <p>Something weird has happened!!!</p>

      <button type="button"
              class="to-routines"
              on:click={() => push('/')}
              >back to routines</button>
    </section>
  </div>

</AppLayout>
