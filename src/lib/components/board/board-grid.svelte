<div class="container-fluid p-0">
  <div class="row">
    <div class="col-md">
      <slot name="accounts-opening" />
    </div>
    <div class="col-md">
      <slot name="income" />
    </div>
    <div class="col-md">
      <slot name="accounts-closing" />
    </div>
  </div>
  <div class="row">
    <div class="col-lg">
      <slot name="expneses-recurring" />
    </div>
    <div class="col-lg">
      <slot name="expneses-occasional" />
    </div>
  </div>
</div>
