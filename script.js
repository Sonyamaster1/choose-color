const cols = document.querySelectorAll(".col");
// меняем цвет по нажатию на пробел
document.addEventListener("keydown", (evt) => {
  evt.preventDefault();
  if (evt.code == "Space") {
    setColors();
  }
});
// меняем иконку кнопки
document.addEventListener("click", (evt) => {
  const type = evt.target.dataset.type;
  if (type == "lock") {
    const node =
      evt.target.tagName.toLowerCase() === "i"
        ? evt.target
        : evt.target.children[0];
    node.classList.toggle("fa-lock-open");
    node.classList.toggle("fa-lock");
  } else if (type === "copy") {
    copyToClick(evt.target.textContent);
  }
});
// генерируем рандомный цвет
function gerenerateRandomColor() {
  const hex = "123456789ABCDEF";
  let color = "";
  for (let i = 0; i < 6; i++) {
    color += hex[Math.floor(Math.random() * hex.length)];
  }
  return "#" + color;
}
// копируем название цвета по клику
function copyToClick(text) {
  return navigator.clipboard.writeText(text);
}
// вся логика изменения цвета
function setColors(isInitial) {
  const colors = isInitial ? getColorsHash() : [];

  cols.forEach((col, index) => {
    const isLocked = col.querySelector("i").classList.contains("fa-lock");
    const text = col.querySelector("h2");
    const button = col.querySelector("button");

    if (isLocked) {
      colors.push(text.textContent);
      return;
    }
    const color = isInitial
      ? colors[index]
        ? colors[index]
        : chroma.random()
      : chroma.random();
    if (!isInitial) {
      colors.push(color);
    }

    text.textContent = color;
    col.style.background = color;
    setTextColor(text, color);
    setTextColor(button, color);
    updateColorsHash(colors);
  });
}
// меняем цвет текста
function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? "black" : "white";
}
// копируем цвет в хэш
function updateColorsHash(colors = []) {
  document.location.hash = colors
    .map((col) => {
      return col.toString().substring(1);
    })
    .join("-");
}
// меняем цвет в хэше
function getColorsHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split("-")
      .map((color) => "#" + color);
  }
  return [];
}
setColors(true);
