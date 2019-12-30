var colorOff = "white";
var colorOn = "yellow";
var numberOfWords = 7;
var shuffleNumber = 50;
var numberOfCorrects = 0;
var bingo = false;

var ord1 = ['Nytårsaften', 'Verden', 'Soldater', 'Kronprinsparret', 'Nytårshilsen', '2019', '2020', 'Kronprinsen', 'Nytårsønsker', 'Kronprinsessen', 'Unge', 'Klimaet', 'Prins Joachim', 'Gamle', 'Prinsesse Benedikte', 'Argentina', 'Arbejde', 'Europa', 'Glæde', 'Muligheder', 'Køge', 'Nyborg', 'Børnebørn', 'Sommer', 'Sydslesvig', 'Generationer', 'Politiet', 'Folk', 'Ansvar', 'Prinsesse Marie', 'Genforeningen', 'Grænsen', 'Tallinn', 'Flag', 'Mindretal', 'Sikkerhed'];
var ord2 = ['Krig', 'Vejret', 'Flygtninge', 'Fred', 'Estland', 'Slesvig-Holsten', 'Særligt', 'Fællesskab', 'Klima', 'Frankrig', 'Dannebrog', 'Omsorg', 'Klimaforandringer', 'Jul', 'Kongeskibet', 'Sorg', 'Kronprins Frederik', 'Politi', 'Fødselsdag', 'Økonomiske'];
var ord3 = ['Kongehuset', 'Kronprinsesse Mary', 'Dagligdagen', 'Forventninger', 'Royal Run', 'Terror', 'Kærlighed', 'Alvor', 'Tilbageblik', 'Rådhusklokkerne', 'Stunder', 'Rigsfællesskabet', 'Krise', 'Stolt', 'Sociale medier'];
var usedWords = [];

tableCreate();

function tableCreate() {
    usedWords = [];
    var cellsToPopulate = [];
    var nrOfDoubleCells = numberOfWords - 5;

    for (i = 0; i < numberOfWords; i++) {
        cellsToPopulate.push(randomNumber(3));
    }

    var tbl = document.getElementById('table');
    for (var i = 1; i < tbl.rows.length; i++) {
        for (var j = 0; j < tbl.rows[i].cells.length; j++) {
            if (i === cellsToPopulate[j]) {
                tbl.rows[i].cells[j].innerHTML = randomWord(1);
            }
        }
    }

    for (var k = 0; k < nrOfDoubleCells; k++) {
        var colAndRow = randomPlace();
        console.log(colAndRow);
        tbl.rows[colAndRow[0]].cells[colAndRow[1]].innerHTML = randomWord(1);
    }

    checkTable()
}

function checkTable() {
    var tbl = document.getElementById('table');
    var rows = [];
    var cols = [];
    for (var i = 1; i < tbl.rows.length; i++) {
        for (var j = 0; j < tbl.rows[i].cells.length; j++) {
            if (tbl.rows[i].cells[j].innerHTML !== "") {
                rows.push(i);
                cols.push(j);
            }
        }
    }
    var counts = [0];
    rows.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
    console.log(counts);
    if (Math.max.apply(Math, counts) > 3) {
        console.log("making new");
        document.getElementById("newButton").click();
    }
}

function randomNumber(max) {
    return Math.floor(Math.random() * max + 1);
}

function randomWord(category) {
    var numberOfWords = 0;
    var ordArray;
    if (category === 1) {
        numberOfWords = ord1.length;
        ordArray = ord1;
    }
    if (category === 2) {
        numberOfWords = ord2.length;
        ordArray = ord2;
    }
    if (category === 3) {
        numberOfWords = ord3.length;
        ordArray = ord3;
    }
    var word = ordArray[Math.floor(Math.random() * numberOfWords)];
    while (usedWords.indexOf(word) > -1) {
        word = ordArray[Math.floor(Math.random() * numberOfWords)];
    }
    usedWords.push(word);
    return word;
}

function randomPlace() {
    var tbl = document.getElementById("table");
    var arr = [];
    while (arr.length === 0) {
        var row = randomNumber(3)-1;
        var col = randomNumber(5)-1;
        if (tbl.rows[row].cells[col].innerHTML === "") {
            arr.push(row);
            arr.push(col);
        }
    }
    return arr;
}

//COLOR ON CLICK
var tbl = document.getElementById("table");
if (tbl != null) {
    for (var i = 1; i < tbl.rows.length; i++) {
        for (var j = 0; j < tbl.rows[i].cells.length; j++) {
            tbl.rows[i].cells[j].onclick = (function (i, j) {
                return function () {
                    if (tbl.rows[i].cells[j].style.backgroundColor === colorOn) {
                        tbl.rows[i].cells[j].style.backgroundColor = colorOff;
                        numberOfCorrects--;
                    } else if (tbl.rows[i].cells[j].innerHTML !== "") {
                        tbl.rows[i].cells[j].style.backgroundColor = colorOn;
                        numberOfCorrects++;
                    }
                };
            }(i, j));
        }
    }
}

var checkInterval = window.setInterval(checkForBingo, 1000);

function checkForBingo() {
    if (numberOfCorrects === 7) {
        bingo = true;
        confetti.start();
    } else {
        bingo = false;
        confetti.stop();
    }
}
