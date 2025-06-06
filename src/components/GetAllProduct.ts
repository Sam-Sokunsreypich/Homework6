import { Product } from "../type";

const BASE_URL = "https://dummyjson.com";
declare const axios: any; 

const searchInput = document.getElementById("search-input") as HTMLInputElement;
    const productContainer = document.getElementById("product-container");



// export async function fetchProduct(): Promise<Product[]> {
//   try {
//     const response = await axios.get(`${BASE_URL}/products`);
//     const products = response.data.products;
 
//     if (productContainer) {
//       productContainer.innerHTML = products
//         .map((p:Product) =>
//           `<a href="/src/pages/productDetail.html?id=${p.id}" class="relative block rounded-tr-3xl border border-gray-100">
//   <span
//     class="absolute -top-px -right-px rounded-tr-3xl rounded-bl-3xl bg-gradient-to-r from-purple-400 to-pink-400 px-5 py-3 font-medium tracking-widest text-white uppercase"
//   >
//    Save ${p.discountPercentage}%
//   </span>

//   <img
//     src="${p.thumbnail}"
//     alt="${p.title}"
//     class="h-80 w-full rounded-tr-3xl object-cover"
//   />

//   <div class="p-4 text-center">
//     <strong class="text-xl font-medium text-gray-900 line-clamp-1"> ${p.title} </strong>

//     <div class="flex px-1 py-1 justify-between">
//     <p class="font-bold text-lg text-pretty">Price: ${p.price} $</p>
//     <p class="text-pretty">${p.category}</p>
//     </div>

//     <p class="mt-2 text-pretty line-clamp-2 text-gray-700">
// ${p.description} </p>

//     <span
//       class="mt-4 block rounded-md border border-indigo-900 bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3 text-sm font-medium tracking-widest text-white uppercase transition-colors hover:bg-white hover:text-indigo-900"
//     >
//       Add to card
//     </span>
//   </div>
// </a>`
//         )
//         .join('');
//     }

//     return products;
//   } catch (error) {
//     console.error("Fetch error:", error);

//     const productContainer = document.getElementById("product-container");
//     if (productContainer) {
//       productContainer.innerHTML = "<p class='text-red-500'>Failed to load products.</p>";
//     }

//     return [];
//   }
// }
export async function fetchProduct(): Promise<Product[]> {
  try {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data.products;
  } catch (error) {
    console.error("Fetch error:", error);
    if (productContainer) {
      productContainer.innerHTML = "<p class='text-red-500'>Failed to load products.</p>";
    }
    return [];
  }
}


console.log(fetchProduct())

function renderProductList(products: Product[]) {
  if (!productContainer) return;

  if (products.length === 0) {
    productContainer.innerHTML = `<p class="text-center text-gray-500">No products found.</p>`;
    return;
  }

  productContainer.innerHTML = products
    .map((p: Product) => `
      <a href="/src/pages/productDetail.html?id=${p.id}" class="relative block rounded-tr-3xl border border-gray-100">
        <span class="absolute -top-px -right-px rounded-tr-3xl rounded-bl-3xl bg-gradient-to-r from-purple-400 to-pink-400 px-5 py-3 font-medium tracking-widest text-white uppercase">
          Save ${p.discountPercentage}%
        </span>

        <img src="${p.thumbnail}" alt="${p.title}" class="h-80 w-full rounded-tr-3xl object-cover" />

        <div class="p-4 text-center">
          <strong class="text-xl font-medium text-gray-900 line-clamp-1">${p.title}</strong>

          <div class="flex px-1 py-1 justify-between">
            <p class="font-bold text-lg text-pretty">Price: ${p.price} $</p>
            <p class="text-pretty">${p.category}</p>
          </div>

          <p class="mt-2 text-pretty line-clamp-2 text-gray-700">${p.description}</p>

          <span class="mt-4 block rounded-md border border-indigo-900 bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3 text-sm font-medium tracking-widest text-white uppercase transition-colors hover:bg-white hover:text-indigo-900">
            Add to cart
          </span>
        </div>
      </a>
    `).join('');
}



 let allProducts: Product[] = [];

function setupSearch() {
  if (!searchInput) return;

  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();

    const filtered = allProducts.filter(p =>
      p.title.toLowerCase().includes(keyword) ||
      p.description.toLowerCase().includes(keyword) ||
      p.category.toLowerCase().includes(keyword)
    );

    renderProductList(filtered);
  });
}
(async function init() {
  allProducts = await fetchProduct();
  renderProductList(allProducts); // show all products initially
  setupSearch();
})();