import React, { useContext } from 'react'
import { getParam, setParam } from '../state'
import { SynthInstrumentContext } from './Engine'
import { Knob } from './ui/Knob'
import styled from 'styled-components'

export const Distortion = () => {
  const [ state, dispatch ] = useContext(SynthInstrumentContext)

  return (
    <DistortionEffect>
      <p>Distortion</p>
      <div>
        <div className="amount">
          <Knob label={'AMT'} min={0} max={100} value={getParam(state, 'dist_amt') * 100} onChange={val => {
            setParam(dispatch, 'dist_amt', val / 100)
          }} />
        </div>
      </div>
    </DistortionEffect>
  )
}

const DistortionEffect = styled.div`
  flex: 1!important;

  > div {
    display: flex;
  }
  div > div {
    flex: 1;
    text-align: center;
  }
`
