((DOM, win, doc) => {
'use strict'

    function app () {
        
        const ajax = new XMLHttpRequest()
        let gamesInfo
        let divGameMode = doc.getElementById('game-mode-button')
        
        function getData (endpoint) {
            
            ajax.responseType = 'json'
            ajax.onreadystatechange = function () {
                if(ajax.readyState === 4 && ajax.status === 200)
                gamesInfo = ajax.response
                console.log(gamesInfo)
            }
            ajax.open('GET', endpoint)
            ajax.send()
            
        }
        
        function loadGamesInfo () {
            getData('./games.json')
        }

        
        function gameModeButton (data) {
            console.log(data)
        }
        
        win.addEventListener('load', function () {
        loadGamesInfo()
        gameModeButton(ajax.response)
        })
    }

    app()
})(window.DOM, window, document)
