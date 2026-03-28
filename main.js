const addAgentButton = document.querySelector("#add-agent");
const modal = document.querySelector(".modal");
const cancel = document.querySelector("#cancel");
const imageButton = document.querySelector(".image-box");
const avatarInput = document.querySelector("#avatar");
let trySubmit = false;
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
// #021526
function validateIdentity(elem) {
  const path = elem.nextElementSibling.querySelector("path");

  if (elem.value.length > 1) {
    elem.style.border = "1px solid rgba(128, 138, 147, 1)";
    elem.nextElementSibling.classList.remove("error");
    path.setAttribute("stroke", "#021526");
    return true;
  }
  elem.style.border = "1px solid rgba(249, 59, 29, 1)";
  elem.nextElementSibling.classList.add("error");
  path.setAttribute("stroke", "rgba(249, 59, 29, 1)");
  return false;
}
function validateEmail(elem) {
  const path = elem.nextElementSibling.querySelector("path");
  if (elem.value.endsWith("@redberry.ge") && !elem.value.includes(" ")) {
    elem.style.border = "1px solid rgba(128, 138, 147, 1)";
    elem.nextElementSibling.classList.remove("error");
    path.setAttribute("stroke", "#021526");
    return true;
  }
  elem.style.border = "1px solid rgba(249, 59, 29, 1)";
  path.setAttribute("stroke", "rgba(249, 59, 29, 1)");
  elem.nextElementSibling.classList.add("error");
  return false;
}

function validatePhone(elem) {
  const path = elem.nextElementSibling.querySelector("path");
  if (/^\5\d{8}$/.test(elem.value)) {
    elem.style.border = "1px solid rgba(128, 138, 147, 1)";
    elem.nextElementSibling.classList.remove("error");
    path.setAttribute("stroke", "#021526");
    return true;
  }
  elem.style.border = "1px solid rgba(249, 59, 29, 1)";
  elem.nextElementSibling.classList.add("error");
  path.setAttribute("stroke", "rgba(249, 59, 29, 1)");
  return false;
}

const addAgent = async (event, form) => {
  if (!trySubmit) {
    trySubmit = true;
  }
  event.preventDefault();
  const name = form.name.value;
  const surname = form.surname.value;
  const email = form.email.value;
  const phone = form.tel.value;
  const avatar = form.avatar.files[0];
  const isNameValid = validateIdentity(form.name);
  const isSurnameValid = validateIdentity(form.surname);
  const isEmailValid = validateEmail(form.email);
  const isPhoneValid = validatePhone(form.tel);
  const avatarValid = avatar instanceof File;
  if (
    !isNameValid ||
    !isSurnameValid ||
    !isEmailValid ||
    !isPhoneValid ||
    !avatarValid
  ) {
    alert("გთხოვთ შეავსოთ ყველა ველი სწორად და ატვირთოთ ფოტო!");
    return;
  }
  const formdata = new FormData();
  formdata.append("name", name);
  formdata.append("surname", surname);
  formdata.append("email", email);
  formdata.append("phone", phone);
  formdata.append("avatar", avatar);
  try {
    await axiosInstance.post("/agents", formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer a163f9f4-dea1-429d-bafc-b7f3ab341ecd",
      },
    });
    alert("აგენტი დაემატა!");
  } catch (error) {
    alert("Error adding agent: " + error.message);
  }
};

imageButton.addEventListener("click", () => {
  avatarInput.click();
});

const checkName = (elem) => {
  if (trySubmit) {
    validateIdentity(elem);
  }
};

const checkSurname = (elem) => {
  if (trySubmit) {
    validateIdentity(elem);
  }
};

const checkEmail = (elem) => {
  if (trySubmit) {
    validateEmail(elem);
  }
};

const checkPhone = (elem) => {
  if (trySubmit) {
    validatePhone(elem);
  }
};

const uploadImageEvent = () => {
  const file = avatarInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const avatarPreview = document.querySelector(".avatar-preview");
      avatarPreview.src = e.target.result;
    };
    reader.readAsDataURL(file);
    const avatarBox = document.querySelector(".avatar-box");
    avatarBox.style.display = "flex";
    imageButton.querySelector("svg").style.display = "none";
  }
};

const removeImage = (event) => {
  avatarInput.value = "";
  const avatarPreview = document.querySelector(".avatar-preview");
  avatarPreview.src = "";
  const avatarBox = document.querySelector(".avatar-box");
  avatarBox.style.display = "none";
  imageButton.querySelector("svg").style.display = "block";
  event.stopPropagation();
};
