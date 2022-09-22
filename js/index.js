const canvas = document.querySelector("canvas"),
  cxt = canvas.getContext("2d"),
  toolBtns = document.querySelectorAll(".tool"),
  fillColor = document.querySelector("#fill-color");
sizeSlider = document.querySelector("#size-slider");
colorBtns = document.querySelectorAll(".color .option");
colorPicker = document.querySelector("#color-picker");
clearCanvas = document.querySelector(".clear-canvas");
saveImage = document.querySelector(".save-img");

const setCanvasBackground = () => {     /** meshfahem el Func() */
  cxt.fillStyle = "#fff";
  cxt.fillRect(0, 0, canvas.width, canvas.height);
  cxt.fillStyle = selectedColor;
};

let prevMouseX, prevMouseY, snapShot;
(isDrawing = false),
  (bruchWidth = 5),
  (selectedTool = "bruch"),
  (selectedColor = "#000");

window.addEventListener("load", () => {
  canvas.height = canvas.offsetHeight;
  canvas.width = canvas.offsetWidth;
  setCanvasBackground();
  console.log("suiiii");
});

const startDraw = (e) => {
  isDrawing = true;
  prevMouseX = e.offsetX;
  prevMouseY = e.offsetY;
  cxt.beginPath();
  cxt.lineWidth = bruchWidth;
  cxt.strokeStyle = selectedColor;
  cxt.fillStyle = selectedColor;
  snapShot = cxt.getImageData(0, 0, canvas.width, canvas.height);
};

const drawRect = (e) => {
  if (fillColor.checked) {
    return cxt.fillRect(
      e.offsetX,
      e.offsetY,
      prevMouseX - e.offsetX,
      prevMouseY - e.offsetY
    );
  }
  cxt.strokeRect(
    e.offsetX,
    e.offsetY,
    prevMouseX - e.offsetX,
    prevMouseY - e.offsetY
  );
};

const drawCircle = (e) => {
  cxt.beginPath();
  let raduis = Math.sqrt(
    Math.pow(prevMouseX - e.offsetX, 2) + Math.pow(prevMouseY - e.offsetY, 2)
  );

  cxt.arc(e.offsetX, e.offsetY, raduis, 0, 2 * Math.PI);
  fillColor.checked ? cxt.fill() : cxt.stroke();
};

const drawTriangle = (e) => {
  cxt.beginPath();
  cxt.moveTo(prevMouseX, prevMouseY);
  cxt.lineTo(e.offsetX, e.offsetY);
  cxt.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);
  cxt.closePath();
  fillColor.checked ? cxt.fill() : cxt.stroke();
};

const drawing = (e) => {
  if (!isDrawing) return;
  cxt.putImageData(snapShot, 0, 0);
  if (selectedTool === "bruch" || selectedTool === "eraser") {
    cxt.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedTool;
    cxt.lineTo(e.offsetX, e.offsetY); // creating line according to the mouse pointer
    cxt.stroke(); // drawing line with color
  } else if (selectedTool === "rectangle") {
    drawRect(e);
  } else if (selectedTool === "circle") {
    drawCircle(e);
  } else if (selectedTool === "triangle") {
    drawTriangle(e);
  }
};

toolBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".options .active").classList.remove("active");
    btn.classList.add("active");
    selectedTool = btn.id;
    console.log(selectedTool);
  });
});

sizeSlider.addEventListener("change", () => {
  bruchWidth = sizeSlider.value;
});

colorBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".options .selected").classList.remove("selected");
    btn.classList.add("selected");
    selectedColor = window
      .getComputedStyle(btn)
      .getPropertyValue("background-color");
  });
});

colorPicker.addEventListener("change", () => {
  colorPicker.parentElement.style.background = colorPicker.value;
  colorPicker.parentElement.click(); /** Gededa :  color picker meshfahem   0 */
});

clearCanvas.addEventListener("click", () => {
  cxt.clearRect(0, 0, canvas.width, canvas.height);
  setCanvasBackground();
});

saveImage.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = `${Date.now()}.jpg`;
  link.href = canvas.toDataURL(); /** meshfahem -1 0 1 */
  link.click();
});

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", () => (isDrawing = false));
