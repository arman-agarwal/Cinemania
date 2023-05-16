import * as crud from './api_methods.js';
import * as keyFuncs from '../env.js';
const main = () => {
    let spanTexts = document.getElementsByClassName("backLetter");
    for(let spanText of spanTexts){
        spanText.classList.add("active")
    }
    let name = sessionStorage.getItem('name');
    let email = sessionStorage.getItem('email');
    // function openProfile() {
    //     var popup = document.getElementById("myPopup");
    //     popup.classList.toggle("show");
    //   }
    console.log(name,email);
    // getting the cardsdiv element, in which we will be adding the elements
    const cardsDiv = document.getElementById("cardsListDiv");
    // getting the json file, which is a promise, so we convert it to a json file and store it in the data variable
    crud.getMovies().then(data=>{
        // for all the objects in the json file, we make a new component and append it to the main div
        for (let i = 0; i < data.length; i++) {
            fetch('components/movieCard.html')
                .then(response => response.text())
                .then(html => {
                    // replacing the movie's name, image address, the comment_title, the starts and the cardID  
                    if(data[i].src != undefined){
                        html = html.replace("Image Address", data[i].src);
                    }
                    else{
                        html = html.replace("Image Address", "movieImages/placeholder.jpeg");
                    }
                    if(data[i].name != undefined && data[i].name != ""){
                        html = html.replace("Movie Name", data[i].name);
                    }
                    html = html.replace(/cardIDNumberValue/g, data[i].cardID);
                    if(data[i].comment_title != undefined && data[i].comment_title != ""){
                        html = html.replace("Comment", data[i].comment_title);
                        html = html.replace("Comment title", data[i].comment_title);
                    }
                    if(data[i].comment != undefined && data[i].comment != ""){
                        html = html.replace("No Comments added yet!", data[i].comment);
                    }
                    html = html.replace(/exampleModal/g, "exampleModal"+i);
                    html = html.replace(/confirmPostStatus/g, "confirmPostStatus"+i);
                    // making a string that holds unicode characters for the number of stars
                    let stars = '';
                    for (let j = 1; j<=5; ++j){
                        if(j<=data[i].stars){
                            // full star
                            stars += "&#9733; ";
                        }
                        else{
                            // empty star
                            stars += "&#9734; ";
                        }
                    }
                    // removing the last space
                    stars = stars.slice(0, -1);
                    html = html.replace("Star Rating", stars);
                    const cardComponent = document.createElement("div");
                    cardComponent.innerHTML = html;
                    cardsDiv.appendChild(cardComponent);
                })
                .catch(error => console.error(error));
        }
    })
};
window.addEventListener('load', main);

// functions to handle the delete post and canel buttons, that simply unhide the delete post buttons in the movieCard component. 
const EditMovies = document.getElementById("EditMovies");
const cancelMovies = document.getElementById("cancelEdit");

EditMovies.addEventListener("click",function(){
    cancelMovies.style = "display:block";
    const cardsDiv = document.getElementById("cardsListDiv");
    cardsDiv.innerHTML = '';
    crud.getMovies().then(data=>{
    for (let i = 0; i < data.length; i++) {
        fetch('components/movieCard.html')
            .then(response => response.text())
            .then(html => {
                if(data[i].src != undefined){
                    html = html.replace("Image Address", data[i].src);
                }
                else{
                    html = html.replace("Image Address", "movieImages/placeholder.jpeg");
                }
                if(data[i].name != undefined && data[i].name != ""){
                    html = html.replace("Movie Name", data[i].name);
                }
                html = html.replace(/cardIDNumberValue/g, data[i].cardID);
                if(data[i].comment_title != undefined && data[i].comment_title != ""){
                    html = html.replace("Comment", data[i].comment_title);
                    html = html.replace("Comment title", data[i].comment_title);
                }
                if(data[i].comment != undefined && data[i].comment != ""){
                    html = html.replace("No Comments added yet!", data[i].comment);
                }
                html = html.replace(/exampleModal/g, "exampleModal"+i);
                html = html.replace(/confirmPostStatus/g, "confirmPostStatus"+i);
                html = html.replace(/confirmEditStatus/g, "confirmEditStatus"+i);
                let stars = '';
                for (let j = 1; j<=5; ++j){
                    if(j<=data[i].stars){
                        stars += "&#9733; ";
                    }
                    else{
                        stars += "&#9734; ";
                    }
                }
                stars = stars.slice(0, -1);
                html = html.replace("Star Rating", stars);

                html = html.replace(/display: none;/g, "display:block;");
                const cardComponent = document.createElement("div");
                cardComponent.innerHTML = html;
                cardsDiv.appendChild(cardComponent);
            })
            .catch(error => console.error(error));
        }
    })
})

