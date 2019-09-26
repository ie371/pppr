export default {
	state: {
		rescalc_hvs: {
			gdr: { Gv: '', V: '', du_im: 0 }
		}
	},
	actions: {
		CHANGE_RASH_HVS(context, R) {
			context.commit('RASH_HVS', R);
		},
		RESULT_HVS(context, ek) {
			context.commit('RESCALC_HVS', ek);
		},
		HVS_NULL(context) {
			context.commit('HVSNULL');
		}
	},

	mutations: {
		RESCALC_HVS(state, payload) {
			if (payload.result.gdr) {
				state.rescalc_hvs.gdr = payload.result.gdr;
			}
		},

		RASH_HVS(state, payload) {
			state.rescalc_hvs.gdr = payload.result.gdr;
		},
		HVSNULL(state) {
			state.rescalc_hvs.gdr = { Gv: '', V: '', du_im: 0 };
		}
	}
};
