//import  iconClose  from "./icons/icon-close-v2.svg"

/**
 * @param {boolean} isDisplay
 * @param {HTMLElement} element
 * @param {string} type
 * @param {string} message
 */
function toggleToast(isDisplay, element, type, message) {
  const existingToast = document.querySelector(".toast");

  if (existingToast) {
    existingToast.remove();
  }

  const classType = type === "error" ? "toast-error" : "toast-valid";

    const toastElement = document.createElement("div");
    const imgElement = document.createElement("img");
    imgElement.setAttribute("src", "../public/icons/icon-close-v2.svg");
    

    toastElement.classList.add("toast", classType);
    imgElement.classList.add("toast-icon-close");

  if (!isDisplay) {
    toastElement.classList.add("hide-toast");
  }

  toastElement.textContent = message;
    element.appendChild(toastElement);
    toastElement.appendChild(imgElement);
    
    toastElement.addEventListener("click", () => {
        toastElement.remove();
    });
}

export { toggleToast };
