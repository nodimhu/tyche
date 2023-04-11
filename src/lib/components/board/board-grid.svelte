<div class="container-fluid p-0">
  <div class="row mb-5 gy-5">
    <div class="col">
      <slot name="accounts-opening" />
    </div>
    <div class="col">
      <slot name="income" />
    </div>
    <div class="col">
      <slot name="accounts-closing" />
    </div>
    <div class="col">
      <slot name="recurring-expenses" />
    </div>
    <div class="col">
      <slot name="occasional-expenses" />
    </div>
    <div class="col">
      <slot name="summary" />
    </div>
  </div>
</div>

<style lang="scss">
  .col {
    min-width: 30em;
  }
</style>
