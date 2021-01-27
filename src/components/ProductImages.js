import React, { useState } from 'react'
import styled from 'styled-components'

const ProductImages = ({ images = [] }) => {
  const [main, setMain] = useState(0)
  console.log(main)
  return (
    <Wrapper>
      <img
        src={images[main] && images[main].url ? images[main].url : ''}
        alt='main image'
        className='main'
      />
      <div className='gallery'>
        {images.map((image, index) => {
          return (
            <img
              key={index}
              src={image.url}
              onClick={() => setMain(index)}
              alt={image.filename}
              className={`${image.url === images[main].url && 'active'}`}
            />
          )
        })}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .main {
    height: 600px;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    /* opacity: 0.7; */
    img {
      height: 100px;
      cursor: pointer;
      opacity: 0.7;
    }
    .active {
      border: 4px solid var(--clr-black);
      opacity: 1;
    }
  }

  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`

export default ProductImages
