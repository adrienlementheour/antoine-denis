import Vuex from 'vuex';
import Prismic from 'prismic-javascript';

const createStore = () => {
    return new Vuex.Store({
        state: () => ({
            layout: {}
        }),
        mutations: {
            setLayout(state, layout) {
                state.layout = layout.results[0].data;
            }
        },
        actions: {
            async nuxtServerInit({ commit }) {
                const apiEndpoint = 'https://antoine-denis.cdn.prismic.io/api/v2';
                const api = await Prismic.getApi(apiEndpoint);
                commit('setLayout', await api.query(Prismic.Predicates.at('document.type', 'home')));
            }
        }
    });
};

export default createStore;
