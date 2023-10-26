const axios = require('axios');
const fs = require('fs');

function getAllProductIds() {
    const headers = {
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'fr,fr-FR;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
    'oidc-client-id': 'web__paris2024-org',
    'Origin': 'https://tickets.paris2024.org',
    'Referer': 'https://tickets.paris2024.org/',
    'sec-ch-ua': 'Chromium";v="118", "Microsoft Edge";v="118", "Not=A?Brand";v="99',
    'sec-ch-ua-mobile': '?O',
    'sec-ch-ua-platform': 'Windows',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'cross-site',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36 Edg/118.0.2088.61',
    };

    const baseURL = 'https://public-api.eventim.com/websearch/search/api/exploration/v1/products?webId=web__paris2024-org&language=fr&retail_partner=24R&sort=Recommendation&promoter_ids=1229503';  // Remplacez par l'URL de base de votre requête
    const totalPages = 11;

    // Créez un tableau de promesses pour chaque page
    const promises = Array.from({ length: totalPages }, (_, i) => {
        const page = i + 1;  // Les pages commencent généralement à 1
        return axios.get(`${baseURL}&page=${page}`, { headers: headers });
    });

    // Exécutez toutes les promesses en parallèle
    Promise.all(promises)
        .then(responses => {
            // Combinez les données de toutes les pages
            const allProducts = responses.flatMap(response => response.data.products);

            // Traitez les données si nécessaire (par exemple, en utilisant .map())
            const billets = allProducts.map(product => {
                return {
                    productId: product.productId,
                    productGroupId: product.productGroupId,
                    name: product.name,
                    description: product.description,
                    status: product.status,
                    imageUrl: product.imageUrl,
                    startDate: product.typeAttributes.liveEntertainment.startDate,
                    stadium: product.typeAttributes.liveEntertainment.location.name,
                    city: product.typeAttributes.liveEntertainment.location.city,
                };
            });

            // Écrivez les données combinées dans un fichier JSON
            fs.writeFile('JSON/billets.json', JSON.stringify(billets, null, 2), (err) => {
                if (err) {
                    console.error('Erreur lors de l\'écriture du fichier:', err);
                } else {
                    console.log('Données sauvegardées avec succès dans billets.json');
                }
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);
        });
    }

module.exports = {
    getAllProductIds
};