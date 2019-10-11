import App from './App.svelte';

if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		console.log('uhh does this happen?')
		navigator.serviceWorker.register('/service-worker.js')
	})
}

const app = new App({
	target: document.getElementById('routines-app')
});

export default app;