import firebase from 'firebase';

const state = {
    userProfile: {},
    loggedIn: false
};

const getters = {
    userProfile: ({ userProfile }) => userProfile,
    loggedIn: ({ loggedIn }) => loggedIn,
};

const mutations = {};

const actions = {
    async login(store) {
        if (store.state.loggedIn) return;

        const provider = new firebase.auth.GoogleAuthProvider();
        try {
            await firebase.auth().signInWithPopup(provider);
        } catch (error) {
            console.log(error)
        }
    },

    async logout() {

    }
}

export default { 
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}