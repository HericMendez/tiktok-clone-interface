function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function showElementWithDelay(element, delayTime) {
  document.getElementById("loading").classList.remove("hidden");
  await delay(delayTime);
  document.getElementById("loading").classList.add("hidden");
  element.classList.remove("hidden");
}

async function startForm() {
  await showElementWithDelay(document.getElementById("titulo"), 2000);

  const inputs = [
    document.getElementById("input1"),
    document.getElementById("input2"),
  ];

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    console.log(inputs[i].childNodes[3].childNodes[1].value);
    await showElementWithDelay(input, 2000);
    await new Promise((resolve) => {
      input.addEventListener("focusout", function handler() {
        if (input.childNodes[3].childNodes[1].value.trim() !== "") {
          input.removeEventListener("focusout", handler);
          resolve();
        }
      });
      input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          // A tecla Enter foi pressionada

          if (input.childNodes[3].childNodes[1].value.trim() !== "") {
            console.log("Tecla Enter pressionada");

            resolve();
          } else {
            console.log("campo vazio!");
          }
        }
      });
    });
  }

  const prompt = document.getElementById("prompt");
  await showElementWithDelay(prompt, 2000);

  const simBtn = document.getElementById("simBtn");
  const naoBtn = document.getElementById("naoBtn");

  const buttonsHandler = async () => {
    prompt.removeEventListener("blur", buttonsHandler);

    await showElementWithDelay(document.getElementById("mensagem"), 2000);
    setTimeout(() => {
      closeSurvey();
    }, 4000);
  };

  simBtn.addEventListener("click", buttonsHandler);
  naoBtn.addEventListener("click", buttonsHandler);
}

//  document.addEventListener('DOMContentLoaded', startForm);
