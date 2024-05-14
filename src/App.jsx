import React from 'react';
import { observer } from "mobx-react-lite";
import { useRootStore } from "./stores/RootStore.jsx";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import './App.css';

const App = () => {
    const { authStore } = useRootStore();


    return(
        <Routes>
            {authStore.user && <Route path="/" element={<Home />} />}
            {!authStore.user && <Route path="*" element={<Login />} />}
        </Routes>
    )
}

export default observer(App);
