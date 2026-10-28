const createBtn = document.querySelector("#create");
const formDiv = document.querySelector(".form");
const closeForm = document.querySelector("#closeForm");

const productDiv = document.querySelector(".products");
const form = document.querySelector("form");

const productsArr = [];
let updateIndex = null;

createBtn.addEventListener("click", () => {
  formDiv.style.display = "flex";
});

closeForm.addEventListener("click", () => {
  formDiv.style.display = "none";
  //form.reset();
});

const ui = () => {
  productDiv.innerHTML = "";
  productsArr.forEach((elem, index) => {
    productDiv.innerHTML += `<div class="product-card">
          <div class="img">
            <img
              src="${elem.image}"
              alt=""
            />
          </div>
          <div class="text">
            <h2>${elem.productName}</h2>
            <p>${elem.description}</p>
            <p>${elem.price}</p>
          </div>

          <div class="bttns">
            <button onclick="updateProduct('${elem.productName}')" id="updt">Update</button>
            <button onclick="deleteProduct('${index}')" id="delt">Delete</button>
          </div>
        </div>`;
  });
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let productName = event.target[1].value.trim();
  let description = event.target[2].value.trim();
  let price = event.target[3].value.trim();
  let image = event.target[4].value;

  if (
    productName === "" ||
    description === "" ||
    price === "" ||
    image === ""
  ) {
    alert("Please fill the form");
    form.reset();
    return;
  }

  let obj = {
    productName,
    description,
    price,
    image,
  };

  if (updateIndex !== null) {
    productsArr[updateIndex] = obj;
    updateIndex = null;
  } else {
    productsArr.push(obj);
  }

  ui();
  form.reset();
  formDiv.style.display = "none";
});

const updateProduct = (name) => {
  formDiv.style.display = "flex";
  let product = productsArr.find((elem) => elem.productName === name);
  updateIndex = productsArr.findIndex((elem) => elem.productName === name);

  form[1].value = product.productName;
  form[2].value = product.description;
  form[3].value = product.price;
  form[4].value = product.image;
};

const deleteProduct = (index) => {
  productsArr.splice(index, 1);
  ui();
}