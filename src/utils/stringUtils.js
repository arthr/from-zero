/**
 * Sanitiza um texto para uso como identificador
 * @param {string} text - Texto para ser sanitizado
 * @returns {string} String sanitizada segura para uso como ID
 */
export const sanitizeForId = (text) => {
	if (!text) return "unknown";

	// Remove acentos
	const withoutAccents = text
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "");

	// Remove caracteres especiais e espaços, substitui por hífen
	return withoutAccents
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, "") // Remove caracteres não alfanuméricos
		.replace(/\s+/g, "-") // Substitui espaços por hífens
		.replace(/-+/g, "-") // Evita hífens repetidos
		.replace(/^-+|-+$/g, ""); // Remove hífens do início e fim
};

/**
 * Trunca uma string para um tamanho máximo, adicionando reticências se necessário
 * @param {string} text - Texto para truncar
 * @param {number} maxLength - Tamanho máximo desejado
 * @returns {string} String truncada
 */
export const truncateText = (text, maxLength = 50) => {
	if (!text || text.length <= maxLength) return text;
	return text.substring(0, maxLength) + "...";
};
