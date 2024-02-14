// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getDatabase, ref as dbRef, update, onValue, get, set, push } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js"; // Adicionando o módulo de autenticação

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiTJ4GEFaRbpB9BLB6IWqXIqcrynue_z0",
  authDomain: "cronog-2eae0.firebaseapp.com",
  projectId: "cronog-2eae0",
  storageBucket: "cronog-2eae0.appspot.com",
  messagingSenderId: "267368033272",
  appId: "1:267368033272:web:d656be7ab4f51b695d840d",
  measurementId: "G-KGKN8SRV45"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app)

let ref_acessos = dbRef(database, "acessos")

function login(cod, user){
    get(dbRef(database, "acessos/"+cod)).then((snapshot)=>{
        if(snapshot.exists()){
            onValue(dbRef(database, "acessos/"+cod), async (snapshot)=>{
                if(user === snapshot.val().user){
                    login_dados[0] = snapshot.val().user
                    login_dados[1] = snapshot.val().cronog
                    login_dados[2] = cod
                    document.querySelector(".modal_login").style.display = "none"
                    document.querySelector(".app-body .app-body-lists").innerHTML = login_dados[1]
                    await updateValues()
                    // addEventListeners()
                    showToast("Logado! Seja bem vindo(a)!")
                }
            })
        }else{
            showToast("Informaçoes Invalidas!")
        }
    })
}

document.querySelector(".modal_login .modal_login-auth button").addEventListener("click", ()=>{
    login(document.querySelector(".modal_login .modal_login-auth .txtBox_cod").value, document.querySelector(".modal_login .modal_login-auth .txtBox_user").value)
})

//save -
document.querySelector(".saveCronog").addEventListener("click", ()=>{
    //atualizar cronograma dentro do banco de dados
    get(dbRef(database, "acessos/"+login_dados[2]+"/cronog")).then((snapshot)=>{
        if(snapshot.exists()){
            let updateCronogValue = String(document.querySelector(".app-body .app-body-lists").innerHTML)
            updateCronogValue.replace(/\s+/g, '') //remover espaçamentos desnecessarios
            set(dbRef(database, "acessos/"+login_dados[2]+"/cronog"), updateCronogValue)
            showToast("Cronograma salvo!")
        }
    })
})

//export -
document.querySelector(".downloadCronog").addEventListener("click", ()=>{
    if(document.querySelector(".app-body .app-body-lists").innerHTML !== ""){
            const key = CryptoJS.enc.Utf8.parse('chave secreta de 16bytes');
            const iv = CryptoJS.enc.Utf8.parse('vetor de inicialização');

            // Criptografar o texto usando AES
            const encrypted = CryptoJS.AES.encrypt(document.querySelector(".app-body .app-body-lists").innerHTML, key, { iv: iv }).toString();
            // const decrypted = CryptoJS.AES.decrypt(encrypted, key, { iv: iv }).toString(CryptoJS.enc.Utf8);
            console.log(encrypted)
            navigator.clipboard.writeText(encrypted)
            .then(()=>{
                showToast("Codigo copiado!")
            })
            .catch((e)=>{
                showToast("Não copiado! erro!")
                console.error(e.error)
            })
        }
})

//import -
document.querySelector(".importCronog").addEventListener("click", ()=>{
    document.querySelector(".modal_import_cronog").style.display = "flex"

    //close modal
    document.querySelector(".modal_import_cronog .modal_import_cronog-import-close-close").addEventListener("click", ()=>{
        document.querySelector(".modal_import_cronog").style.display = "none"
    })

    //import
    document.querySelector(".modal_import_cronog .modal_import_cronog-import-import").addEventListener("click", ()=>{
        if(document.querySelector(".modal_import_cronog div .txtBox_cod_import").value !== ""){
            const key = CryptoJS.enc.Utf8.parse('chave secreta de 16bytes');
            const iv = CryptoJS.enc.Utf8.parse('vetor de inicialização');
            let valueEncrypted = document.querySelector(".modal_import_cronog div .txtBox_cod_import").value
            const decrypted = CryptoJS.AES.decrypt(valueEncrypted, key, { iv: iv }).toString(CryptoJS.enc.Utf8);
            document.querySelector(".app-body .app-body-lists").innerHTML = decrypted
            updateValues()
            showToast("Cronograma importado!")
            document.querySelector(".modal_import_cronog").style.display = "none"
        }
    })
})