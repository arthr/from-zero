export const pagesData = [
	{
		id: "home",
		title: "Home",
		icon: "🏠", // Opcional: poderia ser usado para exibir ícones na navegação
		order: 1, // Para garantir a ordem correta na navegação
		content: {
			title: "Bem-vindo ao GameHub",
			description: "Esta é a página inicial do nosso projeto de jogo.",
			sections: [
				{
					text: "Explore as diferentes seções usando o menu de navegação.",
				},
			],
		},
	},
	{
		id: "jogo",
		title: "O Jogo",
		icon: "🎮",
		order: 2,
		content: {
			title: "Sobre o Jogo",
			description:
				"Aqui você encontrará informações sobre as mecânicas do jogo.",
			sections: [
				{
					text: "Volte para a tela principal para jogar!",
				},
			],
		},
	},
	{
		id: "ranking",
		title: "Ranking",
		icon: "🏆",
		order: 3,
		content: {
			title: "Ranking de Jogadores",
			description: "O ranking será implementado em breve.",
			sections: [
				{
					type: "list",
					items: [
						"Jogador 1 - 1000 pontos",
						"Jogador 2 - 850 pontos",
						"Jogador 3 - 720 pontos",
					],
				},
			],
		},
	},
	{
		id: "config",
		title: "Configurações",
		icon: "⚙️",
		order: 4,
		content: {
			title: "Configurações",
			description:
				"Aqui você poderá personalizar as configurações do jogo.",
			sections: [
				{
					title: "Algumas configurações estarão disponíveis em breve:",
					type: "list",
					items: [
						"Configurações de áudio",
						"Configurações gráficas",
						"Preferências de jogabilidade",
					],
				},
			],
		},
	},
];
