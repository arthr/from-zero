/**
 * Calcula a duração da animação com base no valor e no valor máximo
 * @param {number} value - Valor atual
 * @param {number} maxValue - Valor máximo
 * @param {number} minDuration - Duração mínima em ms (padrão: 500ms)
 * @param {number} maxDuration - Duração máxima em ms (padrão: 3000ms)
 * @returns {number} Duração da animação em ms
 */
export const calculateDuration = (
	value,
	maxValue,
	minDuration = 500,
	maxDuration = 3000
) => {
	if (maxValue === 0) return minDuration; // Evita divisão por zero
	const duration = (value / maxValue) * 2000; // Base de 2000ms para 100%
	return Math.min(Math.max(duration, minDuration), maxDuration); // Limita entre min e max
};

/**
 * Calcula o step relativo ao valor e ao valor máximo
 * @param {number} value - Valor atual
 * @param {number} maxValue - Valor máximo
 * @returns {number} Step calculado
 */
export const calculateStep = (value, maxValue) => {
	return Math.max(Math.ceil(value / 100), Math.ceil(maxValue / 10000), 1);
};
