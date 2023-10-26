const { format, parseISO } = require('date-fns');
const { fr } = require('date-fns/locale');

function formatDate(dateString) {
    const date = parseISO(dateString);
    return format(date, "d MMMM yyyy 'à' HH'h'mm", { locale: fr });
}

function htmlToDiscordFormat(htmlString) {
    let formattedString = htmlString;

    // Convertir les balises <br> en sauts de ligne
    formattedString = formattedString.replace(/<br\s*\/?>/gi, '\n');

    // Convertir les balises <b> ou <strong> en ** pour le texte en gras
    formattedString = formattedString.replace(/<b>/gi, '**').replace(/<\/b>/gi, '**');
    formattedString = formattedString.replace(/<strong>/gi, '**').replace(/<\/strong>/gi, '**');

    // Convertir les balises <i> ou <em> en * pour le texte en italique
    formattedString = formattedString.replace(/<i>/gi, '*').replace(/<\/i>/gi, '*');
    formattedString = formattedString.replace(/<em>/gi, '*').replace(/<\/em>/gi, '*');

    // Convertir les balises <u> en __ pour le texte souligné
    formattedString = formattedString.replace(/<u>/gi, '__').replace(/<\/u>/gi, '__');

    return formattedString;
}

function formatUrlSegment(segment) {
    // Convertir en minuscules
    segment = segment.toLowerCase();

    // Remplacer les espaces par des tirets
    segment = segment.replace(/\s+/g, '-');

    // Supprimer les caractères non désirés tout en conservant les caractères accentués courants
    segment = segment.replace(/[^a-z0-9-éèêëàâäôöûüç]/g, '');

    return segment;
}

function generateBilletURL(billet) {
    // Convertir tout en minuscule, remplacer les espaces par des tirets et supprimer les caractères non désirés
    const name = formatUrlSegment(billet.name)
    const stadium = formatUrlSegment(billet.stadium)
    const productId = billet.productId;

    return `https://tickets.paris2024.org/event/${name}-${stadium}-${productId}/?affiliate=24R`;
}

module.exports = {
    formatDate,
    htmlToDiscordFormat,
    generateBilletURL
};