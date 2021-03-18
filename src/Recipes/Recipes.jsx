import React from 'react';
import styles from './recipes.module.css';
import { RecipeItem } from '../RecipeItem/';

const Recipes = ({data = []}) => {
    return (
        <div>
            <h1 className={styles.recipeTitle}>Recipes</h1>
            <ul className={styles.recipeList}>
                {data.map(recipe => (
                    <RecipeItem key={recipe.uuid} recipe={recipe}/>
                ))}
            </ul>
        </div>
    )
}

export default Recipes;