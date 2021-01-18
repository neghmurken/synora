import React from 'react'
import { ParamKnob } from './ParamKnob'
import styled from 'styled-components'

export const PingPongDelay = () => (
  <DelayEffect>
    <p>Ping Pong Delay</p>
    <div>
      <ParamKnob paramName="delay_time" label="DELAY" min="0" max="100" factor="100"/>
      <ParamKnob paramName="delay_feed" label="FEED" min="0" max="100" factor="100"/>
      <ParamKnob paramName="delay_wet" label="WET" min="0" max="100" factor="100"/>
    </div>
  </DelayEffect>
)

const DelayEffect = styled.div`
  flex: 3!important;

  > div {
    display: flex;
  }
`
