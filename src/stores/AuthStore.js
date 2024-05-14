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
            this.user = {}
        }
    }

    async loginWithProvider(provider){
        const { user, session, error } = await supabase.auth.signInWithOAuth({
            provider: provider
        });
        if(error){
            console.log(error);
        }else{
            this.user = user;
        }
    }
}


export default AuthStore;
