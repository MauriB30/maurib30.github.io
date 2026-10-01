// Valor continuo en el mundo: 0 cerrada, 1 recogida en los extremos.
export function createCurtainMotion(open = true) {
  let value = open ? 1 : 0;
  let target = value;
  let from = value;
  let elapsed = 0;
  const duration = 0.6;

  return {
    get value() {
      return value;
    },
    setTarget(open: boolean, immediate = false) {
      const next = open ? 1 : 0;
      if (next !== target) {
        from = value;
        target = next;
        elapsed = 0;
      }
      if (immediate) {
        value = from = target;
        elapsed = duration;
      }
    },
    advance(delta: number) {
      if (value === target) return;
      elapsed = Math.min(duration, elapsed + Math.max(0, delta));
      const progress = elapsed / duration;
      const eased = progress * progress * (3 - 2 * progress);
      value = elapsed === duration ? target : from + (target - from) * eased;
    },
    finish() {
      value = from = target;
      elapsed = duration;
    },
  };
}
