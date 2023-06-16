user = {
	id: 'dsaasdadsadsasdaadsads',
	username: '',
	full_name: 'Juan Gonzalez',
	email: 'juangonzalez@gmail.com',
	pw_hash: 'sadadsadsasdsadads',
	organization: 'Construccion S.A.',
	profession: 'Arquitecto',
	verification_code: 'asdadsasdadssadsad',
}

client = {
	id: 'dsaasdasdasdadsasd',
	full_name: 'Sherekhan',
	district: '',
	province: '',
	departament: '',
	organization: '',
	RUC: 123123123,
	contact: [
		{
			name: 'Jose carlos',
			phone: '+598097493998',
			email: 'josecarlos@gmail.com',
		},
		{
			name: 'jose luis',
			phone: '+59589489489498',
			email: 'joseluis@gmail.com',
		},
	],
}

project = {
	id: 'dsaadsadsadsas',
	permission: {
		edit: ['asadsadsasdas', 'gfdsfgdfgdfgdf'],
		comment: ['gfdsfgdfgdfgdf'],
		view: ['gfdsfgdfgdfgdf'],
	},
	budgetBlock: 'budgetBlockID',
	currency: '',
	direct_cost: 123123123,
	status: 'progress',
	address: 'asdadsasdasdads',
	district: 'asdadsasdasdads',
	province: 'asdadsasdasdads',
	department: 'asdadsasdasdads',
	initial_budget: 12312132,
	workday: 8,
	code: '2023-001',
	name: 'Shopping Tres Cruces',
}

indiceUnificado = {
	id: 'asdadsadsadsasd',
	name: 'Mano de Obra',
	index: '47',
}

//Este supply hace referencia a los que son propios de la base de datos, NO de usuarios
supply = {
	id: 'adsasdasdasdadssad',
	name: 'Peon',
	price: 2.5,
	image: 'imagen.com',
	urlPriceFound: 'pricefound.com',
	type: 'Mano de obra',
	indiceUnificado: '', //ref al id de la tabla de indice unificado que corresponda
}

//Este es un insumo propio del proyecto, si lo modifico tiene que afectar al proyecto completo pero no
//a la base de datos general o los supply del usuario
//cada vez que el usuario selecciona un insumo para su proyecto se crea una copia y se guarda en su
//"base de datos personal de proyecto"
//Primero chequear si ese insumo no está ya dentro de la lista de insumos de proyecto
project_supply = {
	id: 'asdadasasdasdads',
	refId: 'adsasdasd', //El id del insumo original para poder chequear si esta repetido
	projectID: '', //ref al proyecto al que pertenece este insumo
	name: 'Capataz',
	price: 1.5,
	image: 'imagen.com',
	urlPriceFound: 'pricefound.com',
	type: 'Mano de obra',
	indiceUnificado: '', //ref al id de la tabla de indice unificado que corresponda
}

//Este es un insumo propio del usuario, son distintos a los de proyecto, porque el usuario los puede crear
//para reutilizar en otro proyecto, son de su base de datos personal
//Estos deberían ser modificables solo fuera del proyecto y cuando se seleccionan para ser usados
//dentro de un proyecto se tiene que hacer una copia y "transformarlo" en un project suppply

user_supply = {
	id: 'asdadasasdasdads',
	userID: '', //ref al user al que pertenece este insumo
	name: 'Capataz',
	price: 1.5,
	image: 'imagen.com',
	urlPriceFound: 'pricefound.com',
	type: 'Mano de obra',
	indiceUnificado: '', //ref al id de la tabla de indice unificado que corresponda
}

budgetBlock = {
	id: 'saasdadsasd',
	code: '01',
	projectID: '', //ref al proyecto al que pertenece
}

budgetVersion = {
	id: 'asdasdasdasdasd',
	code: '01',
	budgetBlock: '', // ref al budgetBlock al que pertenece
	name: 'Shopping versión 1',
}

subBudget = {
	id: 'dfsasdasdas',
	name: 'Arquitectura',
	budgetVersion: '', //ref al budgetVersion al que pertenece
}

title = {
	id: 'dfsasdasdas',
	name: 'Muro de ladrillos de concreto',
	items: ['sa45342dfasd2asdas', 'asd33543523dsas', 'faasda3342312dsa'],
	subBudget: '', // ref al subbugdet al que pertenece
}

//Igual que pasa con los insumos los items son las partidas, estas tambien pueden ser las cargadas por la base de datos
//Entonces cuando se selecciona una partida prehecha hay que hacer una copia para el proyecto
//La copia de la partida tiene que generar la copia de los insumos, y cuando quiera usar insumos en otra partida
//o traiga otra partida con mismo insumos, no tiene que copiar los insumos existentes
item = {
	id: 'asffdvcxvcxvcxa<a',
	name: '',
	subItems: [''], //array de ids a otras partidas por si tiene una subpartida
	supplies: [''], //array de supplies referenciando a los de la base de datos general
}

//Estas son las partidas perteneciente a
user_item = {
	id: 'asffdvcxvcxvcxa<a',
	name: '',
	subItems: [''], //array de ids a otras partidas por si tiene una subpartida , buscar entre los propios y la general
	supplies: [''], //array de supplies referenciando a los de la base de datos general o los suyos propios
}

