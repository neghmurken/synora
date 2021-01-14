import React from 'react'
import { render } from 'react-dom'
import { Engine } from './Components/Engine'
import { Oscillator } from './Components/Oscillator'
import { ParamKnob } from './Components/ParamKnob'
import { SynthController } from './Components/SynthController'
import { Keyboard } from './Components/Keyboard'
import { PingPongDelay } from './Components/PingPongDelay'
import { Distortion } from './Components/Distortion'
import { Analyzer } from './Components/Analyzer'
import styled from 'styled-components'

const Synth = () =>
  <Instrument>
    <Engine>
      <Header>
        <Title>|| Syñora</Title>
        <Analyzer />
        <ParamKnob paramName={'master_vol'} factor="100" min="0" max="100" />
      </Header>
      <Rack>
        <Oscillator number="1" />
        <Oscillator number="2" />
        <PingPongDelay />
        <Distortion />
      </Rack>
      <Keyboard />
      <SynthController />
    </Engine>
  </Instrument>

const Instrument = styled.div`
  position: relative;
  width: 1200px;
  font-family: Rubik, sans-serif;
  margin: 0 auto;
  user-select: none;

  * {
    box-sizing: border-box;
  }
`

const Header = styled.header`
  margin: -1rem -1rem 2rem -1rem;
  padding: 1rem;
  background-color: #122e3e;
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.5), inset 0 8px 16px rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;

  > * {
    flex: 1;
  }
`

const Title = styled.h1`
  flex: 1;
  margin: auto 0;
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
  text-transform: uppercase;
  font-style: italic;
  font-weight: bold;
`

const Rack = styled.div`
  display: flex;

  > * {
    flex: 1;
    clear: both;
    border: 1px solid rgba(0, 0, 0, 0.5);
    padding: 1rem 1rem 1.5rem;
    margin-bottom: 1rem;
    box-shadow: inset 0 -40px 40px rgba(255, 255, 255, 0.05);

    p {
      margin: -24px 0 1em 0;
      padding-left: 1em;
      background-color: #234760;
    }

    &>div {
      display: flex;
    }
  }
`

const root = document.getElementById('root')

render(<Synth />, root)
