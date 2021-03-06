"use strict";
document.querySelectorAll("main").forEach((tab) => {
  const tabHeading = tab.querySelectorAll(".product-tabs .item");
  const tabContent = tab.querySelectorAll(".product-tab");
  let tabName;
  tabHeading.forEach((element) => {
    element.addEventListener("click", () => {
      tabHeading.forEach((item) => {
        item.classList.remove("active");
      });
      element.classList.add("active");
      tabName = element.getAttribute("data-tab-index");
      tabContent.forEach((item) => {
        item.classList.contains(tabName)
          ? item.classList.add("active")
          : item.classList.remove("active");
      });
    });
  });
});
