document.getElementById("answer").style.visibility = "hidden";

function getWords(path, callback) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    resolve(xhr.responseText);
                } else {
                    reject(xhr);
                }
            }
        };
        xhr.open("GET", path);
        xhr.send();
    });
}

function searchWord() {
    getWords(chrome.runtime.getURL("/dictionary/sanalista.txt"))
        .then(function (fileData) {
            var wordList = fileData.split("\n");
            var wordToFind = document.getElementById("searchField").value.trim().toLowerCase();

            if (!(wordToFind == '') && !(wordToFind == undefined)) {
                var wordToFindPieces = wordToFind.split(" ");

                if (wordToFindPieces.length < 2) {
                    document.getElementById("answer").innerHTML = "Et syöttänyt kahta sanaa";
                    document.getElementById("answer").style.color = "#AB0028";
                    document.getElementById("answer").style.visibility = "visible";
                } else if (wordToFindPieces.length > 2) {
                    document.getElementById("answer").innerHTML = "Syötit enemmän kuin kaksi sanaa. Yhdyssana koostuu kahdesta sanasta.";
                    document.getElementById("answer").style.color = "#AB0028";
                    document.getElementById("answer").style.visibility = "visible";
                } else {
                    var wordToFindWithHyphen = wordToFindPieces[0] + "-" + wordToFindPieces[1];
                    var wordToFindWithoutSpace = wordToFindPieces[0] + wordToFindPieces[1];

                    if (wordList.includes(wordToFindWithHyphen)) {
                        document.getElementById("answer").innerHTML = "Sana " + wordToFindWithHyphen + " on yhdyssana";
                        document.getElementById("answer").style.color = "#00BFFE";
                        document.getElementById("answer").style.visibility = "visible";
                    } else if (wordList.includes(wordToFindWithoutSpace)) {
                        document.getElementById("answer").innerHTML = "Sana " + wordToFindWithoutSpace + " on yhdyssana";
                        document.getElementById("answer").style.color = "#00BFFE";
                        document.getElementById("answer").style.visibility = "visible";
                    } else {
                        document.getElementById("answer").innerHTML = "Sanat " + wordToFindPieces[0] + " ja " + wordToFindPieces[1] + " eivät muodosta yhdyssanaa";
                        document.getElementById("answer").style.color = "#AB0028";
                        document.getElementById("answer").style.visibility = "visible";
                    }
                }
            } else {
                document.getElementById("answer").innerHTML = "Et syöttänyt sanaa";
                document.getElementById("answer").style.color = "#AB0028";
                document.getElementById("answer").style.visibility = "visible";
            }
        })
        .catch(function (xhr) {
            console.log("XHR Error");
        });
}

document.getElementById('searchButton').addEventListener('click', () => {
    this.searchWord();
});

document.getElementById('searchField').addEventListener('keypress', (event) => {
    if (event.key == "Enter") {
        event.preventDefault();
        this.searchWord();
    }
}); 