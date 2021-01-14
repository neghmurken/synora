import React from 'react'
import { render } from 'react-dom'
import { Engine } from './Components/Engine'
import { SynthController } from './Components/SynthController'
import { Volume } from './Components/Volume'
import { ADSR } from './Components/ADSR'
import { Keyboard } from './Components/Keyboard'
import { WaveshapeSelector} from './Components/WaveshapeSelector'
import { PingPongDelay } from './Components/PingPongDelay'
import { Distortion } from './Components/Distortion'
import { Waveform } from './Components/Waveform'
import styled from 'styled-components'

const Synth = () =>
  <Instrument>
    <Engine>
      <Title>|| Syñora</Title>
      <Volume />
      <WaveshapeSelector />
      <EffectRack>
        <ADSR />
        <PingPongDelay />
        <Distortion />
        <Waveform />
      </EffectRack>
      <Keyboard />
      <SynthController />
    </Engine>
  </Instrument>

const Instrument = styled.div`
  position: relative;
  width: 1200px;
  font-family: Rubik, sans-serif;
  * {
    box-sizing: border-box;
  }
`

const Title = styled.h1`
  margin: -16px -16px 0 -16px;
  padding: 16px;
  background-color: #2f4554;
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.3), inset 0 8px 16px rgba(255, 255, 255, 0.2);
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
  text-transform: uppercase;
  font-style: italic;
  font-weight: bold;
`

const EffectRack = styled.div`
  display: flex;

  > * {
    flex: 1;
    clear: both;
    border: 1px solid rgba(0, 0, 0, 0.5);
    padding: 1em;
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
