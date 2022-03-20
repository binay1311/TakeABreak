import React, {useEffect, useState} from 'react';
import {Splide, SplideSlide} from "@splidejs/react-splide";
import styled from "styled-components";
import '@splidejs/splide/dist/css/splide.min.css';
import {Link} from "react-router-dom";

function Veggie() {
    const [veggie, setVeggie] = useState([]);

    useEffect(() => {
        getVeggie();
    },[]);

    const getVeggie = async () => {
        const check = localStorage.getItem("veggie");

        if(check){
            setVeggie(JSON.parse(check));
        } else {
            const api = await fetch
            (`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`);
            const data = await api.json();
            console.log(data);
            setVeggie(data.recipes);
            localStorage.setItem("veggie", JSON.stringify(data.recipes));
        }
    }

    return (
        <div>
            <Wrapper>
                <h3>Our Vegetarian picks</h3>
                <Splide options={{
                    perPage: 3,
                    arrows: false,
                    pagination: false,
                    drag: 'free',
                    gap: '4rem',
                }}>
                    {
                        veggie.map((recipe) => {
                            return(
                                <SplideSlide key={recipe.id}>
                                    <Card>
                                        <Link to={"/recipe/" + recipe.id}>
                                        <p>{recipe.title}</p>
                                        <img src={recipe.image} alt={recipe.title}/>
                                        <Gradient/>
                                        </Link>
                                    </Card>
                                </SplideSlide>
                            );
                        })
                    }
                </Splide>
            </Wrapper>
        </div>
    );
}

const Wrapper = styled.div`
    margin: 0.1rem 0rem;
    min-height: 5em;
     h3 {
        margin-top: 0.1rem;
        margin-bottom: 0.8rem;
     }
`;

const Card = styled.div`
    width: 22rem;
    min-height: 13rem;
    border-radius: 2rem;
    overflow: hidden;
    position: relative;
   
    img {
        border-radius: 2rem; 
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    p {
        position: absolute;
        z-index: 10;
        left: 50%;
        bottom: 0%;
        transform: translate(-50%, 0%);
        color: white;
        width: 100%;
        text-align: center;
        font-weight: 600;
        font-size: 1rem;
        height: 30%;
        // display: flex;
        justify-context: center;
        align-items: center;
    }
`;

const Gradient = styled.div`
    z-index: 3;
    position: absolute;
    height: 100%;
    width: 100%;
    background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
`;

export default Veggie;