<script>
	import Router from 'svelte-spa-router'
	import routes from './routes'

	function registerServiceWorker() {
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register('/service-worker.js')
		}
	}

</script>

<svelte:window on:load={registerServiceWorker} />

<Router {routes} />