cancelMovies.addEventListener("click",function(){
    cancelMovies.style = "display:none";
    const cardsDiv = document.getElementById("cardsListDiv");
    cardsDiv.innerHTML = '';
    crud.getMovies().then(data=>{
    for (let i = 0; i < data.length; i++) {
        fetch('components/movieCard.html')
            .then(response => response.text())
            .then(html => {
                if(data[i].src != undefined){
                    html = html.replace("Image Address", data[i].src);
                }
                else{
                    html = html.replace("Image Address", "movieImages/placeholder.jpeg");
                }
                if(data[i].name != undefined && data[i].name != ""){
                    html = html.replace("Movie Name", data[i].name);
                }
                html = html.replace(/cardIDNumberValue/g, data[i].cardID);
                if(data[i].comment_title != undefined && data[i].comment_title != ""){
                    html = html.replace("Comment", data[i].comment_title);
                    html = html.replace("Comment title", data[i].comment_title);
                }
                if(data[i].comment != undefined && data[i].comment != ""){
                    html = html.replace("No Comments added yet!", data[i].comment);
                }
                html = html.replace(/exampleModal/g, "exampleModal"+i);
                html = html.replace(/confirmPostStatus/g, "confirmPostStatus"+i);
                let stars = '';
                for (let j = 1; j<=5; ++j){
                    if(j<=data[i].stars){
                        stars += "&#9733; ";
                    }
                    else{
                        stars += "&#9734; ";
                    }
                }
                stars = stars.slice(0, -1);
                html = html.replace("Star Rating", stars);
                const cardComponent = document.createElement("div");
                cardComponent.innerHTML = html;
                cardsDiv.appendChild(cardComponent);
            })
            .catch(error => console.error(error));
        }
    })
})
// functions to change the button colors when in dark and light mode. 
const light = document.getElementById("lightButton");
const dark = document.getElementById("darkButton");
const sun = document.getElementById("sunImg");
const moon = document.getElementById("moonImg");
const body = document.body;
const profileButton = document.getElementById("profileDropdown");
const logo = document.getElementById("logo");

light.addEventListener("click", function() {
moon.classList.add("img-faded");
moon.classList.remove("img-normal");
sun.classList.add("img-normal");
sun.classList.remove("img-faded");
body.classList.remove("dark-mode");
// profileButton.classList.add("btn-outline-success");/
profileButton.classList.add("btn-success");
profileButton.classList.remove("btn-danger");
logo.src = "Images/1.png";
});

dark.addEventListener("click", function() {
moon.classList.remove("img-faded");
moon.classList.add("img-normal");
sun.classList.remove("img-normal");
sun.classList.add("img-faded");
body.classList.add("dark-mode");
// profileButton.classList.remove("btn-outline-success");
profileButton.classList.remove("btn-success");
profileButton.classList.add("btn-danger");
logo.src = "Images/2.png";
});

// functions to handle the CINEMANIA entry and hover effects

let spanLetters = document.getElementsByClassName("backLetter");
let spanTexts = document.getElementById("backText");

