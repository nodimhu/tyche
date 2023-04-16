<script lang="ts">
  import BaseInput, { type BaseInputBaseProps } from "./base-input.svelte";

  interface $$Props extends BaseInputBaseProps {
    value: number | null;
    currency: string;
    locale: string;
  }

  export let value: number | null = null;
  export let currency = "USD";
  export let locale = "en-US";

  const inputParser = (inputValue: string): number | null => {
    const num = Number(inputValue);

    if (!isNaN(num)) {
      return num;
    }

    return null;
  };

  const valueEditFormatter = (parsedValue: number | null): string => {
    if (parsedValue === null) {
      return "";
    }

    return parsedValue.toString();
  };

  const valueDisplayFormatter = (parsedValue: number | null): string => {
    if (parsedValue === null) {
      return "";
    }

    return Intl.NumberFormat(locale, { style: "currency", currency }).format(
      parsedValue,
    );
  };
</script>

<BaseInput
  {...Object.fromEntries(
    Object.entries($$props).filter(
      ([propName]) => propName !== "locale" && propName !== "currency",
    ),
  )}
  bind:value
  {inputParser}
  {valueEditFormatter}
  {valueDisplayFormatter}
  on:blur
  on:blur-change
  on:focus
/>
