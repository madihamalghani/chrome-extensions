const jokeButton = document.getElementById('button');
const jokeText = document.getElementById('text');

jokeButton.addEventListener('click', () => {
    fetch('https://official-joke-api.appspot.com/random_joke')
        .then(response => response.json())
        .then(data => {
            jokeText.innerText = `${data.setup} - ${data.punchline}`;
        })
        .catch(error => {
            jokeText.innerText = 'Oops! Something went wrong. Please try again.';
            console.error('Error fetching joke:', error);
        });
});