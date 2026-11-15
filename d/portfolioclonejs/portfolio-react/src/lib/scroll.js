export function releaseDocumentScroll() {
  if (typeof document === "undefined") return;
  const html = document.documentElement;
  const body = document.body;
  html.classList.remove("route-transition-lock");
  body.classList.remove("route-transition-lock");
  html.style.removeProperty("overflow");
  html.style.removeProperty("overflow-y");
  body.style.removeProperty("overflow");
  body.style.removeProperty("overflow-y");
  body.style.removeProperty("touch-action");
}
