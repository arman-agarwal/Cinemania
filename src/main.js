window.onload = () => {
    const cardsDiv = document.getElementById("cardsListDiv");
    fetch('data.json')
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            fetch('components/movieCard.html')
                .then(response => response.text())
                .then(html => {
                    html = html.replace("Image Address", data[i].src);
                    html = html.replace("Movie Name", data[i].name);
                    html = html.replace("Comment", data[i].comment_titile);
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
  };
  