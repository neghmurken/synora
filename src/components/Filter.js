import React from 'react'
import styled from 'styled-components'
import { ADSR } from './ADSR'
import { FiltertypeSelector } from './FiltertypeSelector'
import { ParamKnob } from './ParamKnob'

export const Filter = () => {
  return <Wrapper>
    <p>Filter</p>
    <FiltertypeSelector className="type" />
    <div>
      <ParamKnob paramName="flt_cut" label="CUT" min="20" max="19000"/>
      <ParamKnob paramName="flt_res" label="RES" min="0" max="100" factor="100"/>
    </div>
    <ADSR paramPrefix="flt" />
  </Wrapper>
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  .type {
    flex: none;
    position: absolute;
    right: 1rem;
    top: -0.75rem;
  }
`
