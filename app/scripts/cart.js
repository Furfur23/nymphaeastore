console.log("INI DARI KERANJANG");

window.onload = function () {
  populateCartData();
};

function populateCartData() {
  const container = document.getElementById("cart-container");

  let store = {};

  if (window.localStorage.getItem("cart")) {
    store = JSON.parse(window.localStorage.getItem("cart"));
  }

  const keys = Object.keys(store);

  if (keys.length === 0) {
    container.classList.add("justify-center");
    container.classList.add("align-center");
    container.classList.add("flex-row");
    const text = document.createElement("h1");
    text.innerText = "Belum ada barang di keranjang";

    container.appendChild(text);
  } else {
    container.classList.add("flex-col");
    container.classList.add("gap-1");

    for (let i = 0; i < keys.length; i += 1) {
      const itemContainer = document.createElement("div");
      itemContainer.className = "w-full flex-row gap-1 align-center";
      itemContainer.style.padding = "1rem";
      itemContainer.style.backgroundColor = "lightgray";

      const productImage = document.createElement("img");
      productImage.src = store[keys[i]].image;
      productImage.className = "product-image-cart";

      itemContainer.appendChild(productImage);

      const productInfoContainer = document.createElement("div");
      productInfoContainer.className = "flex-col gap-1 w-full";

      const productName = document.createElement("h4");
      productName.innerText = `Nama Produk: ${store[keys[i]].name}`;

      const productPrice = document.createElement("h5");
      productPrice.innerText = `Harga Produk: ${store[keys[i]].price}`;

      productInfoContainer.appendChild(productName);
      productInfoContainer.appendChild(productPrice);

      const productSummary = document.createElement("div");
      productSummary.className = "flex-row gap-1 align-center";
      productSummary.style.minWidth = "200px";
      productSummary.style.textAlign = "right";

      const productPriceSummary = document.createElement("div");
      productPriceSummary.className = "flex-col gap-1";

      const trashButton = document.createElement("span");
      trashButton.innerText = "delete";
      trashButton.className = "material-icons-outlined";
      trashButton.style.cursor = "pointer";
      trashButton.onclick = () => deleteCartItem(keys[i]);

      const quantityProduct = document.createElement("h4");
      quantityProduct.innerText = `${store[keys[i]].quantity} x ${
        store[keys[i]].price
      }`;

      const subtotal = document.createElement("h5");
      subtotal.innerText = `Subtotal: ${Intl.NumberFormat("id-ID", {
        currency: "IDR",
        style: "currency",
      }).format(
        Number(store[keys[i]].quantity) * getPriceAsNumber(store[keys[i]].price)
      )}`;

      productPriceSummary.appendChild(quantityProduct);
      productPriceSummary.appendChild(subtotal);

      productSummary.appendChild(productPriceSummary);
      productSummary.appendChild(trashButton);

      itemContainer.appendChild(productInfoContainer);
      itemContainer.appendChild(productSummary);

      container.appendChild(itemContainer);
    }

    const checkoutToWA = document.createElement("a");
    checkoutToWA.className = "contain-btn";
    checkoutToWA.href = `https://wa.me/+6282131937252?text=${processProductSummary()}`;
    checkoutToWA.innerText = "Checkout via WA";

    console.log(processProductSummary());

    container.appendChild(checkoutToWA);
  }
}

function deleteCartItem(key) {
  if (confirm("Apakah yakin mau dihapus?")) {
    let store = {};

    if (window.localStorage.getItem("cart")) {
      store = JSON.parse(window.localStorage.getItem("cart"));
    }

    delete store[key];

    window.localStorage.setItem("cart", JSON.stringify(store));

    window.location.reload();
  }
}

function processProductSummary() {
  let store = {};

  if (window.localStorage.getItem("cart")) {
    store = JSON.parse(window.localStorage.getItem("cart"));
  }

  const keys = Object.keys(store);

  let summaryText = "Halo, saya mau pesan ini ya\n";

  for (let i = 0; i < keys.length; i += 1) {
    summaryText += `${i + 1}. ${store[keys[i]].name} | Jumlah: ${
      store[keys[i]].quantity
    }\n`;
  }

  summaryText += "Tolong diproses ya gan!";

  return encodeURIComponent(summaryText);
}

function getPriceAsNumber(priceAsString) {
  const priceWithoutRp = priceAsString.split("Rp ");

  return Number(priceWithoutRp[1].split(".").join(""));
}
