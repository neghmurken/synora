import React, { useContext } from 'react'
import { getParam, setParam } from './state'
import { SynthInstrumentContext } from './SynthInstrument'
import styled from 'styled-components'

export const Volume = () => {
  const [state, dispatch] = useContext(SynthInstrumentContext)
  const volume = getParam(state, 'master_vol')

  return (
    <VolumeKnob>
      <p>
        Volume:
        <input type="range" min={0} max={100} value={volume * 100} onChange={event => {
          setParam(dispatch, 'master_vol', event.target.value / 100)
        }}/>
        {Math.round(volume * 100)}%
      </p>
    </VolumeKnob>
  )
}

const VolumeKnob = styled.div`
  position: absolute;
  top: 30px;
  right: 2em;

  & > * {
    display: inline;
  }

  & p {
    margin-right: 10px;
  }

  & input {
    vertical-align: middle;
    margin: 0 1em;
  }
`
