export const chatData = {
	messages: [
		{
			id: 1,
			sender: "TopPlayer",
			text: "Alguém disponível para jogar?",
			time: "10:30",
		},
		{ id: 2, sender: "GameMaster", text: "Eu estou!", time: "10:31" },
		{
			id: 3,
			sender: "Player One",
			text: "Vamos fazer um grupo?",
			time: "10:32",
			isCurrentUser: true,
		},
		{ id: 4, sender: "TopPlayer", text: "Boa ideia!", time: "10:33" },
	],
	activities: [
		{
			id: 1,
			user: "TopPlayer",
			action: "completou uma missão",
			time: "5 min atrás",
		},
		{
			id: 2,
			user: "GameMaster",
			action: "subiu para o nível 50",
			time: "10 min atrás",
		},
		{
			id: 3,
			user: "Challenger",
			action: "venceu uma batalha",
			time: "15 min atrás",
		},
		{
			id: 4,
			user: "Player One",
			action: "encontrou um item raro",
			time: "30 min atrás",
		},
		{
			id: 5,
			user: "ProGamer123",
			action: "estabeleceu um novo recorde",
			time: "45 min atrás",
		},
	],
	notifications: [
		{
			id: 1,
			text: "Missão completada: Resgate a princesa",
			time: "5 min atrás",
		},
		{
			id: 2,
			text: "Ganhou 100 pontos de experiência",
			time: "10 min atrás",
		},
		{ id: 3, text: "Player2 enviou uma mensagem", time: "30 min atrás" },
	],
};
