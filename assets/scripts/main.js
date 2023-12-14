let walletAmount = 0; //Valor inicial do prêmio
let likeCount = 0; //número de likes no vídeo (não está sendo exibido)
let currentVideoIndex = 1; //índice do vídeo atual (valor de referência)
const numberOfVideos = 3; //quantidade de vídeos, mudar esse valor se adicionar/remover vídeos
const prizeValues = [34.7, 38, 46]; //valores exibidos ao clicar em like/dislike
const maxPrize = prizeValues.reduce((partialSum, a) => partialSum + a, 0);
//prêmio máximo possível ao clicar em todos os vídeos.
// evita que o usuário ganhe o prêmio várias vezes clicando no mesmo vídeo.
console.log;
function showReward() {
  // Tocando o som de dinheiro

  // Atualizando o saldo na "carteira"
  if (currentVideoIndex > 0 && currentVideoIndex <= numberOfVideos) {
    const rewardElement = document.querySelector(".reward");
    console.log(prizeValues[currentVideoIndex - 1]);
    if (walletAmount < maxPrize) {
      walletAmount += prizeValues[currentVideoIndex - 1];
      rewardElement.classList.add("animated");
      document.getElementById("moneySound").play();
    } else {
      walletAmount = maxPrize;
    }
    console.log(walletAmount);

    rewardElement.innerText = `R$${prizeValues[currentVideoIndex - 1]
      .toFixed(2)
      .replace(".", ",")}`;

    document.getElementById("walletAmount").innerText = walletAmount
      .toFixed(2)
      .replace(".", ",");
    setTimeout(() => {
      rewardElement.innerText = ""; // Limpar a mensagem após 2 segundos
      rewardElement.classList.remove("animated"); // Remover a classe de animação
    }, 2000); // A mensagem desaparecerá após 2 segundos

    likeCount++;

    updateLikeCount();
    setTimeout(() => {
      nextVideo();
    }, 2000); //delay de 2s para animaçao ser exibida antes do proximo video
  }

  // Adicionando classe para animar o texto
}

function updateLikeCount() {
  const likeCountElement = document.querySelector(".like-count");
  //likeCountElement.textContent = `Likes: ${likeCount}`;
}

function mostrarAlerta(texto) {
  document.querySelector(".like-button").focus();
  document.querySelector(".like-button").style.backgroundColor = "green";

  var feedback = document.getElementById("likeFeedback");
  feedback.style.display = "block"; // Torna o feedback visível

  setTimeout(function () {
    feedback.style.display = "none";
    document.querySelector(".like-button").style.backgroundColor = "#ff6600";
  }, 2000);
}

function showVideo(videoIndex, direction) {
  const videos = document.querySelectorAll(".video");

  videos.forEach((video, index) => {
    if (direction === "next") {
      video.style.transformOrigin = "left";
    } else if (direction === "prev") {
      video.style.transformOrigin = "right";
    }

    if (index === videoIndex - 1) {
      /*     window.setTimeout(function () {
      video.style.display = "block";
    }, 300); // timed to match animation-duration */
      window.setTimeout(function () {
        video.style.display = "block";
      }, 300); // timed to match animation-duration

      video.style.transform = "scaleX(1)";
    } else {
      video.style.transform = "scaleX(0)";
      video.style.display = "block";

      window.setTimeout(function () {
        video.style.display = "none";
      }, 300); // timed to match animation-duration
    }
  });
  currentVideoIndex = videoIndex;
}
/* videos.forEach((video, index) => {
  if (index === videoIndex - 1) {
    video.style.transform = "scale(1)";
    video.style.transition = "all .3s ease";
  } else {
    video.style.transform = "scale(0)";
  }
});
currentVideoIndex = videoIndex;
 */
function prevVideo() {
  if (currentVideoIndex > 1) {
    showVideo(currentVideoIndex - 1, "prev");
  }
}

function nextVideo() {
  if (currentVideoIndex < numberOfVideos) {
    showVideo(currentVideoIndex + 1, "next");
  }
}

showVideo(currentVideoIndex);

const openPopupBtn = document.getElementById("openPopupBtn");

const popup = document.getElementById("popup");

const sacarBtn = document.getElementById("sacarBtn");
const chavePixInput = document.getElementById("chavePixInput");
const valorSaqueInput = document.getElementById("valorSaqueInput");
const cards = document.querySelectorAll(".card");

openPopupBtn.addEventListener("click", () => {
  popup.style.display = "flex";
});

cards.forEach((card) => {
  card.addEventListener("click", () => {
    cards.forEach((c) => c.classList.remove("selected"));
    card.classList.add("selected");
  });
});

sacarBtn.addEventListener("click", () => {
  const selectedCard = document.querySelector(".card.selected");
  const chavePix = chavePixInput.value;
  const valorSaque = valorSaqueInput.value;

  if (selectedCard && chavePix && valorSaque) {
    const selectedCardText = selectedCard.textContent.trim();

    walletAmount -= parseFloat(valorSaque);
    document.getElementById("walletAmount").textContent = "0";

    showSuccessNotification(selectedCardText, chavePix, valorSaque);
    popup.style.display = "none";

    setTimeout(() => {
      showPixReceivedNotification(selectedCardText, chavePix, valorSaque);
    }, 3000);
  }
});

function closePopup() {
  popup.style.display = "none";
}

function showSuccessNotification() {
  Swal.fire({
    title: "Saque realizado com sucesso!",
    text: `O valor está sendo processado.`,
    icon: "success",
    confirmButtonText: "OK",
  });
}
function showPixReceivedNotification(selectedCard, chavePix, valorSaque) {
  const pixAmount = document.getElementById("pixAmount");
  pixAmount.innerText = valorSaque;

  // Reproduz o som de notificação
  const notificationSound = document.getElementById("notificationSound");
  notificationSound.play();

  const pixNotification = document.getElementById("pixNotification");
  pixNotification.style.display = "flex"; // Mostra a notificação

  setTimeout(() => {
    pixNotification.style.display = "none"; // Oculta a notificação após 5 segundos
  }, 5000); // A notificação será ocultada após 5 segundos (5000 milissegundos)
}