spanTexts.addEventListener("mouseover", function() {
    for(let spanLetter of spanLetters){
        spanLetter.classList.remove("active");
        spanLetter.classList.add("activeG");
    }
});
  
spanTexts.addEventListener("mouseout", function() {
    for(let spanLetter of spanLetters){
        spanLetter.classList.remove("activeG");
        spanLetter.classList.add("active");
    }
});

// making a new object to store the new movie data

let newMovieData = {};

let star1Selected = false;
let star2Selected = false;
let star3Selected = false;
let star4Selected = false;
let star5Selected = false;

// functions to make the starts dynamic when hovered over and cliclked

document.getElementById("addStar1").addEventListener('mouseover',function(){
    if(!star1Selected){
        document.getElementById("addStar1").innerHTML = "&#9733; ";
    }
})
document.getElementById("addStar1").addEventListener('mouseout',function(){
    if(!star1Selected){
        document.getElementById("addStar1").innerHTML = "&#9734; ";
    }
})
document.getElementById("addStar2").addEventListener('mouseover',function(){
    if(!star1Selected){
        document.getElementById("addStar1").innerHTML = "&#9733; ";
    }
    if(!star2Selected){
        document.getElementById("addStar2").innerHTML = "&#9733; ";
    }
})
    
document.getElementById("addStar2").addEventListener('mouseout',function(){
    if(!star1Selected){
        document.getElementById("addStar1").innerHTML = "&#9734; ";
    }
    if(!star2Selected){
        document.getElementById("addStar2").innerHTML = "&#9734; ";
    }
})
document.getElementById("addStar3").addEventListener('mouseover',function(){
    if(!star1Selected){
        document.getElementById("addStar1").innerHTML = "&#9733; ";
    }
    if(!star2Selected){
        document.getElementById("addStar2").innerHTML = "&#9733; ";
    }
    if(!star3Selected){
        document.getElementById("addStar3").innerHTML = "&#9733; ";
    }
})
document.getElementById("addStar3").addEventListener('mouseout',function(){
    if(!star1Selected){
        document.getElementById("addStar1").innerHTML = "&#9734; ";
    }
    if(!star2Selected){
        document.getElementById("addStar2").innerHTML = "&#9734; ";
    }
    if(!star3Selected){
        document.getElementById("addStar3").innerHTML = "&#9734; ";
    }
    
})
document.getElementById("addStar4").addEventListener('mouseover',function(){
    if(!star1Selected){
        document.getElementById("addStar1").innerHTML = "&#9733; ";
    }
    if(!star2Selected){
        document.getElementById("addStar2").innerHTML = "&#9733; ";
    }
    if(!star3Selected){
        document.getElementById("addStar3").innerHTML = "&#9733; ";
    }
    if(!star4Selected){
        document.getElementById("addStar4").innerHTML = "&#9733; ";
    }
})
document.getElementById("addStar4").addEventListener('mouseout',function(){
    if(!star1Selected){
        document.getElementById("addStar1").innerHTML = "&#9734; ";
    }
    if(!star2Selected){
        document.getElementById("addStar2").innerHTML = "&#9734; ";
    }
    if(!star3Selected){
        document.getElementById("addStar3").innerHTML = "&#9734; ";
    }
    if(!star4Selected){
        document.getElementById("addStar4").innerHTML = "&#9734; ";
    }
})
document.getElementById("addStar5").addEventListener('mouseover',function(){
    if(!star1Selected){
        document.getElementById("addStar1").innerHTML = "&#9733; ";
    }
    if(!star2Selected){
        document.getElementById("addStar2").innerHTML = "&#9733; ";
    }
    if(!star3Selected){
        document.getElementById("addStar3").innerHTML = "&#9733; ";
    }
    if(!star4Selected){
        document.getElementById("addStar4").innerHTML = "&#9733; ";
    }
    if(!star5Selected){
        document.getElementById("addStar5").innerHTML = "&#9733; ";
    }
    
    
})
document.getElementById("addStar5").addEventListener('mouseout',function(){
    if(!star1Selected){
        document.getElementById("addStar1").innerHTML = "&#9734; ";
    }
    if(!star2Selected){
        document.getElementById("addStar2").innerHTML = "&#9734; ";
    }
    if(!star3Selected){
        document.getElementById("addStar3").innerHTML = "&#9734; ";
    }
    if(!star4Selected){
        document.getElementById("addStar4").innerHTML = "&#9734; ";
    }
    if(!star5Selected){
        document.getElementById("addStar5").innerHTML = "&#9734; ";
    }
})

