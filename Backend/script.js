const express = require("express");
const app = express();
app.use(express.json());

app.post("/api/voice", (req, res) => {
	const userInput = req.body.text.toLowerCase(); // Texte envoyé par le frontend

	// Logique simple
	let reply;
	if (userInput.includes("bonjour")) {
		reply = "Bonjour ! Comment puis-je vous aider ?";
	} else if (userInput.includes("heure")) {
		reply = `Il est ${new Date().toLocaleTimeString()}`;
	} else {
		reply = "Je ne suis pas sûr de comprendre.";
	}

	// Réponse au frontend
	res.json({ reply });
});

// Lancement du serveur
app.listen(3000, () => console.log("Backend actif sur http://localhost:3000"));
