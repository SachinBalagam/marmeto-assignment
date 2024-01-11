const productContainer = document.getElementById("container");

const searchInput = document.getElementById("search-input");
const gridViewButton = document.getElementById("grid-view");
const listViewButton = document.getElementById("list-view");

let products = [];

// data fetch from the API
async function fetchProducts() {
  try {
    const response = await fetch(
      "https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093"
    );
    const data = await response.json();
    products = data.data;

    displayProducts(products);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// displaying products in grid or list view
function displayProducts(filterProducts) {
  filterProducts.forEach((product) => {
    let display = `<div class="card">
        <div class="icon">
          <p class='newTag'>${product.product_badge}</p>
          <img src="${product.product_image}" alt="Image is not Fetching from URL">
        </div>
        <div class="card-body">
          <h2 class="title">${product.product_title}</h2>
          <ul>
            <li class='item-size'>${product.product_variants[0].v1}</li>
            <li class='item-size'>${product.product_variants[1].v2}</li>
            <li class='item-size'>${product.product_variants[2].v3}</li>
          </ul>
        </div>
		  </div>`;

    productContainer.innerHTML += display;
  });
}

searchInput.addEventListener("input", () => {
  const searchKey = searchInput.value.trim().toLowerCase();
  console.log(searchKey);

  // Iterate and update color based on searchKey
  const variantElements = productContainer.querySelectorAll(".item-size");

  variantElements.forEach((variantElement) => {
    const variantText = variantElement.textContent.toLowerCase().trim();
    if (searchKey && variantText.includes(searchKey)) {
      variantElement.style.backgroundColor = "rgb(214, 252, 100)";
    } else {
      variantElement.style.backgroundColor = ""; // Reset color if it doesn't match
    }
  });
});

gridViewButton.addEventListener("click", () => {
  productContainer.classList.add("gridView");
  productContainer.classList.remove("listView");
});

listViewButton.addEventListener("click", () => {
  productContainer.classList.remove("gridView");
  productContainer.classList.add("listView");
});

fetchProducts();
