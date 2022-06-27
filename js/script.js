((DOM, win, doc) => {
    'use strict'
    
        function app () {

            let gamesInfo = null
            
            function getData (endpoint) {
                return new Promise((resolve, reject) => {
                    const ajax = new XMLHttpRequest()
                    ajax.open('GET', endpoint)

                    ajax.onload = function () {
                        if(this.status >= 200 && this.status <= 300){
                            resolve(ajax.response)
                        }
                        else {
                            reject({
                                status: this.status,
                                statusText: this.statusText
                            })
                        }
                    }
                    ajax.send()
                })
            }
            
            async function loadGamesInfo () {
                const response = await getData('../games.json')
                gamesInfo = JSON.parse(response)
                console.log(gamesInfo)
            }

            function createGameModeButton (gamesInfo) {
                
            }

            win.addEventListener('load', function(){
                loadGamesInfo()
                createGameModeButton()
            })

        }
        app()
    })(window.DOM, window, document)
    