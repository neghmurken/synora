import React from 'react'
import styled from 'styled-components'
import { ADSR } from './ADSR'
import { ParamKnob } from './ParamKnob'
import { WaveshapeSelector } from './WaveshapeSelector'

export const Oscillator = ({ number }) => {
  return <Wrapper>
    <WaveshapeSelector oscillatorNumber={number}/>
    <ParamKnob paramName={`osc${number}_detune`} label="TUNE" min="-100" max="100" />
    <ADSR oscillatorNumber={number}/>
  </Wrapper>
}

const Wrapper = styled.div`
  flex: 4!important;
`
