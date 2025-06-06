var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const BASE_URL = "https://dummyjson.com";
const searchInput = document.getElementById("search-input");
const productContainer = document.getElementById("product-container");
export function fetchProduct() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios.get(`${BASE_URL}/products`);
            return response.data.products;
        }
        catch (error) {
            console.error("Fetch error:", error);
            if (productContainer) {
                productContainer.innerHTML = "<p class='text-red-500'>Failed to load products.</p>";
            }
            return [];
        }
    });
}
console.log(fetchProduct());
function renderProductList(products) {
    if (!productContainer)
        return;
    if (products.length === 0) {
        productContainer.innerHTML = `<p class="text-center text-gray-500">No products found.</p>`;
        return;
    }
    productContainer.innerHTML = products
        .map((p) => `
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
let allProducts = [];
function setupSearch() {
    if (!searchInput)
        return;
    searchInput.addEventListener("input", () => {
        const keyword = searchInput.value.toLowerCase();
        const filtered = allProducts.filter(p => p.title.toLowerCase().includes(keyword) ||
            p.description.toLowerCase().includes(keyword) ||
            p.category.toLowerCase().includes(keyword));
        renderProductList(filtered);
    });
}
(function init() {
    return __awaiter(this, void 0, void 0, function* () {
        allProducts = yield fetchProduct();
        renderProductList(allProducts);
        setupSearch();
    });
})();
