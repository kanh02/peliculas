const searchInput = document.getElementById("input");
const img = document.getElementById("poster");
const dataDiv = document.getElementById("dataDiv");

//Cojo valor de búsqueda.
function getSearchValue() {
    let inputValue = searchInput.value;
//    console.log(inputValue);
    removeDataMovie();
    getMovie(inputValue);
    searchInput.value = "";
}

const getData = (url) => {
    return fetch(url);
}


//Llamada AJAX a la API con parámetro según búsqueda de usuario.
function getMovie(movie) {
    let url = `http://www.omdbapi.com/?t=${movie}&apikey=f12ba140`;
    getData(url).
    then(data => data.json()).then(result => {
            console.log(result)
            let movieData = result;
//            console.log(movieData);
            searchOutput(movieData);
        })
        .catch(error => console.log("Movie not found"));
}

function searchOutput(data){
    if(data.Response === "False"){
//        console.log("no existe");
        movieNotFoundLayout();
    }else{
        createMovieLayout(data);
    }
}

function movieNotFoundLayout(){
    let tittle = document.createElement("h1");
    tittle.innerHTML = "Movie not found";
    img.src = "/Images/noMovie.png";
    dataDiv.appendChild(tittle);
}

function createMovieLayout(movie) {
    let container = document.getElementById("movieContainer");
    container.style.backgroundColor = "beige"; 
    
    if(movie.Poster != "N/A"){ 
        img.src = movie.Poster;
    }else{
        img.src = "/Images/noMovie.png";
    }
    
    let modalHeader = document.getElementById("modalHeader");
    modalHeader.innerHTML = movie.Title;
    
    let tittle = document.createElement("h1");
    tittle.innerHTML = movie.Title;
    tittle.setAttribute("id", "movieTitle");
    
    let director = document.createElement("h3");
    director.innerHTML = movie.Director;
    
    let year = document.createElement("h3");
    year.innerHTML = movie.Year;
    
    let modalButton = document.createElement("button");
    modalButton.innerHTML = "More Info";
    modalButton.setAttribute("class", "btn btn-info btn-lg");
    modalButton.setAttribute("data-toggle", "modal");
    modalButton.setAttribute("data-target", "#myModal");
    
    let p = document.createElement("p");
    p.setAttribute("id", "addToFav");
    p.textContent = "Add To Favourites";
    let span = document.createElement("span");
    span.setAttribute("class", "fa fa-star");
    span.setAttribute("id", "star");
    
    p.appendChild(span);
    
    dataDiv.appendChild(tittle);
    dataDiv.appendChild(director);
    dataDiv.appendChild(year);
    dataDiv.appendChild(modalButton);
    dataDiv.appendChild(p);
    dataDiv.appendChild(span);
    
    favouriteMovie();
    
    //Creo información para rellenar el modal.
    createMovieInfo("Actors", movie);
    createMovieInfo("Awards", movie);
    createMovieInfo("Country", movie);
    createMovieInfo("Genre", movie);
    createMovieInfo("Plot", movie);
    
    saveFavourite(movie.Title);
}


function createMovieInfo(id,obj){
//    console.log(obj)
     let h4 = document.getElementById(id);
    h4.innerHTML = id+": " + obj[id];
}


function removeDataMovie() {
    let dataDiv = document.getElementById("dataDiv").innerHTML = "";
}

function sessionStorageLogin() {
    let username = document.getElementById("userName");
    let password = document.getElementById("psw");
//    console.log(username);
    sessionStorage.setItem('Username', username.value);
    sessionStorage.setItem('Password', password.value);
    let sessionUsername = sessionStorage.getItem('Username');

//    console.log(sessionUsername);
    let sessionPassword = sessionStorage.getItem('Password');
    document.getElementById('id01').style.display = 'none';
    let divTitle = document.getElementById("welcome");
    let title = document.createElement("h1");
    title.textContent = "Welcome " + sessionUsername;
    title.setAttribute("id", "welcome");
    divTitle.appendChild(title);
}

function favouriteMovie() {
    star.addEventListener("click", function () {
        let star = document.getElementById("star");
        let movieName = document.getElementById("movieTitle").textContent;
        let addToFav = document.getElementById("addToFav");
        if (star.classList.contains("checked")) {
            star.classList.remove("checked");
            localStorage.removeItem(movieName);
            addToFav.innerHTML = "Add to favourite";
        } else{
            addToFav.innerHTML = "Remove from favourite";
            localStorage.setItem(movieName, movieName);
            star.classList.add("checked");
            
        }
    console.log(localStorage);
    })
    
}

function saveFavourite(title){
    console.log(localStorage[title]);
    console.log(title)
    let addToFav = document.getElementById("addToFav");
       if (localStorage[title]){
           console.log("Its your favmovie")
            star.classList.add("checked");
           addToFav.innerHTML = "Remove from favourite";

       }
}