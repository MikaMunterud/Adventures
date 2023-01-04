export default function removeImageInput(images, setImages) {
  const parent = document.querySelector(".adventureImages__input");
  const messageElement = document.querySelector(".imageMessage");
  const message = "You must have at least one image!";

  if (parent.childNodes.length === 1) {
    messageElement.textContent = message;
    setTimeout(function () {
      messageElement.style.display = "flex";

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
    // parent.lastChild.remove();
    setImages(images.slice(0, images.length - 1));
  }
}
