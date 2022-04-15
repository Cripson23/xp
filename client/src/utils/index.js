export function createElement({tag = 'div', classList = null}) {
  let elem = document.createElement(tag);
  if (classList) {
    elem.classList.add(...classList);
  }
  return elem;
}
