 //     init: function init() {
		// 		this.getFromServer('./company.JSON', this.getCompanyInfo);
		// 		this.initEvents();
		// 		this.getFromServer('http://localhost:3000/car', this.getCarsFromServer); // get data on page load
		// 	},
		// 	initEvents: function initEvents() {
		// 		$('[data-js="registerCarForm"]').on('submit', this.handleSubmit);
		// 	},
		// 	handleSubmit: function handleSubmit(event) {
		// 		event.preventDefault();
		// 		const fieldValues = `image=${$('[data-js="image"]').get().value}&brandModel=${
		// 			$('[data-js="model"]').get().value
		// 		}&year=${$('[data-js="year"]').get().value}&plate=${$('[data-js="license"]').get().value}&color=${
		// 			$('[data-js="color"]').get().value
		// 		}`;
		// 		app.postToServer('http://localhost:3000/car', fieldValues, app.postCarsToServer);
		// 	},
		// 	create: function createCar(carsList) {
		// 		const $carsTable = $('[data-js="carsTable"]').get();
		// 		$carsTable.innerHTML = '';
		// 		const $fragment = document.createDocumentFragment();
		// 		carsList.forEach((car) => {
		// 			const $tr = document.createElement('tr');
		// 			const $tdImage = document.createElement('td');
		// 			const $image = document.createElement('img');
		// 			const $tdModel = document.createElement('td');
		// 			const $tdYear = document.createElement('td');
		// 			const $tdLicense = document.createElement('td');
		// 			const $tdColor = document.createElement('td');
		// 			const $tdDelete = document.createElement('td');
		// 			const $deleteButton = document.createElement('button');

		// 			$image.src = car.image;
		// 			$tdImage.appendChild($image);
		// 			$tdModel.textContent = car.brandModel;
		// 			$tdYear.textContent = car.year;
		// 			$tdLicense.textContent = car.plate;
		// 			$tdColor.textContent = car.color;

		// 			$deleteButton.textContent = 'x';
		// 			$tdDelete.appendChild($deleteButton);
		// 			$deleteButton.addEventListener('click', () =>
		// 				app.deleteFromServer('http://localhost:3000/car', `plate=${car.plate}`, app.postCarsToServer)
		// 			);

		// 			[$tdImage, $tdModel, $tdYear, $tdLicense, $tdColor, $tdDelete].forEach((content) => $tr.appendChild(content));

		// 			$fragment.appendChild($tr);
		// 		});

		// 		return $carsTable.appendChild($fragment);
		// 	},
		// 	getFromServer: function getFromServer(url, listenerCallback) {
		// 		const ajax = new XMLHttpRequest();

		// 		ajax.open('GET', url, true);
		// 		ajax.send();
		// 		if (listenerCallback) ajax.addEventListener('readystatechange', listenerCallback, false);
		// 	},
		// 	postToServer: function postToServer(url, content, listenerCallback) {
		// 		const ajax = new XMLHttpRequest();
		// 		ajax.open('POST', url);
		// 		ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		// 		ajax.send(content);

		// 		if (listenerCallback) ajax.addEventListener('readystatechange', listenerCallback, false);
		// 	},
		// 	getCompanyInfo: function getCompanyInfo() {
		// 		if (this.readyState === 4 && this.status === 200) {
		// 			const $companyName = $('[data-js="companyName"]').get();
		// 			const $companyPhone = $('[data-js="companyPhone"]').get();
		// 			const data = JSON.parse(this.responseText);

		// 			$companyName.textContent = data.name;
		// 			$companyPhone.textContent = data.phone;
		// 		}
		// 	},
		// 	getCarsFromServer: function getCarsFromServer() {
		// 		if (this.readyState === 4 && this.status === 200) app.createCar(JSON.parse(this.response));
		// 	},
		// 	postCarsToServer: function postCarsToServer() {
		// 		if (this.readyState === 4 && this.status === 200)
		// 			app.getFromServer('http://localhost:3000/car', app.getCarsFromServer);
		// 	},
		// 	deleteFromServer: function deleteFromServer(url, content, listenerCallback) {
		// 		const ajax = new XMLHttpRequest();
		// 		ajax.open('DELETE', url);
		// 		ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		// 		ajax.send(content);

		// 		ajax.addEventListener('readystatechange', listenerCallback, false);
		// 	},
		// };