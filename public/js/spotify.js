const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('results-container');

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = searchInput.value;
    console.log(query);
    const url = `music/search?q=${query}`;
    try {
        const response = await fetch(url);
        console.log(response)
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