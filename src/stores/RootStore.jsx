import {createContext, useContext } from "react";
import {makeAutoObservable} from "mobx";
import CountryStore from "./CountryStore.js";
import AuthStore from "./AuthStore.js";



export class RootStore {

  countryStore = {}
  authStore = {}

  constructor() {
    this.countryStore = new CountryStore(this);
    this.authStore = new AuthStore(this);
    makeAutoObservable(this);
  }
}

const RootStoreContext = createContext({});

export const RootStoreProvider = ({children}) => {
  const store = new RootStore();
  return <RootStoreContext.Provider value={store}>{children}</RootStoreContext.Provider>;
}

export const useRootStore = () => {
  const store = useContext(RootStoreContext);
  if (!store) {
    throw new Error("useRootStore must be used within RootStoreProvider");
  }
  return store;
}
