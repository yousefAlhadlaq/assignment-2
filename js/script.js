console.log("Portfolio loaded");
document.getElementById("themeToggle").addEventListener("click", () => {
  const r = document.documentElement;
  const dark = r.dataset.theme === "dark";
  if (dark) { r.removeAttribute("data-theme"); localStorage.removeItem("theme"); }
  else { r.dataset.theme = "dark"; localStorage.setItem("theme", "dark"); }
});