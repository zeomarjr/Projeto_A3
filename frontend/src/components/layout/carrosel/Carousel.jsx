import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import IMG from '../../img/image.png';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './Carrosel.module.css'; 
function Carrosel() {
  return (
    <Carousel className='mt-5 mb-5 '>
      <Carousel.Item>
        <img
          className="d-block w-10"
          src={IMG}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-10"
          src={IMG}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-10"
          src={IMG}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carrosel;