project_item = {
	id: 'sa45342dfasd2asdas',
	title: '', // ref al id del title al que pertenece
	name: 'MURO DE LADRILLO TUBULAR DE ARCILLA (12X15X24 CM.) ASENTADO DE CANTO',
	subItems: ['asd543fgdsfas', 'nbv56456bcvsd'], // para encontrar los subItems hay que ver si los ides existen en la tabla items
	//si existen se trae la información y se chequea si ese nuevo "subitem" tiene ids en su propio "subitem" y se vuelve a buscar en la tabla
	//así una y otra vez
	projectSupplies: ['12fdgsfdg21df6g5', '54fsd56sd4f6sdsdfcxzv'],
}

comment = {
	id: 'asdas2q23weq',
	project_id: 'dsadsasdadsadsads',
	cell_id: {
		budgetBlock: {
			budgetVersion: {
				subBudget: {
					title: {
						projectItem: {
							project_supply: 'fadsdfsasdfsaafds', // El comentario se va a asociar con un insumo de una partida
							//Así que hay que referenciarlo bien desde el comienzo.
						},
					},
				},
			},
		},
	},
	author_id: 'asdasdsadads', // ref al user que hizo el comentario
	content: 'No podes explotar asi a tus empleados, pagales mas',
}

// Como debería verse el json donde se traiga toda la info??

ejemplo_proyecto_nuevo = {
	id: 'd3e33763-c4fd-44f3-90f8-fd03c7384157',
	permission: {
		edit: ['asadsadsasdas', 'gfdsfgdfgdfgdf'],
		comment: ['gfdsfgdfgdfgdf'],
		view: ['gfdsfgdfgdfgdf'],
	},
	budgetBlock: {
		id: 'b166a112-2c4e-481c-9ac7-f2b402bea9df',
		code: '01',
		projectID: 'd3e33763-c4fd-44f3-90f8-fd03c7384157', //ref al proyecto al que pertenece
		//relación con una version de cotizacion
		budget_version: {
			id: 'd9c93f58-6910-4984-aaeb-dfd62bea107e',
			code: '01',
			budgetBlock: 'b166a112-2c4e-481c-9ac7-f2b402bea9df', // ref al budgetBlock al que pertenece
			name: 'Shopping versión 1',
			subBudget: {
				id: '239a754f-b8fe-47e1-8974-ac7b4a166497',
				name: 'Arquitectura',
				budgetVersion: 'd9c93f58-6910-4984-aaeb-dfd62bea107e', //ref al budgetVersion al que pertenece
				title: {
					id: 'f219827f-ccf3-4c14-abf4-5dca48cc119b',
					name: 'Muro de ladrillos de concreto',
					subBudget: '239a754f-b8fe-47e1-8974-ac7b4a166497', // ref al subbugdet al que pertenece
					project_item: [
						{
							id: '7af5eb28-6dce-4d8c-8126-d90073f23a24',
							titleId: 'f219827f-ccf3-4c14-abf4-5dca48cc119b', // ref al id del title al que pertenece
							name: 'MURO DE LADRILLO TUBULAR DE ARCILLA (12X15X24 CM.) ASENTADO DE CANTO',
							subItems: [
								{
									id: 'd69d708a-737a-4a61-9eab-07df1fd58d8c',
									titleId: 'f219827f-ccf3-4c14-abf4-5dca48cc119b', // ref al id del title al que pertenece
									name: 'MURO DE LADRILLO TUBULAR DE ARCILLA (12X15X24 CM.) ASENTADO DE CANTO',
									subItems: [], // para encontrar los subItems hay que ver si los ides existen en la tabla items
									//si existen se trae la información y se chequea si ese nuevo "subitem" tiene ids en su propio "subitem" y se vuelve a buscar en la tabla
									//así una y otra vez
									projectSupplies: [
										{
											refId: {
											id: 'ed09a35d-f18b-4117-8484-6cb19508a58b',
											refId: 'adsasdasd', //El id del insumo original para poder chequear si esta repetido
											projectID: 'd3e33763-c4fd-44f3-90f8-fd03c7384157', //ref al proyecto al que pertenece este insumo
											name: 'Capataz',
											price: 1.5,
											image: 'imagen.com',
											urlPriceFound: 'pricefound.com',
											type: 'Mano de obra',
											indiceUnificado: {
                                                id: 'asdadsadsadsasd',
                                                name: 'Mano de Obra',
                                                index: '47',
                                            } },
											quantity: 30

										},
									],
								},
							], // para encontrar los subItems hay que ver si los ides existen en la tabla items
							//si existen se trae la información y se chequea si ese nuevo "subitem" tiene ids en su propio "subitem" y se vuelve a buscar en la tabla
							//así una y otra vez
							projectSupplies: [
                                {
                                    id: 'ed09a35d-f18b-4117-8484-6cb19508a58b',
                                    refId: 'adsasdasd', //El id del insumo original para poder chequear si esta repetido
                                    projectID: 'd3e33763-c4fd-44f3-90f8-fd03c7384157', //ref al proyecto al que pertenece este insumo
                                    name: 'Capataz',
                                    price: 1.5,
                                    image: 'imagen.com',
                                    urlPriceFound: 'pricefound.com',
                                    type: 'Mano de obra',
                                    indiceUnificado: {
                                        id: 'asdadsadsadsasd',
                                        name: 'Mano de Obra',
                                        index: '47',
                                    }
                                },
                            ],
						},
					],
				},
			},
		},
	},
	currency: 'USD',
	direct_cost: 123123123,
	status: 'progress',
	address: 'asdadsasdasdads',
	district: 'asdadsasdasdads',
	province: 'asdadsasdasdads',
	department: 'asdadsasdasdads',
	initial_budget: 10000,
	workday: 8,
	code: '2023-001',
	name: 'Shopping Tres Cruces',
}
