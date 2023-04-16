<script lang="ts">
  import BaseInput, { type BaseInputBaseProps } from "./base-input.svelte";

  interface $$Props extends BaseInputBaseProps {
    value: string;
  }

  export let value = "";

  const inputParser = (inputValue: string): string => inputValue;

  const valueEditFormatter = (parsedValue: string | null): string => parsedValue ?? "";
  const valueDisplayFormatter = (parsedValue: string | null): string =>
    parsedValue ?? "";
</script>

<BaseInput
  {...$$props}
  bind:value
  {inputParser}
  {valueEditFormatter}
  {valueDisplayFormatter}
  on:blur
  on:blur-change
  on:focus
/>
