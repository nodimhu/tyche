<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let id: string | undefined = undefined;
  export let placeholder = "";
  export let name = "";
  export let required = false;
  export let readonly = false;
  export let disabled = false;
  export let success = false;
  export let danger = false;
  export let autocomplete: string | null = null;

  export let value = "";

  const dispatch = createEventDispatcher();

  const handleChange = (inputElement: HTMLInputElement) => {
    const newValue = inputElement.value;

    if (newValue === value) {
      dispatch("blur", { target: inputElement });
      return;
    }

    if (required && !newValue) {
      inputElement.value = value;
      dispatch("blur", { target: inputElement });
      return;
    }

    dispatch("blur-change", { target: inputElement, value: newValue });
  };

  const onFocus = (event: FocusEvent) => {
    if (event.target) {
      const inputElement = event.target as HTMLInputElement;
      inputElement.setSelectionRange(0, inputElement.value.length);
    }

    dispatch("focus", { target: event.target });
  };

  const onBlur = (event: FocusEvent) => {
    if (event.target) {
      handleChange(event.target as HTMLInputElement);
    }
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.target && event.key === "Enter") {
      handleChange(event.target as HTMLInputElement);
    }
  };
</script>

<input
  {id}
  {name}
  {value}
  {required}
  {readonly}
  {disabled}
  {placeholder}
  {autocomplete}
  type="text"
  class="form-control"
  class:readonly
  class:danger
  class:success
  on:focus={onFocus}
  on:blur={onBlur}
  on:keydown={onKeyDown}
/>

<style lang="scss">
  @import "$lib/styles/variables";

  .readonly {
    background-color: var(--bs-secondary-bg);
  }

  .success {
    z-index: 1;
    box-shadow: inset 0 0 0 1px $success;
    background-color: rgba($success, 0.2);
    &:focus {
      box-shadow: $focus-ring-box-shadow, inset 0 0 0 1px $success;
    }
  }

  .danger {
    z-index: 1;
    box-shadow: inset 0 0 0 1px $danger;
    background-color: rgba($danger, 0.2);
    &:focus {
      box-shadow: $focus-ring-box-shadow, inset 0 0 0 1px $danger;
    }
  }
</style>
