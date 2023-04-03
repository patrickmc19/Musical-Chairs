const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('results-container');

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = searchInput.value;
    console.log(query);
    const url = `/api/music/search?q=${query}`;
    try {
        const response = await fetch(url);
        console.log(response)
        const data = await response.json();
        resultsContainer.innerHTML = '';
        data.forEach((track) => {
            const trackDiv = document.createElement('div');
            trackDiv.textContent = track.name;
            resultsContainer.appendChild(trackDiv);

            if (track.preview_url) {
                const audio = document.createElement('audio');
                audio.src = track.preview_url;

                const controls = document.createElement('div');
                const playBtn = document.createElement('button');
                const pauseBtn = document.createElement('button');
                const rewindBtn = document.createElement('button');

                playBtn.textContent = 'Play';
                pauseBtn.textContent = 'Pause';
                rewindBtn.textContent = 'Rewind';

                playBtn.addEventListener('click', () => {
                    audio.play();
                });

                pauseBtn.addEventListener('click', () => {
                    audio.pause();
                });

                rewindBtn.addEventListener('click', () => {
                    audio.currentTime = 0;
                });

                controls.appendChild(playBtn);
                controls.appendChild(pauseBtn);
                controls.appendChild(rewindBtn);

                trackDiv.appendChild(controls);
                trackDiv.appendChild(audio);
            } else {
                const noPreview = document.createElement('p');
                noPreview.textContent = 'Preview not available';
                trackDiv.appendChild(noPreview);
            }
        });
    } catch (error) {
        console.error(error);
    }
});