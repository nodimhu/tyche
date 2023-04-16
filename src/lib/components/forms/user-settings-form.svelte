<script lang="ts">
  import { v4 as uuidv4 } from "uuid";

  import TextInput from "../controls/text-input.svelte";

  export let action = "";
  export let saved = false;
  export let locale = "en-US";
  export let defaultCurrency = "USD";

  let editingLocale = locale;
  let editingDefaultCurrency = defaultCurrency;

  let localeInvalid = false;
  let defaultCurrencyInvalid = false;

  const onChangeLocale = (event: CustomEvent<{ value: string }>) => {
    try {
      Intl.NumberFormat(event.detail.value);
      localeInvalid = false;
    } catch {
      localeInvalid = true;
    }
  };

  const onChangeDefaultCurrency = (event: CustomEvent<{ value: string }>) => {
    try {
      Intl.NumberFormat("en", { style: "currency", currency: event.detail.value });
      defaultCurrencyInvalid = false;
    } catch {
      defaultCurrencyInvalid = true;
    }
  };

  const uniqueId = uuidv4();
</script>

<form class="user-settings-form" method="POST" {action}>
  <label for={`${uniqueId}-locale`}> User locale </label>
  <TextInput
    id={`${uniqueId}-locale`}
    class="form-control mb-3"
    invalid={localeInvalid}
    name="locale"
    bind:value={editingLocale}
    on:blur-change={onChangeLocale}
  />

  <label for={`${uniqueId}-currency`}> Default currency </label>
  <TextInput
    id={`${uniqueId}-currency`}
    class="form-control mb-3"
    invalid={defaultCurrencyInvalid}
    name="defaultCurrency"
    bind:value={editingDefaultCurrency}
    on:blur-change={onChangeDefaultCurrency}
  />

  <button
    class="btn btn-primary"
    type="submit"
    disabled={localeInvalid || defaultCurrencyInvalid}
  >
    Save settings
  </button>

  {#if saved}
    <span class="text-success ms-3"> Settings saved. </span>
  {/if}
</form>
