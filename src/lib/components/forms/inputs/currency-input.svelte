<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let id: string | undefined = undefined;
  export let placeholder = "";
  export let name = "";
  export let autocomplete: string | null = null;

  export let value = 0;

  export let currency = "USD";
  export let locale = "en-US";

  const dispatch = createEventDispatcher();

  const displayNumeric = (inputElement: HTMLInputElement) => {
    inputElement.value = value.toString();
  };

  const displayFormatted = (inputElement: HTMLInputElement) => {
    inputElement.value = Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(value);
  };

  const parseInput = (inputElement: HTMLInputElement): number | null => {
    const parsedInput = Number(inputElement.value);

    if (isNaN(parsedInput)) {
      return null;
    }

    return parsedInput;
  };

  const handleChange = (inputElement: HTMLInputElement) => {
    const parsedInput = parseInput(inputElement);

    if (parsedInput === null || parsedInput === value) {
      displayFormatted(inputElement);
      dispatch("blur", { target: inputElement });
      return;
    }

    value = parsedInput;

    displayFormatted(inputElement);
    setTimeout(() => dispatch("blur-change", { target: inputElement }));
  };

  const onFocus = (event: FocusEvent) => {
    if (event.target) {
      const inputElement = event.target as HTMLInputElement;
      displayNumeric(inputElement);
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
      (event.target as HTMLInputElement).blur();
    }
  };

  let inputElement: HTMLInputElement;

  $: inputElement?.setAttribute(
    "value",
    Intl.NumberFormat(locale, { style: "currency", currency }).format(value),
  );
</script>

<input type="hidden" {name} {value} />
<input
  bind:this={inputElement}
  {id}
  {placeholder}
  {autocomplete}
  type="text"
  class="form-control"
  on:focus={onFocus}
  on:blur={onBlur}
  on:keydown={onKeyDown}
/>
