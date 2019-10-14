<script>
  import { push } from 'svelte-spa-router'

  import AppLayout from '../layouts/AppLayout.svelte'
  import HeaderLayout from '../layouts/HeaderLayout.svelte'
</script>

<style>
.card p {
  margin: var(--gutter);
}

.card p a {
  font-weight: 600;
  color: inherit;
  text-decoration: none;
}

.main {
  font-size: 1.2rem;
}
</style>

<AppLayout>

  <div slot="header">
    <HeaderLayout>
      <span slot="title">About</span>

      <button type="button"
              slot="nav-action"
              class="icon"
              aria-label="back to routines"
              on:click={() => push('/')}
              >
        <i class="material-icons">arrow_back</i>
      </button>

    </HeaderLayout>
  </div>

  <div slot="main">

    <div class="card">
      <section class="main">
        <p><b>Routines</b> is a tiny single-page app that helps manage... routines.</p>
      </section>

      <hr>

      <section class="extra">
        <p>Typeface is <a href="https://github.com/weiweihuanghuang/Work-Sans">Work Sans</a>, self-hosted and licensed under the <a href="/fonts/OFL.txt">Open Font License</a>.</p>
        <p>Icons are <a href="https://material.io/resources/icons">Material Design icons</a>, self-hosted and licensed under <a href="https://www.apache.org/licenses/LICENSE-2.0.html">Apache 2.0</a>.</p>
        <p>App icon made by <a href="https://www.flaticon.com/authors/geotatah" title="geotatah">geotatah</a> from <a href="https://www.flaticon.com/" 
      title="Flaticon">www.flaticon.com</a>.</p>
      </section>
    </div>

  </div>

</AppLayout>