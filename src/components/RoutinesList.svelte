<script>
  import RoutineSummary from '../components/RoutineSummary.svelte'

  export let routines
</script>

<style>
ul {
  padding-left: 0;
}

li {
  display: block;
}
</style>

<ul class="routines-list">
  {#each routines as routine (routine._id)}
    <li>
      <RoutineSummary {routine} />
    </li>
  {/each}
</ul>