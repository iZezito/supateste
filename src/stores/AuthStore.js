import {makeAutoObservable} from "mobx";
import supabase from "../services/config.js";

class AuthStore {
    user = null;
    rootStore;
    constructor(rootStore){
        this.rootStore = rootStore;
        this.getUser();
        makeAutoObservable(this);
    }

    async getUser(){
        const { data: { user } } = await supabase.auth.getUser();
        if(user){
            this.user = user;
        }
    }

    async login(){
        const { user, session, error } = await supabase.auth.signInWithOAuth({
            provider: 'google'
        });
        if(user){
            this.user = user;
        }
    }
}


export default AuthStore;
