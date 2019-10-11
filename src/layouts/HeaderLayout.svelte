<style>
header {
  display: flex;
  align-items: center;

  padding: var(--gutter);

  color: var(--color-bg);
  background: var(--color-fg);
}

:global(header button) {
  display: flex;
  align-items: center;
  justify-content: center;
}

h1 {
  order: 2; /* place title in center */

  font-size: 1.6rem;
  flex-grow: 999; /* stretch to fit space */

  font-weight: 700;

  margin: 0 var(--gutter);
}

.nav-action {
  /* center the icon within this */
  display: flex;
  align-items: center;
  justify-content: center;
  order: 1; /* place nav action on left */
}

.page-actions {
  order: 3; /* place actions on right */
}
</style>

<header>
  <h1><slot name="title"></slot></h1>

  <div class="nav-action">
    <slot name="nav-action"></slot>
  </div>

  <div class="page-actions">
    <slot name="page-actions"></slot>
  </div>
</header>