// Live demo notice (spec 2.9), copied to dist/demo/notice.js by scripts/demo.mjs. Below 1024px the app's desktop
// layout is cramped, so show a dismissible bar pointing to the screenshots. Styles go through CSSOM, which a strict
// CSP without 'unsafe-inline' still allows.
(() => {
  const KEY = "disksieve-demo-notice";
  try {
    if (sessionStorage.getItem(KEY)) return;
  } catch {
    /* storage blocked: show the notice */
  }
  if (!window.matchMedia("(max-width: 1023.98px)").matches) return;

  const css = (el, styles) => Object.assign(el.style, styles);

  const bar = document.createElement("aside");
  bar.setAttribute("aria-label", "Demo notice");
  css(bar, {
    position: "fixed",
    left: "12px",
    right: "12px",
    bottom: "12px",
    zIndex: "2147483647",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 12px 12px 16px",
    background: "#121514",
    border: "1px solid #1f2422",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgb(0 0 0 / 0.5)",
    color: "#e8ebe9",
    font: "14px/1.45 system-ui, sans-serif",
  });

  const text = document.createElement("p");
  css(text, { margin: "0", flex: "1" });
  text.append("DiskSieve is a desktop app, so this demo works best on a larger screen. ");
  const link = document.createElement("a");
  link.href = "/#features";
  link.textContent = "See the screenshots";
  css(link, { color: "#22c55e", textDecoration: "underline", textUnderlineOffset: "3px" });
  text.append(link, ".");

  const close = document.createElement("button");
  close.type = "button";
  close.setAttribute("aria-label", "Dismiss");
  close.textContent = "×";
  css(close, {
    flex: "none",
    width: "32px",
    height: "32px",
    border: "1px solid #1f2422",
    borderRadius: "8px",
    background: "transparent",
    color: "inherit",
    font: "20px/1 system-ui, sans-serif",
    cursor: "pointer",
  });
  close.addEventListener("click", () => {
    bar.remove();
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
  });

  bar.append(text, close);
  document.body.append(bar);
})();
