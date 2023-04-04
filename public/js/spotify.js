const postForm = document.getElementById('post-form');
const postTitle = document.getElementById('post-title');
const postContent = document.getElementById('post-content');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('results-container');


postForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = postTitle.value;
    const content = postContent.value;
    console.log('Title:', title);
    console.log('Content:', content);
    postTitle.value = '';
    postContent.value = '';
});

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
        // Returns the first 5 tracks
        data.slice(0, 5).forEach((track) => {
            const trackDiv = document.createElement('div');
            const trackName = document.createElement('h3');
            const artistName = document.createElement('p');
            trackName.textContent = track.name;
            artistName.textContent = track.artists[0].name
            trackDiv.appendChild(trackName);
            trackDiv.appendChild(artistName);
            resultsContainer.appendChild(trackDiv);

            if (track.preview_url) {
                const audio = document.createElement('audio');
                audio.src = track.preview_url;

                const controls = document.createElement('div');
                const playBtn = document.createElement('button');
                const pauseBtn = document.createElement('button');
                const rewindBtn = document.createElement('button');

                playBtn.innerHTML = '<i class="fas fa-play"></i>';
                pauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                rewindBtn.innerHTML = '<i class="fas fa-backward"></i>';

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