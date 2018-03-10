// chrome.runtime.onInstalled.addListener(() => {

// });

// document.getElementById("searchButton").addEventListener('click', () => {
//     var wordToFind = document.getElementById("searchField").value;
//     if (searchWord(wordToFind)) {
//         document.getElementById("answer").innerHTML = "Sana on yhdyssana";
//     } else {
//         document.getElementById("answer").innerHTML = "Sana ei ole yhdyssana";
//     }
//     document.getElementById("answer").style.visibility = "visible";
// });

// function searchWord(wordToFind) {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = () => {
//         if (this.readyState == 4 && this.status == 200) {
//             myFunction(this);
//         }
//     };
//     xhttp.open("GET", "kotus-sanalista_v1.xml", true);
//     xhttp.send();

//     function myFunction(xml) {
//         var xmlDoc = xml.responseXML;
//         var x = xmlDoc.getElementsByTagName('s')[0];
//         var y = x.childNodes[0];
//         var found = y.nodeValue;

//         if (found == wordToFind) {
//             return true;
//         } else {
//             return false;
//         }
//     }
// }





function doGET(path, callback) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                // The request is done; did it work?
                if (xhr.status == 200) {
                    // Yes, use `xhr.responseText` to resolve the promise
                    resolve(xhr.responseText);
                } else {
                    // No, reject the promise
                    reject(xhr);
                }
             }
        };
        xhr.open("GET", path);
        xhr.send();
    });
}

// Do the request
doGET(chrome.runtime.getURL("/dictionary/sanalista.txt"))
    .then(function(fileData) {
        // Use the file data
        var wordList = fileData.split("\n");
        console.log(wordList[1]);
    })
    .catch(function(xhr) {
        // The call failed, look at `xhr` for details
        console.log("XHR Error");
    });
