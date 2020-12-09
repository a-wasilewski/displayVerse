function displayVerse(elementID, bible, book, chapter, verses = null, numbers = false) {
    let element = document.getElementById(elementID);

    let url = 'https://biblia.info.pl/api/biblia';
    url += '/' + bible;
    url += '/' + book;
    url += '/' + chapter;
    if (verses) {
        url += '/' + verses;
    }

    getJSON(url, function (err, response) {
        if (err !== null) {
            console.log(err);
        } else {
            let versesLength = response.verses.length
            for (let i = 0; i < versesLength; i++) {
                const verse = response.verses[i];

                if (numbers) {
                    let numberTag = document.createElement('span');
                    numberTag.classList.add('verse', 'verse-number')
                    numberTag.innerHTML = '(' + verse.verse + ')';
                    element.append(numberTag);
                }
                let verseTag = document.createElement('span');
                verseTag.classList.add('verse', 'verse-text')
                verseTag.innerHTML = (i === 0 && numbers === false ? '' : ' ') + verse.text + (i === versesLength - 1 ? '' : ' ');
                element.append(verseTag);
            }
        }
    })
}


function getJSON(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        let status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
}
