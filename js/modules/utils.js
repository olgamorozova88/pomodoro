const getValue = n => n < 10 ? `0${n}` : n;

const createElement = (tagName, className, content, hasAriaLabel) => {
  const element = document.createElement(tagName);
  element.classList.add(className);
  if (hasAriaLabel) {
    element.ariaLabel = content;
  } else if (content) {
    element.textContent = content;
  }
  return element;
}

export { getValue, createElement}