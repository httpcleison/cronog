// let login_dados = []


// function addEventListeners() {
//     const weeks = document.querySelectorAll('.week-title');
//     weeks.forEach(function(week) {
//         week.addEventListener('click', function() {
//             const content = this.nextElementSibling;
//             content.style.display = (content.style.display === 'block') ? 'none' : 'block';
//         });

//         const addButton = week.querySelector('span');
//         addButton.addEventListener("click", function(event) {
//             event.stopPropagation(); // Evitar propagação para o título
//             const content = this.parentNode.nextElementSibling;
//             let newMaterialTitle = prompt("Digite o título do novo material:");
//             if (newMaterialTitle) {
//                 let newMaterial = document.createElement('div');
//                 newMaterial.className = 'material';
//                 newMaterial.innerHTML = `
//                     <div class="material-title">${newMaterialTitle}<span class="fas fa-plus-circle"></span></div>
//                     <div class="subjects" style="display: none;">
//                         <ul></ul>
//                     </div>`;
//                 content.appendChild(newMaterial);
//                 addMaterialListeners(newMaterial.querySelector('.material-title'));
//                 // Adiciona o ouvinte de evento para a nova li
//                 addListItemListener(newMaterial.querySelector('.subjects ul li'));
//             }
//         });
//     });

//     const materialTitles = document.querySelectorAll('.material-title');
//     materialTitles.forEach(function(title) {
//         addMaterialListeners(title);
//     });
// }

// // Função para adicionar ouvintes de eventos aos materiais
// function addMaterialListeners(materialTitle) {
//     materialTitle.addEventListener('click', function() {
//         const subjects = this.nextElementSibling;
//         subjects.style.display = (subjects.style.display === 'block') ? 'none' : 'block';
//     });

//     const addButton = materialTitle.querySelector('span');
//     addButton.addEventListener("click", function(event) {
//         event.stopPropagation(); // Evitar propagação para o título
//         const subjectsList = this.parentNode.nextElementSibling.querySelector('.subjects ul');
//         let newSubject = prompt("Digite o novo assunto:");
//         if (newSubject) {
//             let li = document.createElement('li');
//             li.textContent = newSubject;
//             subjectsList.appendChild(li);
//             // Adiciona o ouvinte de evento para a nova li
//             addListItemListener(li);
//         }
//     });
// }

// addEventListeners();

// let newWeekButton = document.querySelector(".newWeekButton")
// newWeekButton.addEventListener("click", () => {
//     let nameNewWeek = prompt("Adicione o nome da nova semana:")
//     let newWeekHTML = `<div class="week">
//                             <div class="week-title">${nameNewWeek}<span class="fas fa-plus-circle"></span></div>
//                             <div class="content"></div>
//                         </div>`;
//     document.querySelector(".app-body .app-body-lists").innerHTML += newWeekHTML;
//     addEventListeners(); // Adicionar ouvintes de eventos para a nova semana
// });

// function addListItemListener(item) {
//     item.addEventListener('click', function() {
//         if (this.classList.contains("completed")) {
//             this.classList.remove("completed");
//         } else {
//             this.classList.add("completed");
//         }
//     });
// }

let login_dados = [];
let weekTitles;
let materialTitles;
let subjectsListItems;

let weekTitlesSpan;
let materialTitleSpan;
let subjectsListItemsSpan;

