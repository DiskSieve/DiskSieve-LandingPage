/**
 * Scroll animations (spec 2.2), progressive enhancement only.
 *
 * - `data-reveal`: the element fades and slides in once when it enters the viewport (CSS in global.css). Delay a
 *   group with the `--reveal-delay` custom property.
 * - `data-count`: a number inside a revealed element counts up from zero to its final value, which is already in the
 *   HTML (no JS, reduced motion and the fallback all show the final value).
 *
 * The hidden state needs `html.js`, which this script sets itself: if it never runs, everything stays visible.
 * Elements already on screen when it starts are shown at once, so nothing blinks.
 */
const COUNT_MS = 1200;

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const countUp = (el: HTMLElement) => {
  const target = el.dataset.count ?? "";
  const end = Number(target);
  if (!Number.isFinite(end)) return;
  const decimals = target.split(".")[1]?.length ?? 0;
  const start = performance.now();
  const frame = (now: number) => {
    const t = Math.min(1, (now - start) / COUNT_MS);
    const eased = 1 - (1 - t) ** 3;
    el.textContent = (end * eased).toFixed(decimals);
    if (t < 1) requestAnimationFrame(frame);
  };
  el.textContent = (0).toFixed(decimals);
  requestAnimationFrame(frame);
};

const show = (el: Element, animate: boolean) => {
  if (!animate) (el as HTMLElement).style.animation = "none";
  el.classList.add("is-visible");
  if (animate) for (const n of el.querySelectorAll<HTMLElement>("[data-count]")) countUp(n);
};

const elements = [...document.querySelectorAll("[data-reveal]")];

if (!reduced && "IntersectionObserver" in window && elements.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        show(entry.target, true);
      }
    },
    { rootMargin: "0px 0px -10% 0px" },
  );

  for (const el of elements) {
    const box = el.getBoundingClientRect();
    if (box.top < window.innerHeight && box.bottom > 0) show(el, false);
    else observer.observe(el);
  }
  document.documentElement.classList.add("js");
}