document.getElementById("addStar1").addEventListener('click',function(){
    document.getElementById("addStar1").innerHTML = "&#9733; ";
    document.getElementById("addStar2").innerHTML = "&#9734; ";
    document.getElementById("addStar3").innerHTML = "&#9734; ";
    document.getElementById("addStar4").innerHTML = "&#9734; ";
    document.getElementById("addStar5").innerHTML = "&#9734; ";
    star1Selected = true;
    star2Selected = false;
    star3Selected = false;
    star4Selected = false;
    star5Selected = false;
    newMovieData["stars"] = 1;
})
document.getElementById("addStar2").addEventListener('click',function(){
    document.getElementById("addStar1").innerHTML = "&#9733; ";
    document.getElementById("addStar2").innerHTML = "&#9733; ";
    document.getElementById("addStar3").innerHTML = "&#9734; ";
    document.getElementById("addStar4").innerHTML = "&#9734; ";
    document.getElementById("addStar5").innerHTML = "&#9734; ";
    star1Selected = true;
    star2Selected = true;
    star3Selected = false;
    star4Selected = false;
    star5Selected = false;
    newMovieData["stars"] = 2;
})
document.getElementById("addStar3").addEventListener('click',function(){
    document.getElementById("addStar1").innerHTML = "&#9733; ";
    document.getElementById("addStar2").innerHTML = "&#9733; ";
    document.getElementById("addStar3").innerHTML = "&#9733; ";
    document.getElementById("addStar4").innerHTML = "&#9734; ";
    document.getElementById("addStar5").innerHTML = "&#9734; ";
    star1Selected = true;
    star2Selected = true;
    star3Selected = true;
    star4Selected = false;
    star5Selected = false;
    newMovieData["stars"] = 3;
})
document.getElementById("addStar4").addEventListener('click',function(){
    document.getElementById("addStar1").innerHTML = "&#9733; ";
    document.getElementById("addStar2").innerHTML = "&#9733; ";
    document.getElementById("addStar3").innerHTML = "&#9733; ";
    document.getElementById("addStar4").innerHTML = "&#9733; ";
    document.getElementById("addStar5").innerHTML = "&#9734; ";
    star1Selected = true;
    star2Selected = true;
    star3Selected = true;
    star4Selected = true;
    star5Selected = false;
    newMovieData["stars"] = 4;
})
document.getElementById("addStar5").addEventListener('click',function(){
    document.getElementById("addStar1").innerHTML = "&#9733; ";
    document.getElementById("addStar2").innerHTML = "&#9733; ";
    document.getElementById("addStar3").innerHTML = "&#9733; ";
    document.getElementById("addStar4").innerHTML = "&#9733; ";
    document.getElementById("addStar5").innerHTML = "&#9733; ";
    star1Selected = true;
    star2Selected = true;
    star3Selected = true;
    star4Selected = true;
    star5Selected = true;
    newMovieData["stars"] = 5;
})

// functions to store data in the object

document.getElementById("movieName").addEventListener("input",function(){
    let movieName = document.getElementById("movieName").value;
    if(movieName != ''){newMovieData["name"] = movieName;}
})

