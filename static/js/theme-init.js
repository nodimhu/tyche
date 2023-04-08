const storedTheme = window.localStorage.getItem("theme");
if (storedTheme && (storedTheme === "light" || storedTheme === "dark")) {
  document.querySelector("html")?.setAttribute("data-bs-theme", storedTheme);
}
