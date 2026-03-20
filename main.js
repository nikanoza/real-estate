const addAgentButton = document.querySelector("#add-agent");
const modal = document.querySelector(".modal");
const cancel = document.querySelector("#cancel");

const openCloseModal = () => {
  modal.classList.toggle("active");
};

addAgentButton.addEventListener("click", openCloseModal);
cancel.addEventListener("click", openCloseModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    openCloseModal();
  }
});
