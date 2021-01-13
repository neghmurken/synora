import React, { useContext } from 'react'
import { getParam, setParam } from './state'
import { SynthInstrumentContext } from './SynthInstrument'
import { Knob } from './Knob'
import styled from 'styled-components'

export const ADSR = () => {
  const [state, dispatch] = useContext(SynthInstrumentContext)

  return (
    <ADSRRack>
      <p>Envelope</p>
      <div>
        <div className="attack">
          <Knob label={'ATK'} min={0} max={1000} value={getParam(state, 'osc_env_atk') * 1000} onChange={val => {
            setParam(dispatch, 'osc_env_atk', val / 1000)
          }}/>
        </div>

        <div className="decay">
          <Knob label={'DEC'} min={0} max={1000} value={getParam(state, 'osc_env_dec') * 1000} onChange={val => {
            setParam(dispatch, 'osc_env_dec', val / 1000)
          }}/>
        </div>

        <div className="sustain">
          <Knob label={'SUS'} min={0} max={100} value={getParam(state, 'osc_env_sus') * 100} onChange={val => {
            setParam(dispatch, 'osc_env_sus', val / 100)
          }}/>
        </div>

        <div className="Release">
          <Knob label={'REL'} min={1} max={4000} value={getParam(state, 'osc_env_rel') * 1000} onChange={val => {
            setParam(dispatch, 'osc_env_rel', val / 1000)
          }}/>
        </div>
      </div>
    </ADSRRack>
  )
}

const ADSRRack = styled.div`
  flex: 4!important;
  margin-bottom: 1em;

  > div {
    display: flex;
  }

  div > div {
    flex: 1;
    text-align: center;
  }
`
