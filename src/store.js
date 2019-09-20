import Vue from 'vue';
import Vuex from 'vuex';
import rekv from '@/store/rekv';
import calcModule from '@/store/calc';
import hvs from '@/store/hvs';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		rekv,
		calcModule,
		hvs
	},
	state: {},
	mutations: {},
	actions: {}
});
