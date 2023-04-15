<div class="container-xxl p-0 pt-3">
  <div class="row g-5">
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
    min-width: 25em;
  }

  @media screen and (max-width: 600px) {
    .row {
      padding-top: 0.5em;
    }

    .col {
      padding: 0 0.5em;
      margin-top: 1em;
    }
  }
</style>
