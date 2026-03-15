let searchInputEl = document.getElementById('searchInput');
let searchResultsEl = document.getElementById('searchResults');
let spinnerEl = document.getElementById('spinner');

function searchWikipedia(event) {
    let userInput = searchInputEl.value;
    if (event.key === "Enter") {
        spinnerEl.classList.remove('d-none');
        searchResultsEl.textContent = "";
        let URL = "https://apis.ccbp.in/wiki-search?search=" + userInput;
        let options = {
            method: "GET"
        };
        fetch(URL, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}

function createAndAppendSearchResult(results) {
    let {
        title,
        link,
        description
    } = results;

    let resultItem = document.createElement('div');
    resultItem.classList.add('result-item');

    let resultTitle = document.createElement('a');
    resultTitle.classList.add('result-title');
    resultTitle.href = link;
    resultTitle.target = '_blank';
    resultTitle.textContent = title;
    resultItem.appendChild(resultTitle);

    let titleBreakEl = document.createElement('br');
    resultItem.appendChild(titleBreakEl);

    let resultURL = document.createElement('a');
    resultURL.classList.add('result-url');
    resultURL.href = link;
    resultURL.target = '_blank';
    resultURL.textContent = link;
    resultItem.appendChild(resultURL);

    let urlBreakEl = document.createElement('br');
    resultItem.appendChild(urlBreakEl);

    let resultDescription = document.createElement('p');
    resultDescription.classList.add('link-description');
    resultDescription.textContent = description;
    resultItem.appendChild(resultDescription);

    searchResultsEl.appendChild(resultItem);
}

function displayResults(search_results) {
    spinnerEl.classList.add('d-none');
    for (let results of search_results) {
        createAndAppendSearchResult(results);
    }
}

searchInputEl.addEventListener('keydown', searchWikipedia);
