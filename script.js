
const bouton = document.getElementById("messageBtn");
const message = document.getElementById("message");

bouton.addEventListener("click", function () {
    message.textContent =
        "Ta lumière est précieuse. Continue de grandir, un jour à la fois. 🌙";
});

const penseeBtn = document.getElementById("penseeBtn");
const pensee = document.getElementById("pensee");

const pensees = [
    "Chaque petit pas te rapproche de tes rêves. 🌙",
    "Tu as le droit d'apprendre à ton propre rythme. ✨",
    "Ne te compare pas aux autres : évolue à ton rythme. 🖤",
    "La discipline d'aujourd'hui construit tes possibilités de demain. 🌟",
    "Prends soin de ton esprit, de ton cœur et de tes rêves. 🤍",
    "Avec Dieu, avance avec foi et persévérance. 🙏🏽",
    "Tu n'as pas besoin d'être parfaite pour progresser. 🌷"
];

penseeBtn.addEventListener("click", function () {
    const index = Math.floor(Math.random() * pensees.length);
    pensee.textContent = pensees[index];
});

const journalTexte = document.getElementById("journalTexte");
const sauverJournal = document.getElementById("sauverJournal");
const effacerJournal = document.getElementById("effacerJournal");
const journalMessage = document.getElementById("journalMessage");
const compteurJournal = document.getElementById("compteurJournal");

function actualiserCompteur() {
    compteurJournal.textContent =
        journalTexte.value.length + " / 2000 caractères";
}

// Charger le texte déjà enregistré
journalTexte.value =
    localStorage.getItem("refletJournal") || "";

actualiserCompteur();

// Mettre à jour le compteur pendant la saisie
journalTexte.addEventListener("input", function () {
    actualiserCompteur();
    journalMessage.textContent = "";
});

// Enregistrer le texte
sauverJournal.addEventListener("click", function () {
    localStorage.setItem("refletJournal", journalTexte.value);

    journalMessage.textContent =
        "Ton texte est enregistré sur cet appareil. 🌙";
});

// Effacer le texte après confirmation
effacerJournal.addEventListener("click", function () {
    const confirmation = confirm(
        "Veux-tu vraiment effacer ton texte enregistré ?"
    );

    if (confirmation) {
        journalTexte.value = "";
        localStorage.removeItem("refletJournal");
        actualiserCompteur();

        journalMessage.textContent =
            "Ton journal a été effacé. 🖤";
    }
});

const formObjectifs = document.getElementById("formObjectifs");
const nouvelObjectif = document.getElementById("nouvelObjectif");
const listeObjectifs = document.getElementById("listeObjectifs");
const messageObjectifs = document.getElementById("messageObjectifs");
const barreObjectifs = document.getElementById("barreObjectifs");
const progressionObjectifs = document.getElementById("progressionObjectifs");

let objectifs = JSON.parse(
    localStorage.getItem("refletObjectifs") || "[]"
);

function enregistrerObjectifs() {
    localStorage.setItem(
        "refletObjectifs",
        JSON.stringify(objectifs)
    );
}

function afficherObjectifs() {
    listeObjectifs.replaceChildren();

    const accomplis = objectifs.filter(function (objectif) {
        return objectif.termine;
    }).length;

    const pourcentage = objectifs.length === 0
        ? 0
        : Math.round((accomplis / objectifs.length) * 100);

    barreObjectifs.value = pourcentage;

    progressionObjectifs.textContent =
        pourcentage + " % accompli — " +
        accomplis + " sur " + objectifs.length + " objectifs";

    objectifs.forEach(function (objectif, index) {
        const ligne = document.createElement("li");
        const caseCoche = document.createElement("input");
        const texte = document.createElement("span");
        const boutonSupprimer = document.createElement("button");

        caseCoche.type = "checkbox";
        caseCoche.checked = objectif.termine;
        caseCoche.setAttribute(
            "aria-label",
            "Marquer comme accompli : " + objectif.texte
        );

        texte.textContent = objectif.texte;

        if (objectif.termine) {
            texte.classList.add("termine");
        }

        caseCoche.addEventListener("change", function () {
            objectifs[index].termine = caseCoche.checked;
            enregistrerObjectifs();
            afficherObjectifs();
        });

        boutonSupprimer.type = "button";
        boutonSupprimer.textContent = "Supprimer";
        boutonSupprimer.addEventListener("click", function () {
            objectifs.splice(index, 1);
            enregistrerObjectifs();
            afficherObjectifs();
            messageObjectifs.textContent =
                "Objectif supprimé. 🌙";
        });

        ligne.append(caseCoche, texte, boutonSupprimer);
        listeObjectifs.appendChild(ligne);
    });
}

formObjectifs.addEventListener("submit", function (event) {
    event.preventDefault();

    const texte = nouvelObjectif.value.trim();

    if (texte === "") {
        return;
    }

    objectifs.push({
        texte: texte,
        termine: false
    });

    enregistrerObjectifs();
    afficherObjectifs();

    nouvelObjectif.value = "";
    messageObjectifs.textContent =
        "Objectif ajouté avec succès ! ✨";
});

afficherObjectifs();

const menuToggle = document.getElementById("menuToggle");
const menuLiens = document.getElementById("menuLiens");

menuToggle.addEventListener("click", function () {
    const estOuvert = menuLiens.classList.toggle("ouvert");

    menuToggle.setAttribute(
        "aria-expanded",
        String(estOuvert)
    );

    menuToggle.textContent = estOuvert
        ? "✕ Fermer le menu"
        : "☰ Menu";
});

const liensDuMenu = menuLiens.querySelectorAll("a");

liensDuMenu.forEach(function (lien) {
    lien.addEventListener("click", function () {
        menuLiens.classList.remove("ouvert");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰ Menu";
    });
});

const rechercheArticles = document.getElementById("rechercheArticles");
const resultatRecherche = document.getElementById("resultatRecherche");
const articlesBlog = document.querySelectorAll("#blog article");

rechercheArticles.addEventListener("input", function () {
    const recherche = rechercheArticles.value
        .trim()
        .toLowerCase();

    let nombreVisible = 0;

    articlesBlog.forEach(function (article) {
        const contenu = article.textContent.toLowerCase();
        const correspond = contenu.includes(recherche);

        article.hidden = !correspond;

        if (correspond) {
            nombreVisible++;
        }
    });

    if (recherche === "") {
        resultatRecherche.textContent = "";
    } else if (nombreVisible === 0) {
        resultatRecherche.textContent = "Aucun article trouvé.";
    } else {
        resultatRecherche.textContent =
            nombreVisible + " article(s) trouvé(s).";
    }
});

const retourHaut = document.getElementById("retourHaut");

if (retourHaut) {
    retourHaut.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    });
}



