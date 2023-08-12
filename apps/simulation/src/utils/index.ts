export function mount(fn: (node: HTMLElement) => void) {
  const mountNode = document.getElementById("app") ?? document.body;

  fn(mountNode);
}

export function montecarlo() {
  while (true) {
    const r1 = Math.random();
    const p = r1;
    const r2 = Math.random();
    if (r2 < p) {
      return r1;
    }
  }
}
