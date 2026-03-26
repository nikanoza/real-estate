const addAgentButton = document.querySelector("#add-agent");
const modal = document.querySelector(".modal");
const cancel = document.querySelector("#cancel");
const imageButton = document.querySelector(".image-box");
const avatarInput = document.querySelector("#avatar");
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

const addAgent = async (event, form) => {
  event.preventDefault();
  // a163f9f4-dea1-429d-bafc-b7f3ab341ecd
  const name = form.name.value;
  const surname = form.surname.value;
  const email = form.email.value;
  const phone = form.tel.value;
  const avatar = form.avatar.files[0];
  const formdata = new FormData();
  formdata.append("name", name);
  formdata.append("surname", surname);
  formdata.append("email", email);
  formdata.append("phone", phone);
  formdata.append("avatar", avatar);
  try {
    await axios.post(
      "https://api.real-estate-manager.redberryinternship.ge/api/agents",
      formdata,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          accept: "application/json",
          Authorization: "Bearer a163f9f4-dea1-429d-bafc-b7f3ab341ecd",
        },
      },
    );
    alert("აგენტი დაემატა!");
  } catch (error) {
    alert("Error adding agent: " + error.message);
  }
};

imageButton.addEventListener("click", () => {
  avatarInput.click();
});
