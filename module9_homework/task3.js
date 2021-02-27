

// Task #3
window.addEventListener("load", function(event) {

	const form = document.querySelector('#f_form'); // Получить форму
	const formWarning = form.querySelector('.forma__warning'); // Сообщение с предупреждением
	const requestInput = form.querySelector('#f_number'); // Поле запроса
	const formButton = form.querySelector('.forma__button'); // Кнопка запроса
	const url = new URL('https://picsum.photos/v2/list'); // API
	const xhr = new XMLHttpRequest(); // объект для запросов

	// Данные слайдера по умолчанию
	const sliderInit = {
		slideIndex: 0,
		currentSlideIndex: 0,
		slideArray: [],
	}

	// Объект слайдера
	function Slide (initData, title, size, background, link) {
		this.title = title;
		this.size = size;
		this.background = background;
		this.link = link;
		this.id = "slide" + initData.slideIndex;
		initData.slideIndex ++;
		initData.slideArray.push(this)
	}
	
	// Предыдущий слайд
	function prevSlide(initData){
		var nextSlideIndex;
		if (initData.currentSlideIndex === 0 ) {
			nextSlideIndex = initData.slideArray.length - 1;
		} else {
			nextSlideIndex = initData.currentSlideIndex - 1;
		}	
		
		document.getElementById("slide" + nextSlideIndex).style.left = "-100%";
		document.getElementById("slide" + initData.currentSlideIndex).style.left = 0;
		document.getElementById("slide" + nextSlideIndex).setAttribute("class", "singleSlide slideInLeft");
		document.getElementById("slide" + initData.currentSlideIndex).setAttribute("class", "singleSlide slideOutRight");
		initData.currentSlideIndex = nextSlideIndex;
	}
	
	// Следущий слайд
	function nextSlide(initData){
		var nextSlideIndex;
		if (initData.currentSlideIndex === (initData.slideArray.length - 1) ) {
			nextSlideIndex = 0;
		} else {
			nextSlideIndex = initData.currentSlideIndex + 1;
		}	
	
		document.getElementById("slide" + nextSlideIndex).style.left = "100%";
		document.getElementById("slide" + initData.currentSlideIndex).style.left = 0;
		document.getElementById("slide" + nextSlideIndex).setAttribute("class", "singleSlide slideInRight");
		document.getElementById("slide" + initData.currentSlideIndex).setAttribute("class", "singleSlide slideOutLeft");
		initData.currentSlideIndex = nextSlideIndex;
	}
	
	// Конструктор слайдера
	function buildSlider(initData){
		var myHTML;
	
		const sliderNavigation = document.getElementById("sliderNav")
		sliderNavigation.style.display = "block"
	
		for(var i = 0; i < initData.slideArray.length; i++) {
			myHTML += "<div id='" + initData.slideArray[i].id + 
			"' class='singleSlide' style='background-image:url(" + initData.slideArray[i].background + ");'>" + 
			"<div class='slideOverlay'>" + 
			"<h1>" + initData.slideArray[i].title + "</h1>" +
			"<h4>" + initData.slideArray[i].size + "</h4>" +
			"<a class='slideOverlay__slider-link' href='" + initData.slideArray[i].link + "' target='_blank'>Open Link</a>" +
			"</div>" +
			"</div>";	
		}
	
		if (initData.slideArray.length > 1) {
			console.log(initData.slideArray);
			document.querySelector('#sliderPrev').addEventListener('click', () => {prevSlide(sliderInit)})
			document.querySelector('#sliderNext').addEventListener('click', () => {nextSlide(sliderInit)})
		}
	
		document.getElementById("mySlider").innerHTML = myHTML;
		document.getElementById("slide" + initData.currentSlideIndex).style.left = 0;
	}

	const preBuildSlider = (initData, data) => {
		initData.slideIndex = 0;
		initData.currentSlideIndex = 0;
		initData.slideArray = [];
		for (let item of data) { new Slide(initData, item.author, `${item.width} x ${item.height}`, item.download_url, item.url ) }
	}

	// Проверяем Local Storage при загрузке страницы
	function checkLocalStorage() {
		// Получаем данные по ключу myJSON в localStorage
		const myJSON = localStorage.getItem('myJSON');

		if (myJSON) {
		// Если данные в localStorage есть - просто выводим их
			console.log('localStorage JSON', JSON.parse(myJSON));
			preBuildSlider(sliderInit, JSON.parse(myJSON))
			buildSlider(sliderInit);
		} else {
			
		};
	}

	checkLocalStorage();
	
	const parseResponse = resp => {
		try {
			localStorage.setItem('myJSON', JSON.stringify(resp));
			console.log(resp);
			preBuildSlider(sliderInit, resp)
			buildSlider(sliderInit);
		} catch (error) {
		}
	}

	function useRequest(url, callback) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.onload = function() {
		  if (xhr.status != 200) {
			console.log('Статус ответа: ', xhr.status);
		  } else {
			const result = JSON.parse(xhr.response);
			if (callback) {
			  callback(result);
			}
		  }
		};
		xhr.onerror = function() {
		  console.log('Ошибка! Статус ответа: ', xhr.status);
		};
		xhr.onprogress = function(event) { 
		};
		xhr.send();
	}
	
	requestSubmit = (e) => {
		e.preventDefault();
		url.searchParams.set('limit', requestInput.value);
		useRequest(url, parseResponse)
	}

	const checkInputs = e => {
		const inputVal = e.target.value
		if ((inputVal >= 1 && inputVal <= 10)) {
			formWarning.style.display = 'none'
			formButton.disabled = false;
		} else {
			formWarning.style.display = 'block'
			formWarning.textContent = `Enter valid number`;
			formButton.disabled = true;
		}
	}

	requestInput.addEventListener('change', checkInputs)
	form.addEventListener('submit', requestSubmit);
})