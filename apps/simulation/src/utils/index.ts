export function mount(fn: (node: HTMLElement) => void) {
  const mountNode = document.getElementById("app") ?? document.body;

  fn(mountNode);
}
