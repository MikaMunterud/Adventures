export default function addImageInput(images, setImages) {
  const parent = document.querySelector(".adventureImages__input");
  const messageElement = document.querySelector(".imageMessage");
  /*
  const imageName = imageKeys[parent.childElementCount];
  const inputImageClone = document.createElement("input");
  inputImageClone.id = "images";
  inputImageClone.classList.add("adventureImages__input__image");
  inputImageClone.type = "url";
  inputImageClone.placeholder = "Image url only!";
  inputImageClone.onchange = onChangeFunction;
  inputImageClone.name = imageName;
  inputImageClone.value = "";
  inputImageClone.setAttribute("required", true);
*/
  const message = "You cannot have more than five images!";

  if (parent.childNodes.length === 5) {
    messageElement.textContent = message;
    setTimeout(function () {
      messageElement.style.display = "grid";

      setTimeout(function () {
        messageElement.style.opacity = "1";
        setTimeout(function () {
          messageElement.style.opacity = "0";

          setTimeout(function () {
            messageElement.style.display = "none";
          }, 600);
        }, 3000);
      }, 200);
    }, 400);
  } else {
    setImages([...images, ""]);
    // parent.appendChild(inputImageClone);
  }
}
