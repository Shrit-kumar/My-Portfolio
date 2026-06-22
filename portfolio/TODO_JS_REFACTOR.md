# JS Refactor TODO (script.js)

- [ ] Remove fake contact form submit logic (setTimeout + “Thanks!...”) and keep only EmailJS submission.
- [ ] Keep only required character counter logic.
- [ ] Make EmailJS init safe: `if (window.emailjs) ...`.
- [ ] Prevent null errors: wrap submit listener with `if (contactForm)`.
- [ ] Safe charCount reset: check element exists.
- [ ] Improve profile image fallback: set `style.display='none'` (don’t remove from DOM).
- [ ] Replace stat counter animation with optimized version (increment ceil(target/40), 20ms interval, prefersReducedMotion).
- [ ] Debounce resize for particles (150ms).
- [ ] Disable particles on small devices (window.innerWidth < 768 -> return).
- [ ] Dynamic footer year at bottom.
- [ ] Improve email validation regex.
- [ ] Add minimum message length validation (>=10 chars) and add `.has-error`.
- [ ] Additional production hardening: duplicate listeners, unused vars, memory leaks, performance bottlenecks, accessibility/null checks.
- [ ] Ensure script.js passes syntax checks and no console errors.

