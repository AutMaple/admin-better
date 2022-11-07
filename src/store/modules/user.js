const state = {

}
const actions = {
    async login({commit}, userInfo) {
        const {data} = await login(userInfo);
    }
}

const mutations = {

}

const getters = {

}

export default {state, actions, mutations, getters};
