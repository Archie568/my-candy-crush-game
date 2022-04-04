document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const width = 8
    const squares = []
    let score = 0
    const candyColours = [
        'red',
        'yellow',
        'orange',
        'purple',
        'green',
        'blue'
    ]

    // Create board us JS
    const createBoard = () => {
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div')
            square.setAttribute('draggable', true)
            square.setAttribute('id', i)
            let randomColor = Math.floor(Math.random() * candyColours.length)
            square.style.backgroundColor = candyColours[randomColor]
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
        colorBeingDragged = this.style.backgroundColor
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
        colorBeingReplaced = this.style.backgroundColor
        this.style.backgroundColor = colorBeingDragged //Functionality to switch colors
        squareIdBeingReplaced = parseInt(this.id)
        squares[squreIdBeingDragged].style.backgroundColor = colorBeingReplaced
    }

    function dragEnd() {
        console.log(this.id, "dragend")
        this.style.backgroundColor = colorBeingReplaced //Functionality to switch colors

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
            squares[squareIdBeingReplaced].style.backgroundColor = colorBeingReplaced
            squares[squreIdBeingDragged].style.backgroundColor = colorBeingDragged
        } else {
            squares[squreIdBeingDragged].style.backgroundColor = colorBeingDragged
        }

    }

    // Checking for color Matches
    // Check row for three
    function checkRowForThree() {
        for (let i = 0; i < 61; i++) {
            let rowOfThree = [i, i + 1, i + 2]
            let decidedColor = squares[i].style.backgroundColor
            const isBlank = squares[i].style.backgroundColor === ''

            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
            if (notValid.includes(i)) continue

            if (rowOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 3
                rowOfThree.forEach(index => {
                    squares[index].style.backgroundColor = ''
                })
            }
        }
    }

    checkRowForThree()

    // Check Column for three
    function checkColumnForThree() {
        for (let i = 0; i < 47; i++) {
            let columnOfThree = [i, i + width, i + width * 2]
            let decidedColor = squares[i].style.backgroundColor
            const isBlank = squares[i].style.backgroundColor === ''

            if (columnOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 3
                columnOfThree.forEach(index => {
                    squares[index].style.backgroundColor = ''
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
            let decidedColor = squares[i].style.backgroundColor
            const isBlank = squares[i].style.backgroundColor === ''

            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]
            if (notValid.includes(i)) continue

            if (rowOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 4
                rowOfFour.forEach(index => {
                    squares[index].style.backgroundColor = ''
                })
            }
        }
    }

    checkRowForFour()

    // Check Column for three
    function checkColumnForFour() {
        for (let i = 0; i < 47; i++) {
            let columnOfFour = [i, i + width, i + width * 2, i + width * 3]
            let decidedColor = squares[i].style.backgroundColor
            const isBlank = squares[i].style.backgroundColor === ''

            if (columnOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 4
                columnOfFour.forEach(index => {
                    squares[index].style.backgroundColor = ''
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
            let decidedColor = squares[i].style.backgroundColor
            const isBlank = squares[i].style.backgroundColor === ''

            const notValid = [3, 4, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31, 36, 37, 38, 39, 44, 45, 46, 47, 52, 53, 54, 55]
            if (notValid.includes(i)) continue

            if (rowOfFive.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 3
                rowOfFive.forEach(index => {
                    squares[index].style.backgroundColor = ''
                })
            }
        }
    }

    checkRowForFive()

    // Check Column for Five
    function checkColumnForFive() {
        for (let i = 0; i < 47; i++) {
            let columnOfFive = [i, i + width, i + width * 2, i + width * 3, i + width * 4]
            let decidedColor = squares[i].style.backgroundColor
            const isBlank = squares[i].style.backgroundColor === ''

            if (columnOfFive.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
                score += 5
                columnOfFive.forEach(index => {
                    squares[index].style.backgroundColor = ''
                })
            }
        }
    }

    checkColumnForFive()

    window.setInterval(() => {
        checkRowForFive()
        checkColumnForFive()
        checkRowForFour()
        checkColumnForFour()
        checkRowForThree()
        checkColumnForThree()
    }, 100)
















})