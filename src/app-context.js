class AppContext {
    constructor() {

    }

    userToken(getter) {
        if (getter) {
            this._userToken = getter;
        } else {
            return this._userToken();
        }
    }
}

export default new AppContext();