import * as Tone from 'tone'
import styled from 'styled-components'
import React, { createContext, useReducer, useEffect } from 'react'
import { propEq, map, filter, both, init } from 'ramda'
import { getParams, initialState, reducer } from '../state'

export const SynthInstrumentContext = createContext([initialState, () => null])

export const Engine = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { engine, initialized } = state
  const params = getParams(state)

  useEffect(() => {
    const oscillator1 = new Tone.PolySynth()
    const oscillator2 = new Tone.PolySynth()

    oscillator1.set({ 'oscillator': { 'type': params.osc1_type } })
    oscillator2.set({ 'oscillator': { 'type': params.osc2_type } })

    const merge = new Tone.Merge()
    oscillator1.connect(merge)
    oscillator2.connect(merge)

    const distortion = new Tone.Distortion(params.dist_amt)
    const delay = new Tone.PingPongDelay(
      params.delay_time,
      params.delay_feed
    )
    const volume = new Tone.Volume(params.master_vol)

    distortion.set({ 'oversample': '4x' })
    delay.set({ 'wet': params.delay_wet })

    const analyzer = new Tone.Analyser('fft', 128)

    merge.chain(distortion, delay, analyzer, volume, Tone.Destination)

    dispatch({ type: 'init_engine', engine: { oscillator1, oscillator2, volume, distortion, delay, analyzer } })
  }, [])

  useEffect(() => {
    if (!initialized) {
      return
    }

    const toPlays = filter(
      both(
        propEq('isPlaying', true),
        propEq('triggered', false),
      ),
      state.notes
    )
    const toRelease = filter(propEq('isPlaying', false), state.notes)
    const parseFrequencies = map(({ note }) => Tone.Midi(note).toFrequency())

    engine.oscillator1.triggerAttack(parseFrequencies(toPlays))
    engine.oscillator2.triggerAttack(parseFrequencies(toPlays))
    engine.oscillator1.triggerRelease(parseFrequencies(toRelease))
    engine.oscillator2.triggerRelease(parseFrequencies(toRelease))

    map(({ note }) => dispatch({ type: 'note_triggered', note }))(toPlays)
  }, [state.notes, dispatch, engine, initialized])

  useEffect(() => {
    if (!initialized) {
      return
    }

    const decibels = Tone.gainToDb(params.master_vol)
    engine.volume.set({ 'volume': decibels })
  }, [params.master_vol, engine, init])

  useEffect(() => {
    if (!initialized) {
      return
    }

    engine.oscillator1.set({
      'envelope': {
        'attack': params.osc1_env_atk,
        'decay': params.osc1_env_dec,
        'sustain': params.osc1_env_sus,
        'release': params.osc1_env_rel
      }
    })
    engine.oscillator2.set({
      'envelope': {
        'attack': params.osc2_env_atk,
        'decay': params.osc2_env_dec,
        'sustain': params.osc2_env_sus,
        'release': params.osc2_env_rel
      }
    })
  }, [
    params.osc1_env_atk,
    params.osc1_env_dec,
    params.osc1_env_sus,
    params.osc1_env_rel,
    params.osc2_env_atk,
    params.osc2_env_dec,
    params.osc2_env_sus,
    params.osc2_env_rel,
    engine,
    initialized
  ])

  useEffect(() => {
    if (!initialized) {
      return
    }

    engine.oscillator1.set({ 'oscillator': { 'type': params.osc1_type } })
    engine.oscillator2.set({ 'oscillator': { 'type': params.osc2_type } })
  }, [params.osc1_type, params.osc2_type, engine, initialized])

  useEffect(() => {
    if (!initialized) {
      return
    }

    engine.distortion.set({ 'distortion': params.dist_amt })
  }, [params.dist_amt, engine, initialized])

  useEffect(() => {
    if (!initialized) {
      return
    }

    engine.delay.set({ 'wet': params.delay_wet })
    engine.delay.set({ 'delayTime': params.delay_time })
    engine.delay.set({ 'feedback': params.delay_feed })
  }, [params.delay_wet, params.delay_time, params.delay_feed, engine, initialized])

  return (
    <Rack>
      <SynthInstrumentContext.Provider value={[state, dispatch]}>
        {initialized ? children : <p>Loading Instrument ...</p>}
      </SynthInstrumentContext.Provider>
    </Rack>
  )
}

const Rack = styled.div`
  overflow: hidden;
  border: 1px solid black;
  padding: 1em;
  background-color: #234760;
  color: #eee;
  box-shadow: inset 0 0 140px rgba(0, 0, 0, 0.2), 0 0 8px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
`
