import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {RootStoreProvider} from "./stores/RootStore.jsx";
import {BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
    <RootStoreProvider>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </RootStoreProvider>
)
