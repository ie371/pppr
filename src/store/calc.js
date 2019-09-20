export default {
	state: {
		rescalc: {
			OT: {},
			gdr1: { Gv: '', V: '', du_im: 0 },
			gdr2: { Gv: '', V: '', du_im: 0 },
			gdr9: { Gv: '', V: '', du_im: 0 },
			gdr3: { Gv: '', V: '', du_im: 0 },
			gdr4: { Gv: '', V: '', du_im: 0 },
			Ggvs: {}
		}
	},
	actions: {
		TUPIC(context) {
			context.commit('TUPIK');
		},
		CHANGE_RASH(context, R) {
			context.commit('RASH', R);
		},
		RESULT(context, ek) {
			context.commit('RESCALC', ek);
		},
		OT_NULL(context) {
			context.commit('OTNULL');
		},
		GVS_NULL(context) {
			context.commit('GVSNULL');
		}
	},

	mutations: {
		RESCALC(state, payload) {
			if (payload.result.gdr1) {
				state.rescalc.OT = payload.result.OT;
				state.rescalc.gdr1 = payload.result.gdr1;
				state.rescalc.gdr2 = payload.result.gdr2;
				state.rescalc.gdr9 = payload.result.gdr9;
			}
			if (payload.result.gdr3) {
				state.rescalc.gdr3 = payload.result.gdr3;
				state.rescalc.Ggvs = payload.result.Ggvs;
				state.rescalc.gdr4 = payload.result.gdr4;
				state.rescalc.Ggvs = payload.result.Ggvs;
			}
		},
		TUPIK(state) {
			state.rescalc.gdr4 = { Gv: '', V: '', du_im: 0 };
		},
		RASH(state, payload) {
			if (payload.d === 't1') {
				state.rescalc.gdr1 = payload.result.gdr1;
				state.rescalc.gdr2 = payload.result.gdr2;
				state.rescalc.gdr9 = payload.result.gdr9;
			}
			if (payload.d === 't3') {
				state.rescalc.gdr3 = payload.result.gdr3;
				state.rescalc.gdr4 = payload.result.gdr4;
			}
			if (payload.d === 't4') {
				state.rescalc.gdr4 = payload.result.gdr4;
			}
		},
		OTNULL(state) {
			state.rescalc.OT = {};
			state.rescalc.gdr1 = { Gv: '', V: '', du_im: 0 };
			state.rescalc.gdr2 = { Gv: '', V: '', du_im: 0 };
			state.rescalc.gdr9 = { Gv: '', V: '', du_im: 0 };
		},
		GVSNULL(state) {
			state.rescalc.Ggvs = {};
			state.rescalc.gdr3 = { Gv: '', V: '', du_im: 0 };
			state.rescalc.gdr4 = { Gv: '', V: '', du_im: 0 };
		}
	}
};
