export function createElement({tag = 'div', classList = null}) {
  let elem = document.createElement(tag);
  elem.classList = classList;
  return elem;
}
