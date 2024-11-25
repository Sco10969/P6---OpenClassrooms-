// utils/dom-utils.js
export function buildElement({ tag, class: className, style, attrs, text, children = [], setup }) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (style) Object.assign(element.style, style);
    if (attrs) Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
    if (text) element.textContent = text;
    if (children) children.forEach(child => element.appendChild(buildElement(child)));
    if (setup) setup(element);
    return element;
}