import {
  getHellfireClubSubscritions,
  subscribeToHellfireClub
} from "./fireBase/hellfire.js";

const txtName = document.getElementById("txtName");
const txtEmail = document.getElementById("txtEmail");
const txtLevel = document.getElementById("txtLevel");
const txtCharacter = document.getElementById("txtCharacter");
const btn_switch_theme = document.getElementById("switch-theme-button");
const btnSubscribe = document.getElementById("btnSubscribe");

/** Realiza play na música de fundo quando clicado na tela.
 * Alguns browser não permite auto play na Tag HTML, por isso essa função. */
window.addEventListener("click", () => {
  const audio = document.getElementById("music");
  audio.play();
  audio.volume = 0.2;
});

/** Faz o controle de troca de tema, quando tema muda a música de fundo também altera. */
function switchTheme() {
  document.body.classList.toggle("dark-theme");
  document.body.classList.toggle("light-theme");

  const theme = document.body.classList[0];
  const music =
    theme === "light-theme" ? "normal-world.mpeg" : "inverted-world.mpeg";

  const audio = document.getElementById("music");
  audio.src = `assets/musics/${music}`;
  audio.play();
  audio.volume = 0.2;
}
btn_switch_theme.addEventListener("click", switchTheme);

btnSubscribe.addEventListener("click", async () => {
  const subscription = {
    name: txtName.value,
    email: txtEmail.value,
    level: txtLevel.value,
    character: txtCharacter.value
  };

  // Salvando no banco de dados.
  const subscriptionID = await subscribeToHellfireClub(subscription);
  console.log(`Inscrito com sucesso: ${subscriptionID}`);

  txtName.value = "";
  txtEmail.value = "";
  txtLevel.value = "";
  txtCharacter.value = "";
});

// Pegando todo o documento da colletion.
async function loadData() {
  const subscription = await getHellfireClubSubscritions();

  console.log(subscription);
}
