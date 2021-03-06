// loop to create table's contents


const initAll =()=> {
    if(document.getElementById) {

        document.getElementById('reload').onclick = anotherCard;
        newCard();

    } else {
        alert("Sorry, your browser doesn't support this script");
    }
}

const newCard =()=> {
    for (var i = 0; i < 24; i++) {
        setSquare(i);
    }
}

window.onload = initAll;

// now to fix duplicate numbers
var usedNums = new Array(76);

// function setSquare to give each square a number

const setSquare =(thisSquare)=> {
    let currSquare = `square${thisSquare}`;

    /* colPlace is an array; this array will pass each number into colBasis and multiply it by 15, resulting in either 0, 15, 30, 45, or 60 
    
    newNum takes colBasis and adds it to the getNewNum function that randomizes a number between 0 and 14 and then adds 1
    
    */
    var colPlace = new Array(
        0, 0, 0, 0, 0, 
        1, 1, 1, 1, 1,
        2, 2, 2, 2, //N column -> Free Space
        3, 3, 3, 3, 3,
        4, 4, 4, 4, 4
    );
    
    var colBasis = colPlace[thisSquare] * 15;


    var newNum;

    do {
        newNum = colBasis + getNewNum() + 1;
    } 
    while (usedNums[newNum]);

    usedNums[newNum] = true;
    document.getElementById(currSquare).innerHTML = newNum;
    document.getElementById(currSquare).className = '';
    document.getElementById(currSquare).onmousedown = toggleColor;
    
}

const getNewNum =()=> {
    return Math.floor(Math.random() * 15);
}

const anotherCard =()=> {
    for (var i = 1; i < usedNums.length; i++) {
        usedNums[i] = false;
    }

    newCard();
    return false;
}

const toggleColor =(e)=> {

    var thisSquare;
    if (e) {
        thisSquare = e.target;
    } else {
        thisSquare = window.event.srcElement;
    }

    if(thisSquare.className == '') {
        thisSquare.className = 'pickedBG';
    } else {
        thisSquare.className = '';
    }
    
    checkWin();
}



// checking for win!

const checkWin =()=> {
    var winningOption = -1;
    var winArr = [];
    var setSquares = 0;

    var winners = new Array(
        31, 992, 15360, 507904, 541729,
        557328, 1083458, 2162820,
        4329736, 8519745, 8659472, 16252928
    );
    
    for (var i = 0; i < 24; i++) {
        var currSquare = `square${i}`;

        if (document.getElementById(currSquare).className != '') {
            document.getElementById(currSquare).className = 'pickedBG';
            setSquares = setSquares | Math.pow(2, i);
        }
    }

    for (var i = 0; i < winners.length; i++) {
        if ((winners[i] & setSquares) == winners[i]) {
            winningOption = i;
            console.log(winningOption);
        }

    }
    
    if (winningOption > -1) {
        for (var i=0; i < 24; i++) {
            if (winners[winningOption] && Math.pow(2, i)) {
                currSquare = `square${i}`;
                document.getElementById(currSquare).className = 'winningBG'
            }
        } 
        
    }
    
}