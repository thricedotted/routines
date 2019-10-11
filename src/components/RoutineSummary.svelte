<script>
  import { createEventDispatcher } from 'svelte'
  import { link, push } from 'svelte-spa-router'
  import { routines } from '../stores'

  export let routine
</script>

<style>
.routine-summary {
  position: relative;

  margin: var(--gutter) 0;
  padding: var(--gutter);
}

.routine-name {
  font-size: 1.2rem;
}

.routine-meta {
  font-size: 0.85rem;
  margin-top: var(--shim);
}

a {
  color: inherit;
  text-decoration: none;
  font-weight: 400;
}

a::after {
  content: '';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>

<div class="routine-summary card">
  <h2 class="routine-name">
    <a href="/routine/{routine._id}" use:link>{routine.name}</a>
  </h2>

  <div class="routine-meta">
    <p>{routine.startTimeString}&ndash;{routine.endTimeString} &bull; {routine.totalTime} minutes</p>
  </div>
</div>