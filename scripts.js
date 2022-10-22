const cols = document.querySelectorAll(".col");

function setRandomColors(isInitial = false) {
  const colors = isInitial ? getColorsFromHash() : [];
  cols.forEach((item, index) => {
    const isLocked = item.querySelector("i").classList.contains("fa-lock");
    const colText = item.querySelector("h2");

    if (isLocked) {
      colors.push(colText.textContent);
      return;
    }

    const colBtn = item.querySelector("button");

    const color = isInitial
      ? colors[index]
        ? colors[index]
        : chroma.random()
      : chroma.random();
    if (!isInitial) {
      colors.push(color);
    }

    item.style.background = color;
    colText.textContent = color;

    setTextColor(colText, color);
    setTextColor(colBtn, color);
  });
  updateColorsHash(colors);
}

function setTextColor(text, color) {
  text.style.color = chroma(color).luminance() > 0.5 ? "black" : "white";
}

function copytoClickboard(text) {
  return navigator.clipboard.writeText(text);
}

function updateColorsHash(colors = []) {
  document.location.hash = colors
    .map((item) => {
      return item.toString().substring(1);
    })
    .join("-");
}

function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split("-")
      .map((item) => "#" + item);
  }
  return [];
}

document.addEventListener("keydown", (key) => {
  key.preventDefault();
  if (key.code.toLowerCase() === "space") {
    setRandomColors();
  }
});

document.addEventListener("click", (event) => {
  const type = event.target.dataset.type;

  if (type === "lock") {
    const node =
      event.target.tagName.toLowerCase() === "i"
        ? event.target
        : event.target.children[0];

    node.classList.toggle("fa-lock-open");
    node.classList.toggle("fa-lock");
  } else if (type === "copy") {
    copytoClickboard(event.target.textContent);
  }
});

setRandomColors(true);
