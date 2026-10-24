// Motion tokens shared by Framer Motion animations (mirrors the CSS tokens in globals.css).

export const easeOutQuint = [0.22, 1, 0.36, 1] as const;
export const easeInOutQuint = [0.83, 0, 0.17, 1] as const;

/** Reveal once, a little before the element is fully on screen. */
export const revealViewport = { once: true, margin: "0px 0px -10% 0px" } as const;
