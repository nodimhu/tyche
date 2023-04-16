<script lang="ts" context="module">
  export interface BaseInputBaseProps {
    id?: string | undefined;
    placeholder?: string;
    name?: string;
    required?: boolean;
    readonly?: boolean;
    disabled?: boolean;
    invalid?: boolean;
    success?: boolean;
    danger?: boolean;
    style?: string;
    class?: string;
    autocomplete?: string | null;
  }
</script>

<script lang="ts">
  import { createEventDispatcher } from "svelte";

  type T = $$Generic<string | number>;

  interface $$Props extends BaseInputBaseProps {
    value: T | null;
    inputParser: (inputValue: string) => T | null;
    valueEditFormatter: (parsedValue: T | null) => string;
    valueDisplayFormatter: (parsedValue: T | null) => string;
  }

  export let id: string | undefined = undefined;
  export let placeholder = "";
  export let name = "";
  export let required = false;
  export let readonly = false;
  export let disabled = false;
  export let invalid = false;
  export let success = false;
  export let danger = false;
  export let style = "";
  let className = "";
  export { className as class };
  export let autocomplete: string | null = null;

  export let value: T | null;
  export let inputParser: (inputValue: string) => T | null;
  export let valueDisplayFormatter: (parsedValue: T | null) => string;
  export let valueEditFormatter: (parsedValue: T | null) => string;

  const dispatch = createEventDispatcher();

  const handleChange = (inputElement: HTMLInputElement) => {
    const inputValue = inputElement.value;

    if (required && !inputValue) {
      inputElement.value = value ? valueDisplayFormatter(value) : "";
      dispatch("blur", { target: inputElement });
      return;
    }

    const newValue = inputParser(inputElement.value);

    if (newValue === null) {
      // parse error
      inputElement.value = value ? valueDisplayFormatter(value) : "";
      dispatch("blur", { target: inputElement });
      return;
    }

    value = newValue;
    inputElement.value = newValue ? valueDisplayFormatter(newValue) : "";
    dispatch("blur-change", { target: inputElement, value: newValue });
  };

  const onFocus = (event: FocusEvent) => {
    if (event.target) {
      const inputElement = event.target as HTMLInputElement;
      inputElement.value = valueEditFormatter(value);
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
  {style}
  {required}
  {readonly}
  {disabled}
  {placeholder}
  {autocomplete}
  type="text"
  value={valueDisplayFormatter(value)}
  class={`form-control ${className}`}
  class:readonly
  class:danger
  class:success
  class:is-invalid={invalid}
  on:focus={onFocus}
  on:blur={onBlur}
  on:keydown={onKeyDown}
/>

<style lang="scss">
  @import "$lib/styles/variables";

  input {
    &.readonly {
      background-color: lighten($gray-800, 2.5%);
    }

    &.success {
      z-index: 1;
      box-shadow: inset 0 0 0 1px $success;
      background-color: rgba($success, 0.2);
      &:focus {
        box-shadow: $focus-ring-box-shadow, inset 0 0 0 1px $success;
      }
    }

    &.danger {
      z-index: 1;
      box-shadow: inset 0 0 0 1px $danger;
      background-color: rgba($danger, 0.2);
      &:focus {
        box-shadow: $focus-ring-box-shadow, inset 0 0 0 1px $danger;
      }
    }
  }
</style>
