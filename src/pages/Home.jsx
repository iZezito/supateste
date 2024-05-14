import { useEffect, useState } from 'react';
import supabase from '../services/config.js';
import '../App.css';
import { observer } from "mobx-react-lite";
import { useRootStore } from "../stores/RootStore.jsx";

function Home() {
    const { countryStore } = useRootStore();
    const [user, setUser] = useState(null);
    const [editItemId, setEditItemId] = useState(null);

    useEffect(() => {
        countryStore.fetchCountries();
        getUser();
    }, []);

    const getUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
    };

    const login = async () => {
        const { user, session, error } = await supabase.auth.signInWithOAuth({
            provider: 'google'
        });
        console.log(user, session, error);
    };

    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        setUser(null);
        console.log(error);
    };

    const toggleEditMode = async (itemId) => {
        setEditItemId(itemId === editItemId ? null : itemId);
        if (itemId === editItemId) {
            await countryStore.updateCountry(itemId);
            setEditItemId(null);
        } else {
            const country = countryStore.countries.find(country => country.id === itemId);
            countryStore.changeCountryEditData('id', country.id);
            countryStore.changeCountryEditData('name', country.name);
        }

    };

    const deleteCountry = async (id) => {
        await countryStore.deleteCountry(id);
    }


    return (
        <div className="container">
            <header className="my-4">
                <h1 className="text-center">Supabase Countries</h1>
                <ul className="list-group list-group-flush">
                    {countryStore.countries.map(country => (
                        <li key={country.id}
                            className="list-group-item d-flex justify-content-between align-items-center">
                            {editItemId === country.id ? (
                                <input
                                    type="text"
                                    className="form-control"
                                    value={countryStore.countryEditData.name}
                                    onChange={(e) => countryStore.changeCountryEditData('name', e.target.value)}
                                />
                            ) : (
                                country.name
                            )}
                            <div>
                                <button className="btn btn-primary me-2" onClick={() => toggleEditMode(country.id)}>
                                    {editItemId === country.id ? "Salvar" : "Editar"}
                                </button>
                                <button className="btn btn-danger" onClick={() => deleteCountry(country.id)}>Deletar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </header>
            <div className="App-content">
                <h2>Add Country</h2>
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    await countryStore.addCountry();
                }}>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" name="name" placeholder="Country name"
                               onChange={(e) => countryStore.changeFormData('name', e.target.value)}/>
                        <button className="btn btn-success" type="submit">Add</button>
                    </div>
                </form>
            </div>
            <div className="App-footer text-center my-4">
                {user ? (
                    <button className="btn btn-danger" onClick={logout}>Logout</button>
                ) : (
                    <button className="btn btn-primary" onClick={login}>Login</button>
                )}
            </div>
        </div>
    );
}

export default observer(Home);

