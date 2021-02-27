

// Task #4

const newForm = document.querySelector('#f_form');
const inputWidth = newForm.querySelector('#f_number');
const inputHeight = newForm.querySelector('#f_size');
const formButton = newForm.querySelector('.forma__button'); // Кнопка запроса
const formWarning = newForm.querySelector('.forma__warning'); // Сообщение с предупреждением
const imgHolder = document.querySelector('#mySlider');

const inputValues = {
	input1: 1,
	input2: 1
}

const validateInputs = () => {
	if ((inputValues.input1 >= 100 && inputValues.input2 >= 100) && (inputValues.input1 <= 300 && inputValues.input2 <= 300)) {
		return true
	}
	return false
}

const checkInputs = (e) => {
	const inputValue = e.target.value;
	console.log(e.target.id);

	switch (e.target.id) {
		case 'f_number': {
			inputValues.input1 = inputValue
			break;
		}
		case 'f_size': {
			inputValues.input2 = inputValue
			break;
		}
	}

	if (validateInputs(inputValues)) {
		formWarning.style.display = 'none'
		formButton.disabled = false;
	} else {
		formWarning.style.display = 'block'
		formWarning.textContent = `Одно из чисел вне диапазона от 100 до 300`;
		formButton.disabled = true;
	}
}

// Функция, которая возвращаем fetch
const useFetchRequest = (url) => {
	return fetch(url)
	  .then((response) => {
		console.log('response', response);
		imgHolder.innerHTML = "";
		imgHolder.innerHTML = `<img src=${response.url}></img>`
		return response.json();
	  })
	  .then((json) => { 
		console.log(json);
		return json; 
		})
	  .catch(() => { console.log('error') });
}

const requestSubmit = (e) => {
	e.preventDefault();
	const url = new URL(`https://picsum.photos/${inputValues.input1}/${inputValues.input2}`); // API
	console.log(url);
	useFetchRequest(url)
}

// formButton.addEventListener('click', useFetchRequest);
inputWidth.addEventListener('change', checkInputs);
inputHeight.addEventListener('change', checkInputs);
newForm.addEventListener('submit', requestSubmit);