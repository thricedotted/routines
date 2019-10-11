<script>
  export let steps
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
  {#each steps as step, i (i)}
  <li>
    <slot {step} {i}></slot>
  </li>
  {/each}
</ul>