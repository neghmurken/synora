import React from 'react'
import { ParamKnob } from './ParamKnob'
import styled from 'styled-components'

export const ADSR = ({oscillatorNumber}) => {
  return (
    <ADSRRack>
      <div className="attack">
        <ParamKnob paramName={`osc${oscillatorNumber}_env_atk`} label="ATK" min="0" max="1000" factor="1000" step="1"/>
      </div>

      <div className="decay">
        <ParamKnob paramName={`osc${oscillatorNumber}_env_dec`} label="DEC" min="0" max="1000" factor="1000" step="1"/>
      </div>

      <div className="sustain">
        <ParamKnob paramName={`osc${oscillatorNumber}_env_sus`} label="SUS" min="0" max="100" factor="100"/>
      </div>

      <div className="release">
        <ParamKnob paramName={`osc${oscillatorNumber}_env_rel`} label="REL" min="0" max="1000" factor="1000" step="1"/>
      </div>
    </ADSRRack>
  )
}

const ADSRRack = styled.div`
  flex: 4!important;
  margin-bottom: 1em;
  display: flex;

  > div {
    flex: 1;
  }
`
