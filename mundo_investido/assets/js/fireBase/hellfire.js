import app from "./app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";

export async function subscribeToHellfireClub(subscription) {
  // Pegando o banco de Dados.
  const db = getFirestore(app);

  // Pegando a Colletion que eu quero do banco de dados.
  const hellfireClubCollection = collection(db, "hellfire-clube");

  // Criando um documento na minha colletion, ele retorna uma promessa.
  const docRef = await addDoc(hellfireClubCollection, subscription);

  // Retormando o ID do documento que foi criado.
  return docRef.id;
}

// Pegando todos os dados da Colletion.
export async function getHellfireClubSubscritions() {
  const db = getFirestore(app);
  const hellfireClubCollection = collection(db, "hellfire-clube");
  const hellfireClubSnapshot = await getDocs(hellfireClubCollection);
  const subscription = hellfireClubSnapshot.docs.map(doc => doc.data());

  return subscription;
}
