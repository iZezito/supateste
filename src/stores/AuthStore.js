import {makeAutoObservable} from "mobx";
import supabase from "../services/config.js";

class AuthStore {
    user = null;
    rootStore;
    loginForm = {
        email: '',
        password: '',
    }
    constructor(rootStore){
        this.rootStore = rootStore;
        this.getUser();
        makeAutoObservable(this);
    }

    changeLoginForm(key, value){
        this.loginForm[key] = value;
    }

    async getUser(){
        const { data: { user } } = await supabase.auth.getUser();
        if(user){
            this.user = user;
        }
    }

    async login() {
        const {data, error} = supabase.auth.signInWithPassword({
            email: this.loginForm.email,
            password: this.loginForm.password,
        });
        if(error) {
            console.log(error);
        } else {
            console.log(data);
        }
    }
}


export default AuthStore;
