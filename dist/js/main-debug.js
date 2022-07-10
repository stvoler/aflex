if (document.getElementsByClassName("slider").length){
	let swiper = new Swiper(".slider", {
		slideClass: 'slider-item',
    slidesPerView: 1,
		loop: true,
		pagination: {
			el: ".slider-bullets",
			clickable: true,
			bulletClass: 'bullet',
		},
		navigation: {
			nextEl: '.slider .arrow-right',
			prevEl: '.slider .arrow-left',
		},
	});
}

if (document.getElementsByClassName("news-carousel").length){
	let swiper = new Swiper(".news-carousel", {
		slidesPerView: 3,
		spaceBetween: 20,
		slideClass: 'news-item',
		setWrapperSize: true,
		// navigation: {
		// 	nextEl: '.new-fermers .arrow-right',
		// 	prevEl: '.new-fermers .arrow-left',
		// },
		breakpoints: {
			300: {
				slidesPerView: 1,
				spaceBetween: 10,
			},
			540: {
				slidesPerView: 2,
				spaceBetween: 10,
			},
			720: {
				slidesPerView: 3,
				spaceBetween: 10,
			},
			1000: {
				slidesPerView: 3,
				spaceBetween: 15
			},
			1400: {
				slidesPerView: 4,
				spaceBetween: 20
			},
			3200: {
				slidesPerView: 4,
				spaceBetween: 20
			},
		},
	});
}

if (document.getElementsByClassName("reviews-carousel").length){
	let swiper = new Swiper(".reviews-carousel", {
		slideClass: 'reviews-item',
    slidesPerView: 1,
		pagination: {
			el: ".reviews-bullets",
			clickable: true,
			bulletClass: 'bullet',
		},
		navigation: {
			nextEl: '.reviews .arrow-right',
			prevEl: '.reviews .arrow-left',
		},
	});
}

"use strict";
document.querySelectorAll("main").forEach((tab) => {
  const tabHeading = tab.querySelectorAll(".filter .item");
  const tabContent = tab.querySelectorAll(".catalog-main .catalog");
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
