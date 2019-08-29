export class AuthService {

    saveAuthToken(authToken) {
        let promise = new Promise(resolve => {
            localStorage.setItem('authorizationToken', authToken)
            resolve()
        })
        return promise;
    }

    removeAuthToken(){
        let promise = new Promise(resolve => {
            localStorage.removeItem('authorizationToken')
            resolve()
        })
        return promise;
    }

    isAuthenticated(){
        if(localStorage.getItem('authorizationToken')){
            return true
        }
        return false
    }

}