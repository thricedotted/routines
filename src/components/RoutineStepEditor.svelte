<script>
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  export let step, i, totalSteps

  $: isFirst = i === 0
  $: isLast = i === totalSteps - 1
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
  border-bottom: var(--border-thick);
  border-color: var(--color-fg-light);
  border-radius: var(--radius-small) var(--radius-small) 0 0;
}

.routine-step-duration input {
  min-width: 3ch;
}

.routine-step-name:focus,
.routine-step-duration input:focus {
  border-color: var(--color-fg);
}

.remove {
  order: -1;
}

.remove:hover, .remove:focus {
  color: var(--color-fg-light);
}

.routine-step-move {
  display: flex;
  flex-flow: column;
}

button[disabled] {
  opacity: 0.25;
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
          class="icon remove"
          disabled={isFirst && isLast}
          aria-label="remove step"
          on:click={() => dispatch('removeStep')}
          ><i class="material-icons">remove</i></button>

  <div class="routine-step-move">
    <button type="button"
            class="icon"
            disabled={isFirst}
            aria-label="move step up"
            on:click={() => dispatch('moveUp')}
            ><i class="material-icons">arrow_drop_up</i></button>

    <button type="button"
            class="icon"
            disabled={isLast}
            aria-label="move step down"
            on:click={() => dispatch('moveDown')}
            ><i class="material-icons">arrow_drop_down</i></button>
  </div>
</div>