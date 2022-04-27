
import React from 'react'
import carosel1 from '../img/carosel1.webp'
import carosel2 from '../img/carosel2.webp'
import carosel3 from '../img/carosel3.webp'

function Carosel() {
    return (
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={carosel1} alt={carosel1}/>
                </div>
                <div className="carousel-item">
                    <img src={carosel2} alt={carosel2}/>
                </div>
                <div className="carousel-item">
                    <img src={carosel3} alt={carosel3}/>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}

export default Carosel