// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    formulario.addEventListener('submit', agregarTweet);
    cargarStorage(tweets);
});

// Funciones

function agregarTweet(e) {
    e.preventDefault();
    
    const tweet = document.querySelector('#tweet').value;

    if (tweet === '') {
        mostrarError('Un mensaje no puede ir vacío');
        return;
    }

    const tweetOBJ = {
        id: Date.now(),
        texto: tweet
    };

    tweets = [...tweets, tweetOBJ];
    sincronizarStorage();
    generarHTML();

    // Reiniciando formulario
    formulario.reset();
}

function mostrarError(error) {
    // Creando código HTML 
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Insertar en el HTML
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // Eliminar la alerta después de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

function generarHTML() {
    limpiarHTML();

    if (tweets.length > 0) {
    
        tweets.forEach(tweet => {
            // Creando HTML para cada tweet
            const li = document.createElement('li');
            li.textContent = tweet.texto;

            //crear boton de borrar tweet
            const borrarTweet = document.createElement('a');
            borrarTweet.classList = 'borrar-tweet'
            borrarTweet.textContent = 'X';

            borrarTweet.onclick = () => {
                eliminandoTweet(tweet.id);
            }

            li.appendChild(borrarTweet);
            

            // Insertando en el HTML
            listaTweets.appendChild(li);



        });
    }
}

function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

function sincronizarStorage() {
    console.log('Sincronizando Storage...');
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function cargarStorage() {
    console.log('Cargando Storage...');
    tweets = JSON.parse(localStorage.getItem('tweets') || '[]');
    console.log(tweets);
    generarHTML(tweets);
}

function eliminandoTweet(e){
    console.log('Borrando...',e);
    tweets = tweets.filter(tweet => tweet.id !== e);
    console.log(tweets)
    generarHTML();
    sincronizarStorage();
    
}