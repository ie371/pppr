export default {
	state: {
		rekv: {
			nazvPR: '',
			cod: '',
			nazvPrO: '',
			GIP: '',
			razrab: '',
			prov: '',
			tcontr: '',
			ncontr: '',
			adress: '',
			tipObj: '',
			zakazc: '',
			abon: '',
			istT: '',
			resK: ''
		},

		sk: {
			skor: '1.5'
		}
	},

	getters: {
		getRekv: (state) => state.rekv,
		getSk: (state) => state.sk
	},
	actions: {
		load_rekv(context, p) {
			context.commit('muRekv', p);
		}
	},
	mutations: {
		muRekv(state, payload) {
			state.rekv = payload;
		}
	}
};
