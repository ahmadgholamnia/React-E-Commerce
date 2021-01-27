import React from 'react'
import styled from 'styled-components'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'
const Stars = ({ stars, reviews }) => {
  const starsRemain = parseFloat((stars % 1).toFixed(1))

  const starsMain = stars / 1

  const starsEmpty = Math.floor(5 - stars)

  const tempStars = Array.from({ length: 5 }, (_, index) => {
    return index
  })

  return (
    <Wrapper>
      <div className='stars'>
        <span>
          {tempStars.slice(0, starsMain).map((i, index) => {
            return <BsStarFill key={index} />
          })}

          {tempStars.slice(0, starsRemain ? 1 : 0).map((i, index) => {
            return <BsStarHalf key={index} />
          })}

          {tempStars.slice(0, starsEmpty).map((i, index) => {
            return <BsStar key={index} />
          })}
        </span>
      </div>
      <p className='reviews'>({reviews}) customer reviews</p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`
export default Stars
