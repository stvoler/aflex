const catalogMenuItem = document.querySelectorAll('.catalog-menu .item');
catalogMenuItem.forEach(el => {
	el.addEventListener('click', () => {
		el.classList.toggle('active');
	})
})

if (document.getElementsByClassName("catalog-fermer").length){
	const fermerCarousel = document.querySelectorAll('.catalog.is-carousel');
	fermerCarousel.forEach(n => {
		let swiper = new Swiper(n, {
			slidesPerView: 1,
			spaceBetween: 20,
			slideClass: 'catalog-item',
			setWrapperSize: true,
			navigation: {
				nextEl: '.catalog-fermer .arrow-right',
				prevEl: '.catalog-fermer .arrow-left',
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 15,
				},
				450: {
					slidesPerView: 2,
					spaceBetween: 18,
				},
				630: {
					slidesPerView: 3,
					spaceBetween: 18,
				},
				1000: {
					slidesPerView: 4,
					spaceBetween: 20
				},
				1800: {
					slidesPerView: 4,
					spaceBetween: 20
				},
				3200: {
					slidesPerView: 5,
					spaceBetween: 20
				},
			},
		});
	})
}