import OpenAI from 'openai';

// Récupère la clé API depuis les variables d'environnement
const token = process.env['GITHUB_TOKEN'];

export default async function handler(req, res) {
    // Vérifie que la méthode de la requête est POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Crée un client OpenAI avec l'URL d'Azure et la clé API
    const client = new OpenAI({
        baseURL: 'https://models.inference.ai.azure.com', // URL Azure OpenAI
        apiKey: token, // Utilise le token GitHub pour l'authentification
    });

    try {
        // Récupère le message depuis le corps de la requête
        const { message } = req.body;

        // Appelle l'API OpenAI pour obtenir une réponse
        const response = await client.chat.completions.create({
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: message }, // Utilise le message fourni par l'utilisateur
            ],
            model: 'gpt-4o', // Assure-toi que le modèle est correct pour ton compte Azure
            temperature: 1,
            max_tokens: 4096,
            top_p: 1,
        });

        // Renvoie la réponse à l'utilisateur
        res.status(200).json({ response: response.choices[0].message.content });
    } catch (err) {
        // Si une erreur se produit, renvoie une erreur HTTP 500
        console.error('Error:', err);
        res.status(500).json({ error: 'An error occurred while fetching the response from OpenAI.' });
    }
}
