import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
const CheckoutPage = () => {
  return (
    <main>
      <PageHero title='checkout' />
      <Wrapper className='page section-center'>
        <h2>currently checkout is empty !!!!!!!!!</h2>
        <h2>it is in progress</h2>
      </Wrapper>
    </main>
  )
}
const Wrapper = styled.div``
export default CheckoutPage
