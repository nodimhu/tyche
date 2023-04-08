<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let id: string | undefined = undefined;
  export let placeholder = "";
  export let name = "";
  export let required = false;
  export let autocomplete: string | null = null;

  export let value = "";

  const dispatch = createEventDispatcher();

  const handleChange = (inputElement: HTMLInputElement) => {
    if (inputElement.value === value) {
      dispatch("blur", { target: inputElement });
      return;
    }

    if (required && !inputElement.value) {
      inputElement.value = value;
      dispatch("blur", { target: inputElement });
      return;
    }

    value = inputElement.value;

    setTimeout(() => dispatch("blur-change", { target: inputElement }));
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

  let inputElement: HTMLInputElement;

  $: inputElement?.setAttribute("value", value);
</script>

<input
  bind:this={inputElement}
  {id}
  {name}
  {placeholder}
  {autocomplete}
  type="text"
  class="form-control"
  on:focus={onFocus}
  on:blur={onBlur}
  on:keydown={onKeyDown}
/>
