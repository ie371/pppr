export default {
	state: {
		rekvizits: {
			name_prj: '',
			cod: '',
			name_ooo: '',
			GIP: '',
			razr: '',
			prov: '',
			tcontr: '',
			ncontr: '',
			adress: '',
			tip_obj: '',
			zakazchik: '',
			abonent: '',
			istochnik: '',
			resurscomp: '',
			checkTiul: 1
		}
	},

	getters: {
		// getRekv: (state) => state.rekv,
		// getSk: (state) => state.sk
	},
	actions: {
		LOAD_REKV(context, p) {
			context.commit('MU_REKV', p);
		}
	},
	mutations: {
		MU_REKV(state, payload) {
			state.rekvizits = payload;
		}
	}
};
