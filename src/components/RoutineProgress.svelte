<script>
  import { currentTime } from '../stores'

  export let routine, stepStates

  function dateToTimeString(date) {
    return date.toLocaleTimeString(navigator.language, {timeStyle: 'short'})
  }

  $: minutesComplete = routine.steps.map((step, i) => {
    return stepStates[i] ? step.duration : 0
  }).reduce((acc, d) => acc + d, 0)

  $: minutesLeft = routine.totalTime - minutesComplete

  $: now = dateToTimeString($currentTime)
  $: eta = dateToTimeString(new Date($currentTime.getTime() + (minutesLeft * 60000)))

</script>

<style>
.routine-progress {
  margin-bottom: var(--gutter) 0;
}

progress[value] {
  -webkit-appearance: none;
  appearance: none;

  border: none;
  margin: var(--shim) 0;

  width: 100%;
  height: var(--shim);
}

progress[value]::-webkit-progress-bar {
  background: var(--color-bg-light);
  border-radius: var(--half-shim);
  border: 1px solid var(--color-accent);
}

progress[value]::-webkit-progress-value {
  background: var(--color-accent);
  border-radius: var(--half-shim);
  transition-duration: 500ms;
}

progress[value]::-moz-progress-bar {
  background: var(--color-accent);
  border-radius: var(--half-shim);
  transition-duration: 500ms;
}

.progress-time, .progress-text {
  display: flex;
  justify-content: space-between;
}

.progress-text {
  font-size: 0.85rem;
  color: var(--color-fg);
}

.time-wrap {
  display: flex;
  flex-flow: column;
  color: var(--color-fg);
}

.time-wrap .label {
  font-size: 0.85rem;
  letter-spacing: 0.05em;
}

.time-wrap .time {
  font-size: 1.4rem;
  font-weight: 600;
}
</style>

<div class="routine-progress">

  <div class="progress-time">
    <div class="time-wrap">
      <span class="label">NOW</span>
      <span class="time">{now}</span>
    </div>

    <div class="time-wrap">
      <span class="label">ETA</span>
      <span class="time">{eta}</span>
    </div>
  </div>

  <progress max={routine.totalTime}
            value={minutesComplete}>
  </progress>

  <div class="progress-text">
    <div>{minutesComplete} minutes complete</div>
    <div>
      {#if minutesLeft}
        {minutesLeft} minutes left
      {:else}
        All done!
      {/if}
    </div>
  </div>
</div>