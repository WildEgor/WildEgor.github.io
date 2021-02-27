

//// Task #5
const form3 = document.querySelector('#f_form')
const errorE5 = form3.querySelector('.forma__warning'); // Сообщение с предупреждением
const imgPag3 = document.querySelector('#mySlider');

const data = localStorage.getItem('localData');
                                  
showImgs(JSON.parse(data));

form3.addEventListener('submit', (event) => {
	event.preventDefault();

	errorE5.textContent = '';
	imgPag3.innerHTML = '';

	let inputPage = form3.elements['f_number'].value
    let inputLimit = form3.elements['f_size'].value

    if ((inputPage < 1 || inputPage > 10) &&
      (inputLimit < 1 || inputLimit > 10)) {
        let error = 'Номер страницы и лимит вне диапазона от 1 до 10'
		errorE5.textContent = error
	} else if (inputPage < 1 || inputPage > 10) {
		let error = 'Номер страницы вне диапазона от 1 до 10'
		errorE5.textContent = error
	} else if (inputLimit < 1 || inputLimit > 10) {
		let error = 'Лимит вне диапазона от 1 до 10'
		errorE5.textContent = error
	} else {
        fetch(`https://picsum.photos/v2/list?page=${inputPage}&limit=${inputLimit}`)
			.then((response) => {
				return response.json()
			})
			.then((data) => {
				console.log(data)
				localStorage.setItem('localData', JSON.stringify(data))
				showImgs(data)
			})
			.catch((e) => {
				console.log('Ошибка запроса', e)
			})
    }
})
  
function showImgs(data) {
    if (data) {
		imgPag3.style.overflow = 'scroll';
        data.forEach((obj) => {
            let img = document.createElement('img')
            img.setAttribute('src', obj.download_url)
            img.setAttribute('width', '500px')
            imgPag3.appendChild(img)
        })
    }
}