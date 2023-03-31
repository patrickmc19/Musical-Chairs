const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const resultsContainer = document.querySelector('#results-container');


searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = searchInput.value;
    console.log(query);
    const url = `api/spotify/tracks?q=$(query)`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        resultsContainer.innerHTML = '';
        data.forEach((track) => {
            const trackDiv = document.createElement('div');
            trackDiv.textContent = track.name;
            resultsContainer.appendChild(trackDiv);
        });
    } catch (error) {
        console.error(error);
    }

});