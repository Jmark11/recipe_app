import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './reset.css';
import { Recipes } from './Recipes';
import { Recipe } from './Recipe';

const App = () => {

    const [recipes, setRecipes] = useState([]);


    useEffect(() => {
        getRecipes();
    }, [])

    const getRecipes = () => {
        axios.get('http://localhost:3001/recipes/')
            .then(res => setRecipes(res.data))
    }

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/recipes/:uuid">
                    <Recipe data={recipes} />
                </Route>
                <Route path="/recipes">
                    <Recipes data={recipes} />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

ReactDOM.render(<App />, document.getElementById("root"));