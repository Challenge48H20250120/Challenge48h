// Initialisation de la reconnaissance vocale
const recognition = new (window.SpeechRecognition ||
	window.webkitSpeechRecognition)();

if (recognition === undefined) {
	alert("La reconnaissance vocale n'est pas supportée par votre navigateur.");
} else {
	console.log("Reconnaissance vocale supportée !");

	recognition.lang = "fr-FR"; // Langue : Français
	recognition.interimResults = false; // Ne pas afficher les résultats intermédiaires
	recognition.continuous = false; // Arrêt après une phrase

	// Gestion des grammaires (si SpeechGrammarList est disponible)
	const SpeechGrammarList =
		window.SpeechGrammarList || window.webkitSpeechGrammarList;
	if (SpeechGrammarList) {
		console.log("Support de SpeechGrammarList détecté !");
		const grammar =
			"#JSGF V1.0; grammar colors; public <color> = rouge | vert | bleu | jaune ;";
		const grammarList = new SpeechGrammarList();
		grammarList.addFromString(grammar, 1);
		recognition.grammars = grammarList;
	} else {
		console.warn(
			"SpeechGrammarList n'est pas pris en charge par ce navigateur."
		);
	}

	// Bouton pour lancer la reconnaissance
	document.getElementById("start-button").addEventListener("click", () => {
		recognition.start();
		console.log("Reconnaissance vocale démarrée...");
	});

	// Bouton pour arrêter la reconnaissance
	document.getElementById("stop-button").addEventListener("click", () => {
		recognition.stop();
		console.log("Reconnaissance vocale arrêtée.");
	});

	// Traitement des résultats
	recognition.onresult = (event) => {
		console.log("Résultat détecté"); // Log de vérification
		const transcript = event.results[0][0].transcript; // Texte reconnu
		console.log("Texte reconnu :", transcript); // Affichez le texte dans la console
		document.getElementById("text").innerText = transcript; // Affichez le texte dans la page

		handleCommand(transcript); // Appel de la fonction pour traiter le texte
	};

	// Gestion des erreurs
	recognition.onerror = (event) => {
		console.error("Erreur de reconnaissance vocale :", event.error);
	};

	// Fonction pour gérer les commandes reconnues
	function handleCommand(command) {
		if (command.includes("jaune")) {
			alert("Le navigateur va s'ouvrir !");
			// Exemple : Ouvrir Google dans un nouvel onglet
			window.open("https://www.google.com");
		} else if (command.includes("éteindre la lumière")) {
			alert("La lumière va s'éteindre !");
		} else if (command.includes("allumer la télé")) {
			alert("La télé va s'allumer !");
		} else {
			alert("Commande inconnue.");
		}
	}
}