function updateValues() {
    //load
    weekTitles = document.querySelectorAll(".app-body .app-body-lists .week .week-title");
    weekTitles.forEach((title) => {
        title.addEventListener("click", () => {
            let content = title.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    });

    materialTitles = document.querySelectorAll(".material-title");
    materialTitles.forEach((materialTitle) => {
        materialTitle.addEventListener("click", () => {
            let subjects = materialTitle.nextElementSibling;
            if (subjects.style.display === "block") {
                subjects.style.display = "none";
            } else {
                subjects.style.display = "block";
            }
        });
    });

    subjectsListItems = document.querySelectorAll(".subjects ul li");
    subjectsListItems.forEach((li) => {
        li.addEventListener("click", () => {
            li.classList.toggle("completed");
        });
    });

    //
    weekTitlesSpan = document.querySelectorAll(".app-body .app-body-lists .week .week-title span");
    weekTitlesSpan.forEach((title)=>{
        title.addEventListener("click", (event)=>{ 
            event.stopPropagation();
            let content = title.parentElement.nextElementSibling;
            let nameNewMaterial = prompt("Digite o nome da matéria:")
            if(nameNewMaterial){
                let newMaterial = document.createElement('div');
                newMaterial.className = 'material';
                newMaterial.innerHTML = `<div class="material-title">${nameNewMaterial}<span class="fas fa-plus-circle add-subject"></span></div><div class="subjects"><ul></ul></div>`;
                content.appendChild(newMaterial);
                addMaterialListeners(newMaterial.querySelector('.material-title'));
            }
        });
    });
}

document.addEventListener("click", function(event) {
    if (event.target.classList.contains("add-subject")) {
        event.stopPropagation(); 
        const subjectsList = event.target.parentElement.nextElementSibling.querySelector('.subjects ul');
        let newSubject = prompt("Digite o novo assunto:");
        if (newSubject) {
            let li = document.createElement('li');
            li.textContent = newSubject;
            subjectsList.appendChild(li);
            updateValues()
        }
    }
});

function addMaterialListeners(materialTitle) {
    materialTitle.addEventListener('click', function() {
        const subjects = this.nextElementSibling;
        subjects.style.display = (subjects.style.display === 'block') ? 'none' : 'block';
    });

    let addButton = materialTitle.querySelector('span.add-subject'); // Modificado para especificar apenas o botão de adicionar assunto
    addButton.addEventListener("click", function(event) {
        event.stopPropagation(); 
        let subjectsList = this.parentElement.nextElementSibling.querySelector('.subjects ul');
        let newSubject = prompt("Digite o novo assunto:");
        if (newSubject) {
            let li = document.createElement('li');
            li.textContent = newSubject;
            subjectsList.appendChild(li);
            updateValues()
        }
    });
}

let newWeekButton = document.querySelector(".newWeekButton");
newWeekButton.addEventListener("click", () => {
    let nameNewWeek = prompt("Adicione o nome da nova semana:");
    if(nameNewWeek){
        if(nameNewWeek.length >= 13){
            nameNewWeek = nameNewWeek.substring(0, 13)
            nameNewWeek += "..."
        }
        let newWeekHTML = `<div class="week">
                            <div class="week-title">${nameNewWeek}<span class="fas fa-plus-circle add-subject"></span></div>
                            <div class="content"></div>
                        </div>`;
        document.querySelector(".app-body .app-body-lists").innerHTML += newWeekHTML;
        updateValues()
    }
});

updateValues();

// document.querySelector(".container .app-menu-mobile button").addEventListener("click", async()=>{
//     document.querySelector(".container .app-menu").style.display = await "flex"
//     document.addEventListener("click", ()=>{
//         document.querySelector(".container .app-menu").style.display = "none"
//     })
// })

document.querySelector(".container .app-menu-mobile button").addEventListener("click", (event) => {
    // Impede que o evento de clique propague para o documento
    event.stopPropagation();
    const appMenu = document.querySelector(".container .app-menu");
    if (appMenu.style.display === "none" || appMenu.style.display === "") {
        appMenu.style.display = "flex";
        // Adiciona um ouvinte de evento para fechar o menu se clicar fora dele
        document.addEventListener("click", hideAppMenuOnClickOutside);
    } else {
        appMenu.style.display = "none";
        // Remove o ouvinte de evento quando o menu é fechado
        document.removeEventListener("click", hideAppMenuOnClickOutside);
    }
});

function hideAppMenuOnClickOutside(event) {
    //evento disparar apenas se a mediaa for diferente de 900px - fazer sistema ainda css!
    const appMenu = document.querySelector(".container .app-menu");
    if (!appMenu.contains(event.target)) {
        appMenu.style.display = "none";
        document.removeEventListener("click", hideAppMenuOnClickOutside);
    }
}