document.getElementById("movieCommentTitle").addEventListener("input",function(){
    let commentTitle = document.getElementById("movieCommentTitle").value;
    if(commentTitle != ''){newMovieData["comment_title"] = commentTitle;}
})

document.getElementById("commentAddMovie").addEventListener("input",function(){
    let movieComment = document.getElementById("commentAddMovie").value;
    if(movieComment != ''){newMovieData["comment"] = movieComment;}
})

// Event listener that sends the data of a new movie to the server to add it to the data base

document.getElementById("addNewMovie").addEventListener('click',async function(){
    const formData = new FormData();
    const imageInput = document.getElementById('moviePoster');
    formData.append('file', imageInput.files[0]);
    let src = await crud.uploadImage(formData);
    newMovieData["src"] = `movieImages/${src.srcPath}`;
    crud.writeMovies(newMovieData).then(data=>{console.log(data)});
    document.getElementById("moviePoster").value = "";
    document.getElementById("movieName").value = "";
    document.getElementById("movieCommentTitle").value = "";
    document.getElementById("commentAddMovie").value = "";
    document.getElementById("addStar1").innerHTML = "&#9734; ";
    document.getElementById("addStar2").innerHTML = "&#9734; ";
    document.getElementById("addStar3").innerHTML = "&#9734; ";
    document.getElementById("addStar4").innerHTML = "&#9734; ";
    document.getElementById("addStar5").innerHTML = "&#9734; ";
    star1Selected = false;
    star2Selected = false;
    star3Selected = false;
    star4Selected = false;
    star5Selected = false;
    newMovieData = {};
})

// functions that sends the cardID to the server to delete that card

function confirmDelete(cardID){
    crud.deleteMovie(cardID).then(data=>{console.log(data)})
}

function confirmEdit(cardID){
    let newEdit = {}
    if(document.getElementById('movieName_'+cardID).value != ""){
        newEdit["name"] = document.getElementById('movieName_'+cardID).value;
    }
    if(document.getElementById('addStar_'+cardID).value != ""){
        if( parseInt(document.getElementById('addStar_'+cardID).value) <= 5 ){
            newEdit["stars"] = document.getElementById('addStar_'+cardID).value;
        }
        else{
            newEdit["stars"] = 5;
        }
    }
    if(document.getElementById('movieCommentTitle_'+cardID).value != ""){
        newEdit["comment_title"] = document.getElementById('movieCommentTitle_'+cardID).value;
    }
    if(document.getElementById('commentAddMovie_'+cardID).value != ""){
        newEdit["comment"] = document.getElementById('commentAddMovie_'+cardID).value;
    }
    newEdit["cardID"] = cardID;
    console.log(newEdit);
    crud.updateMovie(newEdit).then(data=>{console.log(data)});
}

window.confirmDelete = confirmDelete;
window.confirmEdit = confirmEdit;


document.getElementById("addIMDbMovie").addEventListener("click", async function(){
    let title = document.getElementById("movieNameAPI").value;
    await fetch(`https://www.omdbapi.com/?apikey=${keyFuncs.getKey()}&t=${title}`)
    .then(response => response.json())
    .then(data => {
        let newData = {
            "src":data["Poster"],
            "name":data["Title"],
            "stars":data["imdbRating"]/2,
        };
        if(document.getElementById("movieCommentTitleAPI").value != ""){
            newData["comment_title"] = document.getElementById("movieCommentTitleAPI").value;
        }
        if(document.getElementById("commentAddMovieAPI").value != ""){
            newData["comment"] = document.getElementById("commentAddMovieAPI").value;
        }
        console.log(newData);
        crud.writeMovies(newData).then(data=>{console.log(data)});

    })
    .catch(error => {
        console.error(error); // Log any errors to the console
    }); 
    // console.log(response);
})
function profileReplace(){
    let profileButton = document.getElementById("profile");
    profileButton.innerText = email; //auth.currentUser.email
  }