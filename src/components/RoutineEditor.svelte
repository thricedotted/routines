<script>
  import { createEventDispatcher } from 'svelte'

  import SortableList from 'svelte-sortable-list'

  import RoutineModel from '../models/Routine'
  import RoutineStepsList from './RoutineStepsList.svelte'
  import RoutineStepEditor from './RoutineStepEditor.svelte'

  export let routine = new RoutineModel()

  // If we are not creating a new routine, use a clone to edit.
  // This way, we won't overwrite the already-saved routine,
  // in case we to cancel our changes.
  //
  // (And if we are creating a new routine, don't clone --
  // it's already not saved!
  const routineClone = routine.isNew ? routine : routine.clone()

  const dispatch = createEventDispatcher()

  console.log('now editing', routineClone)

  // I would rather that these were class methods, but using a class
  // method makes `routineClone.steps` non-reactive :(
  function addStep() {
    routineClone.steps = [...routineClone.steps, RoutineModel.newStep()]
  }

  function removeStep(i) {
    routineClone.steps = [...routineClone.steps.slice(0, i), ...routineClone.steps.slice(i + 1)]
  }

  function dispatchSave() {
    dispatch('save', routineClone)
  }

  function dispatchRemove() {
    dispatch('remove', routineClone)
  }
</script>

<style>
.routine-editor {
  display: flex;
  flex-flow: column;
  --label-font-size: 1rem;
  --label-padding: var(--shim);
  --label-height: calc(var(--label-font-size) + (var(--label-padding) * 2));
  --extra-margin: calc((var(--label-height) * 0.5) + var(--gutter));
  --extra-padding: calc(var(--label-padding) * 2);
  margin-bottom: var(--gutter);
}

.label {
  display: block;
  position: absolute;

  top: calc(var(--label-height) * -0.5);
  left: var(--gutter);

  background: var(--color-fg);

  font-size: var(--label-font-size);
  font-weight: 600;

  color: var(--color-bg);
  padding: var(--label-padding);
  border-radius: var(--radius-small);
}

.routine-name, .routine-time {
  position: relative;
  display: flex;
  flex-flow: column;
}

.routine-name  {
  margin-top: calc(var(--label-height) * 0.5);
}

.routine-time {
  margin-top: calc(var(--extra-margin) + 0.2rem);
}

.routine-name input, .routine-time input {
  font-size: 1.6rem;
  font-weight: 600;
  padding: var(--gutter);
  padding-top: calc(var(--gutter) + 0.4rem);
  border: 0.1rem solid var(--color-fg);
  border-radius: 0.4rem;
}

.routine-name input::placeholder {
  color: var(--color-fg-light);
}

.routine-name input:focus {
  background: var(--color-bg-light);
}

.routine-steps {
  position: relative;
  display: flex;
  flex-flow: column;
  margin-top: var(--extra-margin);
  padding-top: var(--extra-padding);
  margin-bottom: 0;
}

/* This fixes a border overlap issue...
   But I'm not sure what causes the border overlap
   issue in the first place.
 */
.routine-steps > * {
  margin: 0.1rem;
}

.add-step {
  display: flex;
  align-items: center;

  background: var(--color-bg);
  border-top: var(--border-thin);
  padding: var(--gutter);

  font-weight: 600;
}

.add-step i.material-icons {
  margin: var(--shim);
  color: var(--color-fg-dim);
}

.add-step span {
  margin-left: var(--gutter);
}

.add-step:hover,
.add-step:focus {
  background: var(--color-bg-light);
}

.add-step:hover i.material-icons,
.add-step:focus i.material-icons {
  color: var(--color-fg-light);
}

.routine-estimates {
  text-align: center;
  margin: var(--gutter) 0;
}

</style>

<form class="routine-editor" on:submit|preventDefault={dispatchSave}>

  <label for="routine-name" class="routine-name">
    <span class="label">Call this routine...</span>
    <input id="routine-name"
           type="text"
           autocomplete="off"
           placeholder="Morning routine"
           required
           bind:value={routineClone.name}
           >
  </label>

  <div class="routine-steps card">
    <span class="label">Steps</span>
    <RoutineStepsList steps={routineClone.steps}
                      let:step
                      let:i>
        <RoutineStepEditor {i} {step}
                          on:removeStep={() =>removeStep(i)}
                          />
    </RoutineStepsList>

    <!--
    <SortableList list={routineClone.steps}
                  on:sort={evt => routineClone.steps = evt.detail}
                  key="_id"
                  let:item
                  let:index>
      <RoutineStepEditor i={index} step={item}
                         on:removeStep={() =>removeStep(index)}
                        />
    </SortableList>
    -->

    <button type="button"
            class="add-step"
            on:click={addStep}>
            <i class="material-icons">add</i>
            <span>add another step!</span>
            </button>
  </div>

  <label for="routine-time" class="routine-time">
    <span class="label">I want to finish by...</span>
    <input id="routine-time"
           type="time"
           autocomplete="off"
           required
           bind:value={routineClone.endTime}
           >
  </label>

  <div class="routine-estimates space-between">
    <p>This routine takes <b>{routineClone.totalTime} minutes</b>.</p>
    {#if routineClone.endTime}
    <p>You'll need to start at <b>{routineClone.startTimeString}</b><br>to finish by <b>{routineClone.endTimeString}</b>.</p>
    {:else}
    <p>Enter a <button type="button" class="link" on:click="{() => document.getElementById('routine-time').focus() }">finish time</button> to get an estimate on when to start this routine!</p>
    {/if}
  </div>

  <div class="action-container">
    <button type="submit" 
            class="primary"
            >save routine!</button>
  </div>

  <div class="action-container">
    <button type="button" 
            class="secondary" 
            on:click={() => dispatch('cancel')}
            >never mind</button>
  </div>

</form>