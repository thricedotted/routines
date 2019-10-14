<script>
  import { slide } from 'svelte/transition'
  import { flip } from 'svelte/animate'

  export let steps

  const duration = 250
</script>

<style>
ul {
  padding-left: 0;
  margin: 0;
}

li {
  display: block;
}

li + li {
  border-top: 1px dotted var(--color-fg-light);
}
</style>

<ul>
  {#each steps as step, i (step._id)}
  <li transition:slide|local={{duration}}
      animate:flip={{duration}}>
    <slot {step} {i}></slot>
  </li>
  {/each}
</ul>