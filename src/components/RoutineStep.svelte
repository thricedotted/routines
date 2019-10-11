<script>
  // https://medium.com/claritydesignsystem/pure-css-accessible-checkboxes-and-radios-buttons-54063e759bb3

  export let step, i, checked
</script>

<style>
.routine-step {
  display: flex;
  align-items: center;

  cursor: pointer;

  padding: var(--gutter);
}

.routine-step-name {
  flex-grow: 1;
  padding: 0 var(--gutter);
}

.routine-step-duration {
  font-weight: 300;
}

.routine-step input[type=checkbox] {
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  height: 1px;
  width: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  opacity: 0;
}

.routine-step input[type=checkbox] + i.material-icons::before {
  display: block;
  font-size: 1rem;
  width: 1em;
  height: 1em;
  border: 0.1rem solid var(--color-fg);
  border-radius: 0.2rem;
  content: '';
}

.routine-step input[type=checkbox]:checked + i.material-icons::before {
  background: var(--color-fg);
  color: var(--color-bg);
  content: 'check';
}

.routine-step input[type="checkbox"]:focus + i.material-icons::before {
  outline: rgb(59, 153, 252) auto;
}

.routine-step.checked {
  opacity: 0.5;
}

.routine-step-name.checked {
  text-decoration: line-through;
}

</style>

<label class="routine-step"
       class:checked
       for="routine-step-{i}">

  <input type="checkbox"
          id="routine-step-{i}"
          bind:checked>

  <i class="material-icons"></i>

  <div class="routine-step-name" class:checked>
    {step.name}
  </div>

  <div class="routine-step-duration">
    {step.duration} min
  </div>
</label>
