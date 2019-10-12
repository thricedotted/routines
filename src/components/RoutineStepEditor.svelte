<script>
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  export let step, i
</script>

<style>
.routine-step {
  position: relative;
  display: flex;
  flex-flow: row;
  align-items: center;

  padding: var(--gutter);
}

.routine-step-inputs {
  display: flex;
  flex-flow: row wrap;
  flex-grow: 1;
  margin-left: var(--gutter);
}

.routine-step-inputs > * + * {
  margin: var(--shim) 0;
}

.routine-step-name {
  flex-grow: 1;
  margin-right: var(--gutter);
}

.routine-step-duration input {
  margin-right: var(--shim);
}

.routine-step-name, 
.routine-step-duration input {
  padding: var(--shim);
  border-bottom: 0.1rem solid var(--color-fg-light);
  border-radius: 0.2rem 0.2rem 0 0;
}

.routine-step-duration input {
  min-width: 3ch;
}

.routine-step-name:focus,
.routine-step-duration input:focus {
  border-color: var(--color-fg);
}

.remove {
  position: relative;
  color: var(--color-fg-dim);
  order: -1;
}

.remove:hover, .remove:focus {
  color: var(--color-fg-light);
}

</style>

<div class="routine-step">

  <div class="routine-step-inputs">
    <input id="routine-step-{i}" 
          class="routine-step-name"
          name="step-{i}"
          type="text"
          placeholder="brush teeth"
          autocomplete="off"
          bind:value={step.name}>

    <label class="routine-step-duration">
      <input type="number"
            name="step-duration-{i}"
            min="0" max="60"
            bind:value={step.duration}
            >minutes
    </label>
  </div>

  <button type="button"
          class="remove"
          on:click={() => dispatch('removeStep')}
          ><i class="material-icons">remove</i></button>
</div>