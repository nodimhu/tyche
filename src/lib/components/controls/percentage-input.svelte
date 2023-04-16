<script lang="ts">
  import BaseInput, { type BaseInputBaseProps } from "./base-input.svelte";

  interface $$Props extends BaseInputBaseProps {
    value: number | null;
  }

  export let value: number | null = null;

  const inputParser = (inputValue: string): number | null => {
    if (!inputValue) {
      return null;
    }

    const num = Number(inputValue);

    if (isNaN(num)) {
      return null;
    }

    return num / 100;
  };

  const valueEditFormatter = (parsedValue: number | null): string => {
    if (parsedValue === null) {
      return "";
    }

    return (parsedValue * 100).toString();
  };

  const valueDisplayFormatter = (parsedValue: number | null): string => {
    if (parsedValue === null) {
      return "";
    }

    return parsedValue * 100 + "%";
  };
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
