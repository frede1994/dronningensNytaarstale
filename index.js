var colorOff = "white";
// var colorOn = 'rgb(0, 89, 76)';
var colorOn = 'yellow';
var shuffleNumber = 50;
var numberOfCorrects = 0;
var bingo = false;
var rows = 5;
var columns = 2;
var numberOfWords = 7;

var ord1 = ['Nytårsaften', 'Verden', 'Soldater', 'Kronprinsparret', 'Nytårshilsen', '2019', '2020', 'Kronprinsen', 'Nytårsønsker', 'Kronprinsessen', 'Unge', 'Klimaet', 'Prins Joachim', 'Gamle', 'Prinsesse Benedikte', 'Argentina', 'Arbejde', 'Europa', 'Glæde', 'Muligheder', 'Køge', 'Nyborg', 'Børnebørn', 'Sommer', 'Sydslesvig', 'Generationer', 'Politiet', 'Folk', 'Ansvar', 'Prinsesse Marie', 'Genforeningen', 'Grænsen', 'Tallinn', 'Flag', 'Mindretal', 'Sikkerhed'];
var ord2 = ['Krig', 'Vejret', 'Flygtninge', 'Fred', 'Estland', 'Slesvig-Holsten', 'Særligt', 'Fællesskab', 'Klima', 'Frankrig', 'Dannebrog', 'Omsorg', 'Klimaforandringer', 'Jul', 'Kongeskibet', 'Sorg', 'Kronprins Frederik', 'Politi', 'Fødselsdag'];
var ord3 = ['Økonomiske', 'Kongehuset', 'Kronprinsesse Mary', 'Dagligdagen', 'Forventninger', 'Royal Run', 'Terror', 'Kærlighed', 'Alvor', 'Tilbageblik', 'Rådhusklokkerne', 'Stunder', 'Rigsfællesskabet', 'Krise', 'Stolt', 'Sociale medier', 'Atter'];
var bonusOrd = ["Facebook", "Privatliv", "EU", "Nedbørsrekord", "Landsholdet", "Fodboldlandsholdet", "Norge", "Økonomi", "Statsministeren", "Bryllup", "Krone", "Online", "Farmor", "Ligheder", "Penge", "Folketinget", "Guld", "Time", "Minut", "Cityring", "Begavet", "Fejltagelse", "Familiær", "Hjerterum", "Blomster", "Storm", "Søens folk", "Bemærkninger", "E-Sport", "Likes", "Eventyr", "Livgarden", "Beklager", "Erhvervslivet", "Metro", "Sverige", "Notre Dame", "El-løbehjul", "Håndtryk", "Herrelandsholdet", "Rusland", "Skyderi", "Asyl", "Teenager", "Krisetid", "Julekalender", "Uanset hvad", "Brexit", "Instagram", "Indlandsisen", "Uafhængighed", "Grådighed", "Hvid jul", "Influencer", "Smartphone", "Ipad", "Verdensmålene", "Motionsløb", "Madspild", "Begge sider", "Greta Thunberg"];
var usedWords = [];
var myWords = [];

findWords();
tableCreate();

function findWords() {
    for (i=2; i < numberOfWords; i++) {
        myWords.push(randomWord(1));
    }
    myWords.push(randomWord(2));
    if (Math.floor(Math.random() * 10) > 7) {
        myWords.push(randomWord(4));
    } else {
        myWords.push(randomWord(3));
    }
}

function tableCreate() {
    usedWords = [];
    var cellsToPopulate = [];
    var nrOfDoubleCells = numberOfWords - columns;

    for (i = 0; i < numberOfWords; i++) {
        cellsToPopulate.push(randomNumber(rows));
    }

    var tbl = document.getElementById('table');
    for (var i = 1; i < tbl.rows.length; i++) {
        for (var j = 0; j < tbl.rows[i].cells.length; j++) {
            if (i === cellsToPopulate[j]) {
                tbl.rows[i].cells[j].innerHTML = myWords.pop();
            }
        }
    }

    for (var k = 0; k < nrOfDoubleCells; k++) {
        var colAndRow = randomPlace();
        tbl.rows[colAndRow[0]].cells[colAndRow[1]].innerHTML = myWords.pop();
    }

    checkTable()
}

function checkTable() {
    var tbl = document.getElementById('table');
    var nrOfRows = [];
    var cols = [];
    for (var i = 0; i < tbl.rows.length; i++) {
        for (var j = 0; j < tbl.rows[i].cells.length; j++) {
            if (tbl.rows[i].cells[j].innerHTML !== "") {
                nrOfRows.push(i);
                cols.push(j);
            }
        }
    }
    var counts = [0];
    nrOfRows.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
    console.log(counts);
    console.log(counts.length);
    console.log("rows: " + rows);
    if (Object.values(counts).length !== counts.length || !$.inArray(0,counts) || counts.length < rows) {
        console.log("making new");
        location.reload();
    }
    // if (Math.min.apply(Math, counts) < 1) {
    //     console.log("making new");
    //     document.getElementById("newButton").click();
    // }
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
    if (category === 4) {
        numberOfWords = bonusOrd.length;
        ordArray = bonusOrd;
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
        var row = randomNumber(rows)-1;
        var col = randomNumber(columns)-1;
        if (tbl.rows[row].cells[col].innerHTML === "") {
            arr.push(row);
            arr.push(col);
        }
    }
    return arr;
}

var tbl = document.getElementById("table");
if (tbl != null) {
    for (var i = 0; i < tbl.rows.length; i++) {
        for (var j = 0; j < tbl.rows[i].cells.length; j++) {
            tbl.rows[i].cells[j].onclick = (function (i, j) {
                return function () {
                    console.log(tbl.rows[i].cells[j].style.backgroundColor);
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
//
// $(function(){
//     $('.cell').click(function(e){
//         var x = e.clientX;
//         var y = e.clientY;
//
//         var circle=$('<div class="circle"></div>');
//         circle.css('top',e.pageY - 15);
//         circle.css('left',e.pageX - 15)
//         $('#fx').append(circle);
//     })
// })
