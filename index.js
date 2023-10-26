const axios = require('axios');
const fs = require('fs');
const { Client, Intents, MessageEmbed } = require('discord.js')

require('dotenv').config()

const { getAllProductIds } = require('./getBillets.js');
const { formatDate, htmlToDiscordFormat, generateBilletURL} = require('./format.js')

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const serverInfo = new Map(); // Serveur ID -> Informations

const baseLink = 'https://tickets.paris2024.org/api/event/additionalInfo?language=fr&affiliate=24R&withCrossedOutPrices=true&withEventMarkup=false&'

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    loadServerInfo()
    fetchDataAndDetectChanges()
    setInterval(fetchDataAndDetectChanges, 60 * 1000);
  });

function readData() {
    // 1. Lire le fichier JSON
    const data = fs.readFileSync('JSON/billets.json', 'utf8');
    const jsonData = JSON.parse(data);

    // 2. Extraire chaque productId et le stocker dans un tableau
    const productIds = jsonData.map(item => item.productId);

    // Divisez les productIds en 7 groupes
    const chunks = [];
    for (let i = 0; i < productIds.length; i += 100) {
        chunks.push(productIds.slice(i, i + 100));
    }
    return chunks;
}

// Pour stocker les données dans un fichier JSON
let combinedData = [];

// Fonction pour exécuter la requête pour un groupe de productIds
async function fetchChunk(chunk) {
    const url = baseLink + chunk.map(id => `evid=${id}`).join('&');
    try {
        const response = await axios.get(url, {headers: headers});
        combinedData = combinedData.concat(response.data);
    } catch (error) {
        console.error("Erreur lors de l'exécution de la requête pour le chunk :", chunk, error);
    }
}

const headers = {
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'fr,fr-FR;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
    'Referer': 'https://tickets.paris2024.org/search/?affiliate=24R&inStock=false',
    'sec-ch-ua': 'Chromium";v="118", "Microsoft Edge";v="118", "Not=A?Brand";v="99',
    'sec-ch-ua-mobile': '?O',
    'sec-ch-ua-platform': 'Windows',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'cross-site',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36 Edg/118.0.2088.61',
};

async function createDisponibiliteFile() {
    const chunks = readData();
    for (const chunk of chunks) {
        await fetchChunk(chunk);
    }
    const combinedObject = Object.assign({}, ...combinedData);

    const data = fs.readFileSync('JSON/disponibilite.json', 'utf8');
    const previousData = JSON.parse(data);

    // Stockez les données combinées dans un fichier JSON
    fs.writeFileSync('JSON/disponibilite.json', JSON.stringify(combinedObject, null, 2));
    console.log("Données combinées stockées avec succès dans disponibilite.json");

    return previousData;
};

// Fonction pour détecter les changements
function detectChanges(newData, previousData) {
    const changes = [];
    for (let productId in previousData) {
        const prevProduct = previousData[productId];
        const newProduct = newData[productId];

        // Si le billet passe de "Indisponible pour le moment" à "Disponible (billets PFR)" et que le "price" est un nombre
        if (prevProduct.message === "Indisponible pour le moment" && newProduct.message === "Disponible (billets PFR)" && typeof newProduct.price === "number") {
            changes.push({ productId, typeBillet: 'normal' });
        }

        // Si le billet passe de "Indisponible pour le moment" à "Disponible (billets PFR)" et que le "price" est null
        if (prevProduct.message === "Indisponible pour le moment" && newProduct.message === "Disponible (billets PFR)" && newProduct.price === null) {
            changes.push({ productId, typeBillet: 'PFR' });
        }

        // Si un billet avait un "message" de "Disponible (billets PFR)" (et était donc un billet PFR) et que maintenant il a un "price" en tant que nombre
        if (prevProduct.message === "Disponible (billets PFR)" && typeof prevProduct.price !== "number" && typeof newProduct.price === "number") {
            changes.push({ productId, typeBillet: 'normal' });
        }
    }

    return changes;
}


// Fonction pour effectuer les requêtes et détecter les changements
async function fetchDataAndDetectChanges() {
    getAllProductIds();
    const previousData = await createDisponibiliteFile();
    // 1. Lire le fichier JSON
    const data = fs.readFileSync('JSON/disponibilite.json', 'utf8');
    const newData = JSON.parse(data);

    const changes = detectChanges(newData, previousData);
    serverInfo.forEach(async (info) => {
        if (info.activeCheck) {
            const channel = await client.channels.fetch(info.channelId);

            if (changes.length > 0) {
                console.log("Envoi des messages à chaque utilisateur Discord.");
                notifyChanges(channel, info.userMention, changes);
            }
            else {
                console.log("Aucun changement détecté pour ", info.userMention);
            }
        }
    });
    console.log("Attente...")
}   

function notifyChanges(channel, userMention, changes) {
    if (changes.length > 0) {
        let billets;
        let disponibilites;
        try {
            billets = JSON.parse(fs.readFileSync('JSON/billets.json', 'utf8'));
            disponibilites = JSON.parse(fs.readFileSync('JSON/disponibilite.json', 'utf8'));
        } catch (error) {
            console.error('Erreur lors de la lecture du fichier billets.json :', error);
            return;
        }

        changes.forEach((change) => {
            // Rechercher les informations du productId
            const billet = billets.find(b => b.productId === change.productId);
            const disponibilite = disponibilites[change.productId];
            if (!billet) {
                console.error(`Aucun billet trouvé pour le productId ${change.productId}`);
                return;
            }

            const embed = new MessageEmbed()
            .setTitle(billet.name)
            .setDescription(htmlToDiscordFormat(billet.description))
            .setThumbnail(billet.imageUrl)
            .addFields(
                {name: 'Stade', value: billet.stadium, inline: true},
                {name: 'Ville', value: billet.city, inline: true},
                {name: 'Date', value: formatDate(billet.startDate), inline: true},
            )
            .setURL(generateBilletURL(billet))
            .setColor('#0099ff')
            .setTimestamp();

            // Si c'est un billet PFR, ajoutez le champ "Type de billet"
            if (change.typeBillet === 'PFR') {
                embed.addFields({name: 'Type de billet', value: 'PFR (Personnes à fauteuil roulant)'});
            } else {
                // Sinon, ajoutez le champ "Prix"
                const priceField = disponibilite.fromPrice || 'Prix non disponible';
                embed.addFields({name: 'Prix minimal', value: priceField});
            }

            channel.send(`${userMention} Voici les changements détectés :`)
            channel.send({ embeds: [embed] });
            console.log(`Changements envoyés à ${userMention}`)
        });
    }
}

// Au démarrage du bot, charger les données depuis le fichier JSON
async function loadServerInfo() {
    try {
        const jsonData = fs.readFileSync('JSON/server_info.json', 'utf-8');
        const parsedData = JSON.parse(jsonData);

        for (const [serverId, info] of Object.entries(parsedData)) {
            serverInfo.set(serverId, info);
        }

        console.log('Données chargées depuis le fichier JSON.');
        return serverInfo;

    } catch (error) {
        console.error('Erreur lors du chargement des données depuis le fichier JSON :', error);
    }

}

client.login(process.env.TOKEN_ID);