window.onload = () => {
    let spanTexts = document.getElementsByClassName("backLetter");
    for(spanText of spanTexts){
        spanText.classList.add("active")
    }
    // getting the cardsdiv element, in which we will be adding the elements
    const cardsDiv = document.getElementById("cardsListDiv");
    // getting the json file, which is a promise, so we convert it to a json file and store it in the data variable
    getMovies().then(data=>{
        // for all the objects in the json file, we make a new component and append it to the main div
        for (let i = 0; i < data.length; i++) {
            fetch('components/movieCard.html')
                .then(response => response.text())
                .then(html => {
                    // replacing the movie's name, image address, and the comment 
                    if(data[i].src != undefined){
                        html = html.replace("Image Address", data[i].src);
                    }
                    else{
                        html = html.replace("Image Address", "movieImages/placeholder.jpeg");
                    }
                    if(data[i].name != undefined){
                        html = html.replace("Movie Name", data[i].name);
                    }
                    if(data[i].comment_title != undefined){
                        html = html.replace("Comment", data[i].comment_title);
                        html = html.replace("Comment title", data[i].comment_title);
                    }
                    if(data[i].cardID != undefined){
                        html = html.replace("No Comments added yet!", data[i].comment);
                    }
                    html = html.replace(/exampleModal/g, "exampleModal"+i);
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

const light = document.getElementById("lightButton");
const dark = document.getElementById("darkButton");
const sun = document.getElementById("sunImg");
const moon = document.getElementById("moonImg");
const body = document.body;
const profileButton = document.getElementById("profileButton");



light.addEventListener("click", function() {
moon.classList.add("img-faded");
moon.classList.remove("img-normal");
sun.classList.add("img-normal");
sun.classList.remove("img-faded");
body.classList.remove("dark-mode");
profileButton.classList.add("btn-outline-success");
profileButton.classList.remove("btn-danger");

});

dark.addEventListener("click", function() {
moon.classList.remove("img-faded");
moon.classList.add("img-normal");
sun.classList.remove("img-normal");
sun.classList.add("img-faded");
body.classList.add("dark-mode");
profileButton.classList.remove("btn-outline-success");
profileButton.classList.add("btn-danger");

});

let spanLetters = document.getElementsByClassName("backLetter");
let spanTexts = document.getElementById("backText");

spanTexts.addEventListener("mouseover", function() {
    for(spanLetter of spanLetters){
        spanLetter.classList.remove("active");
        spanLetter.classList.add("activeG");
    }
});
  
spanTexts.addEventListener("mouseout", function() {
    for(spanLetter of spanLetters){
        spanLetter.classList.remove("activeG");
        spanLetter.classList.add("active");
    }
});

let newMovieData = {}

document.getElementById("moviePoster").addEventListener("input",function(){
    let imagedAddress = document.getElementById("moviePoster").value;
    if(imagedAddress == ''){delete newMovieData["src"]}
    else{newMovieData["src"] = imagedAddress;}
})

document.getElementById("movieName").addEventListener("input",function(){
    let movieName = document.getElementById("movieName").value;
    if(movieName == ''){delete newMovieData["name"]}
    else{newMovieData["name"] = movieName;}
})

document.getElementById("movieCommentTitle").addEventListener("input",function(){
    let commentTitle = document.getElementById("movieCommentTitle").value;
    if(commentTitle == ''){delete newMovieData["comment_title"]}
    else{newMovieData["comment_title"] = commentTitle;}
})

document.getElementById("commentAddMovie").addEventListener("input",function(){
    let movieComment = document.getElementById("commentAddMovie").value;
    if(movieComment == ''){delete newMovieData["comment"]}
    else{newMovieData["comment"] = movieComment;}
})

let star1Selected = false;
let star2Selected = false;
let star3Selected = false;
let star4Selected = false;
let star5Selected = false;

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

document.getElementById("addNewMovie").addEventListener('click',async function(){
    if(newMovieData["src"]==undefined || newMovieData["name"]==undefined || newMovieData["stars"]==undefined || newMovieData["comment_title"]==undefined){
        alert("Incomplete Fields!");
        return;
    }
    await fetch('../data.json')
    .then(response => response.json())
    .then(data => {
        newMovieData["cardID"] = data.length + 1;
        data.push(newMovieData);
        console.log(data);
    })
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

async function getMovies() {
    const response = await fetch(`http://localhost:3000/getAllMovies`, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
    // console.log(data);
}
  