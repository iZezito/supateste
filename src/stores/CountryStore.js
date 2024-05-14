import {makeAutoObservable, runInAction} from "mobx";
import GenericService from "../services/GenericService.js";
import { toJS } from "mobx";


class CountryStore{
    rootStore;
    formData = {
        name: ''
    }

    countryEditData = {
        name: ''
    }

    loading = false;
    countries = [];
    countryService = new GenericService('countries');
    constructor(rootStore){
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    setLoading(value){
        runInAction(() => {
            this.loading = value;
        })
    }

    async fetchCountries(){
        this.setLoading(true);
        await this.countryService.getAll().then(response => {
            if(response.error){
                alert(response.error.message)
            }else{
                this.countries = response.data;
                console.log(this.countries);
            }
            this.setLoading(false);
        });
    }

    changeFormData(key, value){
        this.formData[key] = value;
    }

    changeCountryEditData(key, value){
        this.countryEditData[key] = value;
    }

    async addCountry(){
        await this.countryService.create(this.formData).then(response => {
            if(response.error){
                console.log(response.error);
            }else{
                this.fetchCountries();
            }
        });
    }

    async updateCountry(id){
        await this.countryService.update(id, {name: this.countryEditData.name}).then(response => {
            if(response.error){
                console.log(response.error);
            }else{
                this.fetchCountries();
            }
        });
    }

    async deleteCountry(id){
        await this.countryService.delete(id).then(response => {
            if(response.error){
                console.log(response.error);
            }else{
                this.fetchCountries();
            }
        });
    }



}

export default CountryStore;

