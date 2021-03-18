import React from 'react';
import styles from './recipeitem.module.css';
import { Link, useRouteMatch } from "react-router-dom";

const RecipeItem = ({ recipe = {} }) => {
    const { url } = useRouteMatch();
    return (
        <li className={styles.recipeItem}>
            <Link to={`${url}/${recipe.uuid}`}>
                <p className={styles.imgBlock}><img src={`http://localhost:3001${recipe.images.small}`} alt="" /></p>
                <p className={styles.textBlock}>
                    <span className={styles.title}>{recipe.title}</span>
                    <span className={styles.desc}>{recipe.description}</span>
                </p>
            </Link>
        </li>
    )
}

export default RecipeItem;