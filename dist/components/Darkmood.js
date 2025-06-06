"use strict";
const toggle = document.getElementById("darkToggle");
toggle === null || toggle === void 0 ? void 0 : toggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
});
