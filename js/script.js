((DOM, win, doc) => {
    'use strict'
    
        function app () {

            let gamesInfo
            
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
                    input.setAttribute('id', `${games[i].type}`)
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

                    label.addEventListener('click', function(){
                        clickGameModeButton(input.id)
                    })
                }
            }

            async function firstGameSelected( ){
                gamesInfo = await loadGamesInfo()
                const game = gamesInfo.types[0]

                const firstClick = new MouseEvent('click', {})
                const firstGame = doc.getElementById(game.type)

                firstGame.dispatchEvent(firstClick)

                clickGameModeButton(firstGame.id)
            }

            async function insertGameSettings (gameModeID){
                gamesInfo = await loadGamesInfo()
                const games = gamesInfo.types
                const game = games.filter(x => {
                    return x.type === gameModeID
                })

                const currentGame = game[0]

                for(let i = 0; i < currentGame.range; i++){
                    const input = doc.createElement('input')
                    input.setAttribute('type', 'checkbox')
                    input.setAttribute('class', 'btn-check')
                    input.setAttribute('id', `${i+1}`)
                    input.setAttribute('autocomplete', 'off')
                    
                    const label = doc.createElement('label')
                    label.setAttribute('class', 'btn btn-gn d-flex justify-content-center align-items-center gn-space')
                    label.setAttribute('for', input.id)
                    label.setAttribute('name', currentGame.type)
                    label.innerHTML = i+1

                    doc.getElementById('game-number-buttons').appendChild(input)
                    doc.getElementById('game-number-buttons').appendChild(label)

                    label.addEventListener('click', function(){
                        clickGameNumberButtons(input.id, label.name)
                    })
                }

                const p = doc.createElement('p')
                p.setAttribute('class', 'gd')
                p.setAttribute('id', 'game-desc')

                p.innerHTML = currentGame.description
                doc.getElementById('gd-div').appendChild(p)

            }

            function clearGameSettings () {
                const gameDesc = doc.getElementById('game-desc')
                
                if(gameDesc){
                    function removeDesc(){
                        gameDesc.remove()
                    }
                    removeDesc()
                }

                const btnGnDiv = doc.getElementById('game-number-buttons')
                btnGnDiv.innerHTML = ''

            }

            async function clickGameModeButton (id) {
                clearGameSettings()
                insertGameSettings(id)

            }

            async function verifyGameNumberChecked(id, name) {
                gamesInfo = await loadGamesInfo()
                const games = gamesInfo.types
                const game = games.filter(x => {
                    return x.type === name
                })

                const checkbox = doc.getElementById(id)

                if(checkbox.checked){
                    return parseInt(id)
                }
                // doc.on('change', '.btn-gn', function(){
                //     const countShared = ('.btn-gn:checked').length
                //     if(countShared > game.maxNumber){
                //         alert(`Você selecionou mais que ${game.maxNumber} números!`)
                //         (this).prop('checked', false)
                //     }
                // })
            }

            async function clickGameNumberButtons(id, name){
                const numberClicked = await verifyGameNumberChecked(id, name)

                if(typeof numberClicked !== 'undefined')
                    console.log(numberClicked)
            }

            function clearGameButton() {
                let checkbox

                for(let i = 0; i < 80; i++){
                    checkbox = doc.getElementById(`${i+1}`)
                    if(checkbox){
                        checkbox.checked = false
                    }
                }
            }

            function completeGameButton() {

            }
            
            win.addEventListener('load', function(){
                loadGamesInfo()
                insertGameModeButton()
                firstGameSelected()

            })

            doc.getElementById('clear-game-btn').onclick = function(){
                clearGameButton()
            }


        }
        app()
    })(window.DOM, window, document)
    