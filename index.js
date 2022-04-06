document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const width = 8
    const squares = []
    let score = 0
    const candyColours = [
        'url(./images/alternative-red.png)',
        'url(./images/alternative-yellow.png)',
        'url(./images/alternative-orange.png)',
        'url(./images/alternative-purple.png)',
        'url(./images/alternative-green.png)',
        'url(./images/alternative-blue.png)'
    ]

    // Create board us JS
    const createBoard = () => {
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div')
            square.setAttribute('draggable', true)
            square.setAttribute('id', i)
            let randomColor = Math.floor(Math.random() * candyColours.length)
            square.style.backgroundImage = candyColours[randomColor]
            grid.appendChild(square)
            squares.push(square)
        }
    }
    createBoard()


    // Drag candies function
    let colorBeingDragged
    let colorBeingReplaced
    let squreIdBeingDragged
    let squareIdBeingReplaced


    squares.forEach(square => square.addEventListener('dragstart', dragStart))
    squares.forEach(square => square.addEventListener('dragend', dragEnd))
    squares.forEach(square => square.addEventListener('dragover', dragOver))
    squares.forEach(square => square.addEventListener('dragenter', dragEnter))
    squares.forEach(square => square.addEventListener('dragleave', dragLeave))
    squares.forEach(square => square.addEventListener('drop', dragDrop))


    function dragStart() {
        colorBeingDragged = this.style.backgroundImage
        squreIdBeingDragged = parseInt(this.id)
        console.log(this.id, 'dragstart')
    }

    function dragOver(e) {
        e.preventDefault()
        console.log(this.id, "dragover")
    }

    function dragEnter(e) {
        e.preventDefault()
        console.log(this.id, "dragenter")
    }

    function dragLeave() {
        console.log(this.id, "dragleave")
    }

    function dragDrop() {
        console.log(this.id, "drop")
        colorBeingReplaced = this.style.backgroundImage
        this.style.backgroundImage = colorBeingDragged //Functionality to switch colors
        squareIdBeingReplaced = parseInt(this.id)
        squares[squreIdBeingDragged].style.backgroundImage = colorBeingReplaced
    }

    function dragEnd() {
        console.log(this.id, "dragend")
        this.style.backgroundImage = colorBeingReplaced //Functionality to switch colors

        //Candy crush valid move rule
        let validMoves = [
            squreIdBeingDragged - 1,
            squreIdBeingDragged - width,
            squreIdBeingDragged + 1,
            squreIdBeingDragged + width
        ]
        let validMove = validMoves.includes(squareIdBeingReplaced)

        if (squareIdBeingReplaced && validMove) {
            squareIdBeingReplaced = null
        } else if (squareIdBeingReplaced && !validMove) {
            squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced
            squares[squreIdBeingDragged].style.backgroundImage = colorBeingDragged
        } else {
            squares[squreIdBeingDragged].style.backgroundImage = colorBeingDragged
        }

    }

    // Checking for color Matches
    // Check row for three
    function checkRowForThree() {
        for (let i = 0; i < 61; i++) {
            let rowOfThree = [i, i + 1, i + 2]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
            if (notValid.includes(i)) continue

            if (rowOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 3
                scoreDisplay.innerHTML = score
                rowOfThree.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })
            }
        }
    }

    checkRowForThree()

    // Check Column for three
    function checkColumnForThree() {
        for (let i = 0; i < 47; i++) {
            let columnOfThree = [i, i + width, i + width * 2]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            if (columnOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 3
                scoreDisplay.innerHTML = score
                columnOfThree.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })
            }
        }
    }

    checkColumnForThree()

    // Checking for color Matches
    // Check row for Four
    function checkRowForFour() {
        for (let i = 0; i < 61; i++) {
            let rowOfFour = [i, i + 1, i + 2, i + 3]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]
            if (notValid.includes(i)) continue

            if (rowOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 4
                scoreDisplay.innerHTML = score
                rowOfFour.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })
            }
        }
    }

    // drop candies once there is space

    function dropCandies() {
        for (i = 0; i < 55; i++) {
            if (squares[i + width].style.backgroundImage === '') {
                squares[i + width].style.backgroundImage = squares[i].style.backgroundImage
                squares[i].style.backgroundImage = ''
                const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
                const isFirstRow = firstRow.includes(i)
                if (isFirstRow && squares[i].style.backgroundImage === '') {
                    let randomColor = Math.floor(Math.random() * candyColours.length)
                    squares[i].style.backgroundImage = candyColours[randomColor]
                }
            }
        }
    }

    checkRowForFour()

    // Check Column for Four
    function checkColumnForFour() {
        for (let i = 0; i < 47; i++) {
            let columnOfFour = [i, i + width, i + width * 2, i + width * 3]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            if (columnOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 4
                scoreDisplay.innerHTML = score
                columnOfFour.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })
            }
        }
    }

    checkColumnForFour()

    // Checking for color Matches
    // Check row for Five
    function checkRowForFive() {
        for (let i = 0; i < 61; i++) {
            let rowOfFive = [i, i + 1, i + 2, i + 3, i + 4]
            let decidedColor = squares[i].style.backgroundImageImage
            const isBlank = squares[i].style.backgroundImageImage === ''

            const notValid = [3, 4, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31, 36, 37, 38, 39, 44, 45, 46, 47, 52, 53, 54, 55]
            if (notValid.includes(i)) continue

            if (rowOfFive.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 5
                scoreDisplay.innerHTML = score
                scoreDisplay.innerHTML = score
                rowOfFive.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })
            }
        }
    }

    checkRowForFive()

    // Check Column for Five
    function checkColumnForFive() {
        for (let i = 0; i < 47; i++) {
            let columnOfFive = [i, i + width, i + width * 2, i + width * 3, i + width * 4]
            let decidedColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            if (columnOfFive.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 5
                scoreDisplay.innerHTML = score
                columnOfFive.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })
            }
        }
    }

    checkColumnForFive()

    window.setInterval(() => {
        dropCandies()
        checkRowForFive()
        checkColumnForFive()
        checkRowForFour()
        checkColumnForFour()
        checkRowForThree()
        checkColumnForThree()
    }, 10)

















})