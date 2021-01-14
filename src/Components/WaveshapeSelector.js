import React, { useContext } from 'react'
import { map } from 'ramda'
import { getParam, setParam } from '../state'
import { SynthInstrumentContext } from './Engine'

export const WaveshapeSelector = () => {
  const [state, dispatch] = useContext(SynthInstrumentContext)
  const waveshapes = ['sine', 'square', 'triangle', 'sawtooth']

  return (
    <div>
      <p>
        Waveshape:&nbsp;
        <select defaultValue={getParam(state, 'osc_type')} onChange={event => {
          setParam(dispatch, 'osc_type', event.target.value)
        }}>
          {map(shape => <option key={shape} value={shape}>{shape}</option>)(waveshapes)}
        </select>
      </p>
    </div>
  )
}
