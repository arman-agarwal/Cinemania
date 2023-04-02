window.onload = () => {
    const cardsDiv = document.getElementById("cardsListDiv");
    for (let i = 0; i < 10; i++) {
        fetch('components/movieCard.html')
            .then(response => response.text())
            .then(html => {
                const cardComponent = document.createElement("div");
                cardComponent.innerHTML = html;
                cardsDiv.appendChild(cardComponent);
            })
            .catch(error => console.error(error));
    }
  };
  