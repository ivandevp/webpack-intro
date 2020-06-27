import { sum } from "./ops";
// import "./style.css";

console.log(sum(100, 50));

import image from "./image.jpeg";

const img = document.createElement("img");
img.src = image;
img.style.width = "50%";

document.body.appendChild(img);
