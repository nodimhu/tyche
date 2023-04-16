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
  export let style = "";
  let className = "";
  export { className as class };
  export let autocomplete: string | null = null;

  export let value: number | null = 0;

  export let currency = "USD";
  export let locale = "en-US";

  const dispatch = createEventDispatcher();

  const displayNumeric = (inputElement: HTMLInputElement) => {
    inputElement.value = value !== null ? value.toString() : "";
  };

  const displayFormatted = (inputElement: HTMLInputElement) => {
    if (value !== null) {
      inputElement.value = Intl.NumberFormat(locale, {
        style: "currency",
        currency,
      }).format(value);
      return;
    }

    inputElement.value = "";
  };

  const parseInput = (inputElement: HTMLInputElement): number | null => {
    const parsedInput = Number(inputElement.value);

    if (isNaN(parsedInput)) {
      return null;
    }

    return parsedInput;
  };

  const handleChange = (inputElement: HTMLInputElement) => {
    const newValue = parseInput(inputElement);

    if (newValue === value) {
      displayFormatted(inputElement);
      dispatch("blur", { target: inputElement });
      return;
    }

    if (required && newValue === null) {
      inputElement.value = value !== null ? value.toString() : "";
      displayFormatted(inputElement);
      dispatch("blur", { target: inputElement });
      return;
    }

    inputElement.value = newValue ? newValue.toString() : "";
    displayFormatted(inputElement);
    dispatch("blur-change", { target: inputElement, value: newValue });
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
</script>

<input
  {id}
  {name}
  {style}
  value={value !== null
    ? Intl.NumberFormat(locale, {
        style: "currency",
        currency,
      }).format(value)
    : ""}
  {required}
  {readonly}
  {disabled}
  {placeholder}
  {autocomplete}
  type="text"
  class={`tyui-control ${className} form-control`}
  class:readonly
  class:danger
  class:success
  on:focus={onFocus}
  on:blur={onBlur}
  on:keydown={onKeyDown}
/>
