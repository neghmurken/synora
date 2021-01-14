import React, { useContext } from 'react'
import { getParam, setParam } from '../state'
import { SynthInstrumentContext } from './Engine'
import { Knob } from './ui/Knob'
import styled from 'styled-components'

export const PingPongDelay = () => {
  const [state, dispatch] = useContext(SynthInstrumentContext)

  return (
    <DelayEffect>
      <p>Ping Pong Delay</p>
      <div>
        <div className="wet">
          <Knob label={'WET'} min={0} max={100} value={getParam(state, 'delay_wet') * 100} onChange={val => {
            setParam(dispatch, 'delay_wet', val / 100)
          }}/>
        </div>

        <div className="time">
          <Knob label={'DLY'} min={0} max={100} value={getParam(state, 'delay_time') * 10} onChange={val => {
            setParam(dispatch, 'delay_time', val / 10)
          }}/>
        </div>

        <div className="feedback">
          <Knob label={'FEED'} min={0} max={100} value={getParam(state, 'delay_feed') * 100} onChange={val => {
            setParam(dispatch, 'delay_feed', val / 100)
          }}/>
        </div>
      </div>
    </DelayEffect>
  )
}

const DelayEffect = styled.div`
  flex: 3!important;

  > div {
    display: flex;
  }

  div > div {
    flex: 1;
    text-align: center;
  }
`
