import React from 'react'
import styled from 'styled-components'
import { ADSR } from './ADSR'
import { WaveshapeSelector } from './WaveshapeSelector'

export const Oscillator = ({ number }) => {
  return <Wrapper>
    <WaveshapeSelector oscillatorNumber={number}/>
    <ADSR oscillatorNumber={number}/>
  </Wrapper>
}

const Wrapper = styled.div`
  flex: 4!important;
`
