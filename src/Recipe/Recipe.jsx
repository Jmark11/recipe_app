import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './recipe.module.css';

import { useParams } from 'react-router-dom';

const Recipe = ({ data = {} }) => {
    const [specials, setSpecials] = useState([]);
    const { uuid } = useParams();
    const recipe = data.find(p => p.uuid === uuid);
    let recipeData;

    useEffect(() => {
        getSpecials();
    },[])

    const getSpecials = () => {
        axios.get('http://localhost:3001/specials/')
            .then(res => setSpecials(res.data))
    }
    if (recipe) {
        recipeData = (
            <div className={styles.singleRecipe}>
                <div className={styles.imgBlock}><img src={`http://localhost:3001${recipe.images.full}`} alt="" /></div>
                <div className={styles.textBlock}>
                    <h1 className={styles.title}>{recipe.title}</h1>
                    <p className={styles.desc}>{recipe.description}</p>
                    <ul className={styles.detailsBlock}>
                        <li>{`${recipe.servings} Servings`}</li>
                        <li>{`${recipe.prepTime} Minutes Preparation Time`}</li>
                        <li>{`${recipe.cookTime} Minutes Cooking Time`}</li>
                    </ul>
                    <div className={styles.ingredientsBlock}>
                        <h2>Ingredients</h2>
                        <ul>
                            {recipe.ingredients.map(ingredient => (
                                <li key={ingredient.uuid}>
                                    {typeof ingredient.amount === 'number' && `${ingredient.amount} `}{`${ingredient.measurement} ${ingredient.name}`}
                                    {specials.map(special => (
                                        special.ingredientId === ingredient.uuid && 
                                        <p key={special.uuid} className={styles.specialTag}>
                                            <span>Special!</span>
                                            <span>{special.title}</span>
                                            <span>{special.type}</span>
                                            {special.text && <span>{special.text}</span>}
                                        </p>
                                    ))}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.directionsBlock}>
                        <h2>Directions</h2>
                        <ol>
                            {recipe.directions.map((direction, index) => (
                                <li key={index+1}>{`${direction.instructions}`} {direction.optional && <span className={styles.optionalTag}>*optional</span>}</li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        );
    } else {
        recipeData = <h2> Sorry. recipe doesn't exist </h2>;
    }

    return (
        <div>
            {recipeData}
        </div>
    )
}

export default Recipe;