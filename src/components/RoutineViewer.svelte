<script>
  import { currentTime } from '../stores'

  import RoutineProgress from './RoutineProgress.svelte'
  import RoutineStepsList from './RoutineStepsList.svelte'
  import RoutineStep from './RoutineStep.svelte'

  export let routine

  const stepStates = routine.steps.map(() => false)
</script>

<RoutineProgress {routine} {stepStates} />

<div class="card">
  <RoutineStepsList steps={routine.steps}
                    let:step
                    let:i>
    <RoutineStep {step} {i}
                 bind:checked={stepStates[i]}
                 />
  </RoutineStepsList>
</div>
