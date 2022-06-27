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
                return gamesInfo
                
            }

            async function insertGameModeButton () {
                gamesInfo = await loadGamesInfo()
                const games = gamesInfo.types
                console.log(games)

                for (let i = 0; i < games.length; i++){

                    const input = doc.createElement('input')
                    input.setAttribute('type', 'radio')
                    input.setAttribute('class', 'btn-check')
                    input.setAttribute('name', 'options-outlined')
                    input.setAttribute('id', `${games[i].type}-outlined`)
                    input.setAttribute('autocomplete', 'off')

                    const label = doc.createElement('label')
                    label.setAttribute('class', 'g-b btn btn-outline me-4')
                    
                    label.setAttribute('style', 
                    `--bs-btn-color:${games[i].color};
                    --bs-btn-border-color:${games[i].color};
                    --bs-btn-hover-color:#FFFFFF;
                    --bs-btn-hover-bg:${games[i].color};
                    --bs-btn-active-color:#fff;
                    --bs-btn-active-bg:${games[i].color};
                    --bs-btn-active-border-color:${games[i].color};`)

                    label.setAttribute('for', input.id)
                    label.innerHTML = games[i].type
                    doc.getElementById('game-mode-button').appendChild(input)
                    doc.getElementById('game-mode-button').appendChild(label)
                }
            }

            function a( ){

            }

            win.addEventListener('load', function(){
                loadGamesInfo()
                insertGameModeButton()
            })

        }
        app()
    })(window.DOM, window, document)
    