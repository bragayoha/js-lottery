((DOM, win, doc) => {
'use strict'

    function app () {
        
        return {
			init: function init() {
				this.getFromServer('./games.json', this.getGamesInfo)
				this.initEvents()
			},

			initEvents: function initEvents() {
				
			},

			
            getFromServer: function getFromServer(url, listenerCallback) {
				const ajax = new XMLHttpRequest();

				ajax.open('GET', url, true)
				ajax.send()
				if (listenerCallback) ajax.addEventListener('readystatechange', listenerCallback, false)
			},

            getGamesInfo: function getGamesInfo() {
				if (this.readyState === 4 && this.status === 200) {
					const $companyName = $('[data-js="companyName"]').get()
					const $companyPhone = $('[data-js="companyPhone"]').get()
					const data = JSON.parse(this.responseText)

					$companyName.textContent = data.name
					$companyPhone.textContent = data.phone
				}
			},

            postCarsToServer: function postCarsToServer() {
				if (this.readyState === 4 && this.status === 200)
					app.getFromServer('http://localhost:3000/car', app.getCarsFromServer)
			},

            deleteFromServer: function deleteFromServer(url, content, listenerCallback) {
				const ajax = new XMLHttpRequest()
				ajax.open('DELETE', url)
				ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
				ajax.send(content)

				ajax.addEventListener('readystatechange', listenerCallback, false)
			},
        }

    app()
}})(window.DOM, window, document)
