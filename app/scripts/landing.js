console.log("HALO DARI LANDING");
function setupCategoryActiveState() {
  const items = document.querySelectorAll('.product-category-item');
  if (!items || items.length === 0) return;

  const container = items[0].parentElement || document;

  items.forEach(i => {
    i.addEventListener('click', (ev) => {
      items.forEach(x => x.classList.remove('active'));
      i.classList.add('active');
    });
  });

  container.addEventListener('mouseleave', () => {
    items.forEach(x => x.classList.remove('active'));
  });

  document.addEventListener('click', (ev) => {
    if (!container.contains(ev.target)) {
      items.forEach(x => x.classList.remove('active'));
    }
  }, true);
}

document.addEventListener('DOMContentLoaded', setupCategoryActiveState);
const onClickBestSellingProduct = (e) => {
  const productPrice = e.getElementsByTagName("span")[0].innerText;
  const productName = e.getElementsByTagName("h4")[0].innerText;
  const productImg = e.getElementsByTagName("img")[0].src;
  const productRating = e.getElementsByClassName(
    "material-icons-outlined"
  ).length;

  const rootDir = window.location.pathname.split("/pages/")[0];

  window.location.href = `${rootDir}/pages/detail.html?price=${productPrice}&name=${productName}&img=${productImg}&rating=${productRating}`;
};

function onProductClick(element) {
    let productItemElement = element;
    for (let i = 0; i < 4; i++) {
      if (!productItemElement) break;
      if (productItemElement.classList && productItemElement.classList.contains('product-item')) break;
      productItemElement = productItemElement.parentElement;
    }
  
  const productName =
    productItemElement.getElementsByTagName("h3")[0].innerText;
  const productPrice =
    productItemElement.getElementsByClassName("price")[0].innerText;
    const productImg = productItemElement.querySelector('img').src;
    const productRating = productItemElement.querySelectorAll('.product-rating .red').length;  
    const parentDirSplitBySlash = window.location.pathname.split("/");
    const pagesIndex = parentDirSplitBySlash.findIndex((dir) => dir === "pages");
    const splitDir = parentDirSplitBySlash.slice(0, pagesIndex + 1);

  splitDir.push("detail.html");

  const finalDir = splitDir.join("/");

  console.log(finalDir);

  const loadingEl = document.createElement('div');
  loadingEl.className = 'loading-overlay';
  loadingEl.innerHTML = '<div class="loading-spinner"></div>';
  document.body.appendChild(loadingEl);

  setTimeout(() => {
    window.location.href = `${finalDir}?name=${productName}&price=${productPrice}&rating=${productRating}&img=${productImg}`;
  }, 500);
}

function showNotification(productName) {
  const notification = document.createElement('div');
  notification.className = 'cart-notification';
  notification.innerHTML = `
    <span class="material-icons-outlined">check_circle</span>
    <div class="notification-content">
      <p>${productName}</p>
      <p>Berhasil ditambahkan ke keranjang!</p>
    </div>
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add('show');
  }, 100);

  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

const addToCart = (element) => {
    let productItemElement = element;
    for (let i = 0; i < 4; i++) {
      if (!productItemElement) break;
      if (productItemElement.classList && productItemElement.classList.contains('product-item')) break;
      productItemElement = productItemElement.parentElement;
    }

  const productPrice = productItemElement.getElementsByClassName("price")[0].innerText;
  const productName = productItemElement.getElementsByTagName("h3")[0].innerText;
  
    const productImgSrc = productItemElement.querySelector('img').src;
  const productImg = productImgSrc.split("/assets/").pop(); 

  const stringCartStore = window.localStorage.getItem("cart");

  let cartStore;

  if (stringCartStore !== null) {
    cartStore = JSON.parse(stringCartStore);
  } else {
    cartStore = {};
  }

  const key = productName.split(" ").join("-").toLowerCase();

  if (cartStore[key]) {
      cartStore[key].quantity += 1;
  } else {
      cartStore[key] = {
          name: productName,
          price: productPrice,
          image: productImgSrc, 
          quantity: 1,
      };
  }

  window.localStorage.setItem("cart", JSON.stringify(cartStore));
  showNotification(productName);

  const rootDir = window.location.pathname.split("/pages/")[0];
    window.location.href = `${rootDir}/pages/keranjang.html`;
    const currentPath = window.location.pathname;
  const keranjangPath = currentPath.includes('/kategori/') ? 
                        '../keranjang.html' : 
                        './keranjang.html';

  const isConfirmed = confirm(
    `Produk "${productName}" telah ditambahkan ke keranjang.\n\nKlik OK untuk melihat keranjang atau Batal untuk lanjut belanja.`
  );

  if (isConfirmed) {
    window.location.href = keranjangPath;
  }
};
