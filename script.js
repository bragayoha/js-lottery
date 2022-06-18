((DOM, win, doc) => {
    'use strict'
  
    function app () {
        const ajax = new XMLHttpRequest()
        
        function getData (endpoint) {
            let data
            
            ajax.onreadystatechange = function () {
                console.log(ajax.status)
                data = JSON.parse(ajax.responseText)
                console.log('este é o data ', data)
            }
            ajax.open('GET', endpoint, true)
            ajax.send()

            return data
        }
        
        async function loadGamesInfo () {
            const res = await getData('./games.json')
            console.log('aqui' ,res)
        }
        
        win.addEventListener('load', function () {
        loadGamesInfo()
      })
    }
  
    app()
  })(window.DOM, window, document)
  