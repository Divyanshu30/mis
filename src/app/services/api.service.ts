export class ApiService {

    devMode: boolean = true;

    api = {
        // baseUrl:'http://localhost:5000/api/',
        baseUrl: 'http://203.122.46.189:8281/api/',
       // baseUrl: 'http://192.168.1.131:5000/api/',
        routes: {
            login: 'users/login',
            getAllProjects: 'project/allProjects',
            addProject: 'project/addProject',
            updateProject: 'project/updateProjectItem',
            getProjectById: 'project/getProjectById'
        }
    }

    getUrl(){
        return this.api.baseUrl
    }

    getRoute(route){
        return this.api.routes[route]
    }

    createUrl(route){
        return `${this.getUrl()}${this.getRoute(route)}`
    }

}