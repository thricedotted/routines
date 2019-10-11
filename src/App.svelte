<script>
	import Router from 'svelte-spa-router'
	import routes from './routes'
	import { routines } from './stores'
</script>

{#await $routines.loaded}

<p>loading...</p>

{:then}

<Router {routes} />

{:catch err}

<p>oh no!</p>
<p>{err}</p>

{/await}