((DOM, win, doc) => {
    'use strict'
    
        function app () {

            let gamesInfo = {}
            let currentGame
            let arrNum = []
            let cartGamesCompleted = []
            let cartTotal = 0
            
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

            function insertGameSettings (gameModeID){
                let game = gamesInfo.types
                game = game.filter(x => {
                    return x.type === gameModeID
                })
                game = game[0]

                for(let i = 0; i < game.range; i++){
                    const input = doc.createElement('input')
                    input.setAttribute('type', 'checkbox')
                    input.setAttribute('class', 'btn-check')
                    input.setAttribute('id', `${i+1}`)
                    input.setAttribute('name', game.type)
                    input.setAttribute('autocomplete', 'off')
                    
                    const label = doc.createElement('label')
                    label.setAttribute('class', 'btn btn-gn d-flex justify-content-center align-items-center gn-space')
                    label.setAttribute('for', input.id)
                    label.innerHTML = i+1

                    doc.getElementById('game-number-buttons').appendChild(input)
                    doc.getElementById('game-number-buttons').appendChild(label)

                    label.addEventListener('click', function(){
                        clickGameNumberButtons(input.id, input.name)
                    })
                }

                const p = doc.createElement('p')
                p.setAttribute('class', 'gd')
                p.setAttribute('id', 'game-desc')

                p.innerHTML = game.description
                doc.getElementById('gd-div').appendChild(p)

                currentGame = game.type

            }

            function clearGameSettings () {
                const gameDesc = doc.getElementById('game-desc')
                const btnGnDiv = doc.getElementById('game-number-buttons')
                arrNum = []
                
                if(gameDesc){
                    function removeDesc(){
                        gameDesc.remove()
                    }
                    removeDesc()
                }
                btnGnDiv.innerHTML = ''

            }

            function clickGameModeButton (id) {
                clearGameSettings()
                insertGameSettings(id)

            }

            function getGameNumberClicked(id) {
                const checkbox = doc.getElementById(id)
                return checkbox
            } 

            function verifyGameNumberChecked (){
                let game = gamesInfo.types
                game = game.filter(x => {
                    return x.type === currentGame
                })
                game = game[0]

                console.log('length', arrNum.length)
                console.log('max', game.maxNumber)

                return arrNum.length >= game.maxNumber
            }

            function clickGameNumberButtons(id){
                const numberClicked = getGameNumberClicked(id)
                const full = verifyGameNumberChecked()
                
                if(!full && !arrNum.includes(+numberClicked.id)) {
                    arrNum.push(+numberClicked.id)
                } else if(numberClicked.checked) {
                    arrNum = arrNum.filter((value) => {
                        return value != +numberClicked.id
                    })
                    
                } else {
                    const clickA = new MouseEvent('click', {})
                    numberClicked.dispatchEvent(clickA)
                    alert(`Selecione apenas a quantidade indicada na descrição!`)
                }
            }

            function clearGameButton() {
                let checkbox
                arrNum = []

                for(let i = 0; i < 80; i++){
                    checkbox = doc.getElementById(`${i+1}`)
                    if(checkbox){
                        checkbox.checked = false
                    }
                }
            }

            function completeGameButton() {
                let game = gamesInfo.types
                game = game.filter(x => {
                    return x.type === currentGame
                })
                game = game[0]

                const count = game.maxNumber - arrNum.length
                let randomNumbers = []

                for(let i = 0; i < count; i++){
                    let temp = Math.floor(Math.random()* Number(game.range)+1)
                    if(randomNumbers.indexOf(temp) === -1 && arrNum.indexOf(temp) === -1){
                        randomNumbers.push(temp)
                    }
                    else
                     i--
                }

                arrNum = arrNum.concat(randomNumbers)

                for(let i = 0; i < arrNum.length; i++){
                    let num = arrNum[i]
                    let elem = doc.getElementById(num)

                    if(!elem.checked)
                        elem.checked = true
                }

            }

            function autoSumCartContent() {
                doc.getElementById('cart-total').innerHTML = `TOTAL: ${cartTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
            }

            function addToCartButton() {
                let game = gamesInfo.types
                game = game.filter(x => {
                    return x.type === currentGame
                })
                game = game[0]

                if(arrNum.length === game.maxNumber){
                    cartTotal += game.price

                    cartGamesCompleted.push(`${game.type}-${cartGamesCompleted.length+1}`)
                    const tr = doc.createElement('tr')
                    tr.setAttribute('id', `${game.type}-${cartGamesCompleted.length+1}`)
                    
                    const div1 = doc.createElement('div')
                    div1.setAttribute('class', 'd-flex flex-row justify-content-start align-items-center p-2')
                    
                    const trashButton = doc.createElement('a')
                    trashButton.setAttribute('class', `trash-button`)
                    trashButton.setAttribute('type', 'button')
                    trashButton.setAttribute('id', `trash-btn ${game.type}-${cartGamesCompleted.length+1}`)
                    trashButton.onclick = function(){
                        if(trashButton.id === `trash-btn ${tr.id}`){
                            function removeBet(){
                                tr.remove()
                                cartTotal -= game.price
                            }
                            removeBet()
                            autoSumCartContent()
                            alert('Aposta removida com sucesso!')
                        }
                    }
    
                    const trashImg = doc.createElement('img')
                    trashImg.setAttribute('src', './assets/trash_gray.png')
                    trashImg.setAttribute('width', '50%')
                    trashImg.setAttribute('height', '50%')
                    
                    const div2 = doc.createElement('div')
                    div2.setAttribute('class', 'cart-content p-2 flex-column border-start')
                    div2.setAttribute('style', `border-color:${game.color} !important;`)
    
                    const cartNumbers = doc.createElement('p')
                    cartNumbers.setAttribute('class', 'card-numbers')
                    cartNumbers.innerHTML = arrNum.join(', ')
    
                    const div3 = doc.createElement('div')
                    div3.setAttribute('class', 'd-flex flex-row')
    
                    const gameType = doc.createElement('p')
                    gameType.setAttribute('class', 'game-type me-2 mb-0 align-item')
                    gameType.setAttribute('style', `color:${game.color}`)
                    gameType.innerHTML = game.type
    
                    const gamePrice = doc.createElement('p')
                    gamePrice.setAttribute('class', 'game-price mb-0')
                    gamePrice.innerHTML = `${game.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
    
                    doc.getElementById('cart-table').appendChild(tr)
                    tr.appendChild(div1)
                    div1.appendChild(trashButton)
                    trashButton.appendChild(trashImg)
                    div1.appendChild(div2)
                    div2.appendChild(cartNumbers)
                    div2.appendChild(div3)
                    div3.appendChild(gameType)
                    div3.appendChild(gamePrice)
                    
                    clearGameButton()
                    autoSumCartContent()
                    alert('Aposta inserida no carrinho com sucesso!')
                } else {
                    alert(`Selecione mais ${game.maxNumber-arrNum.length} números!`)
                }
            }

            
            win.addEventListener('load', function(){
                loadGamesInfo()
                insertGameModeButton()
                firstGameSelected()
                autoSumCartContent()

            })

            doc.getElementById('clear-game-btn').onclick = function (){
                clearGameButton()
            }

            doc.getElementById('complete-game-btn').onclick = function (){
                completeGameButton()
            }

            doc.getElementById('add-to-cart-btn').onclick = function (){
                addToCartButton()
            }

        }
        app()
    })(window.DOM, window, document)
    