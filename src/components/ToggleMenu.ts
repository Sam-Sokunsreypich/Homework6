const menuBtn = document.getElementById("menuBtn") as HTMLButtonElement;
const navLinks = document.getElementById("navLinks") as HTMLElement;

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("hidden");
});
