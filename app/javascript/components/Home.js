import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { TweenMax, Power3, TimelineMax } from 'gsap';
import Registration from '../components/Registration';

function Home(props) {
    
    const handleSuccessfulAuth = (data) => {
        props.handleLogin(data);
        // this.props.history.push("/dashboard");
    };
    
    useLayoutEffect(() => {
        // heroItem.style.display = 'none';
            const tl = new TimelineMax();
        // TweenMax.to(hero, 0, {css: {visibility: 'visible'}})
        
        tl.to(hero, 0, {css: {visibility: "visible"}})
        .fromTo(hero, 1, {height: "0%"}, {height: "60%"})
        .to(text, 0, {css: {visibility: "visible"}})
        .fromTo(text, 1, {x: "200%"}, {x: 0})
        .to(title, 0, {css: {visibility: "visible"}})
        .staggerFromTo(title, 1, {opacity: 0}, {opacity: 1}, .5);
        
    }, []);
    
    let hero = useRef(null);
    let text = useRef(null);
    let title = useRef(null);
        
    return(
        <div id="homepage" className="vh-100 bg-primary-color d-flex flex-column overflow-hidden" style={{width: "100%"}}>
         
            <div className="home-hero bg-secondary-color mt-5 hidden" ref={element => {hero = element}}>
                <div className="container d-flex flex-column justify-content-center hidden" style={{height: "100%"}} ref={element => {text = element}}>
                    <div className="align-self-center">
                        <h1 id="force" className="home-title display-4" ref={element => {title = element}} style={{opacity: "0"}}><span>R</span>ecipe<span>R</span>eaction<span>R</span>eporter</h1>
                    </div>
                    <p className="lead mb-0 align-self-center text-center">
                        A place for sharing and reacting to recipes
                    </p>
                    <div>
                        <hr className="my-4" />
                    </div>
                    <p className="align-self-center text-center greeter">
                        Please feel free to browse the recipes uploaded by our users, or add one of your own.
                        Registration is only required if you wish to report your reaction to a recipe. Enjoy!
                    </p>
                    <div className="d-flex flex-row justify-content-center">
                        <Link
                            to="/recipes"
                            className="btn btn-dark mx-2"
                            style={{width: "10rem"}}
                            role="button"
                        >
                            Browse Recipes
                        </Link>
                        <Registration handleSuccessfulAuth={handleSuccessfulAuth} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;