import { writable } from "svelte/store";

export const focusStore = writable<{
  lastActiveElement: HTMLElement | null;
  isClicked: boolean;
}>({ lastActiveElement: null, isClicked: false });
