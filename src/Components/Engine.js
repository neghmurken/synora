import * as Tone from 'tone'
import styled from 'styled-components'
import React, { createContext, useReducer, useEffect } from 'react'
import { propEq, map, filter, both } from 'ramda'
import { getParams, initialState, reducer } from '../state'

export const SynthInstrumentContext = createContext([initialState, () => null])

export const Engine = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { engine } = state
  const params = getParams(state)

  useEffect(() => {
    const oscillator = new Tone.PolySynth()

    oscillator.set({ 'oscillator': { 'type': params.osc_type } })

    const distortion = new Tone.Distortion(params.dist_amt)
    const delay = new Tone.PingPongDelay(
      params.delay_time,
      params.delay_feed
    )
    const volume = new Tone.Volume(params.master_vol)

    distortion.set({ 'oversampling': '4x' })
    delay.set({ 'wet': params.delay_wet })

    const waveform = new Tone.Waveform(128)
    oscillator.chain(distortion, delay, volume, waveform, Tone.Master)

    dispatch({ type: 'init_engine', engine: { oscillator, volume, distortion, delay, waveform } })
  }, [])

  useEffect(() => {
    if (!engine.initialized) {
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

    engine.oscillator.triggerAttack(parseFrequencies(toPlays))
    engine.oscillator.triggerRelease(parseFrequencies(toRelease))

    map(({ note }) => dispatch({ type: 'note_triggered', note }))(toPlays)
  }, [state.notes])

  useEffect(() => {
    if (!engine.initialized) {
      return
    }

    const decibels = Tone.gainToDb(params.master_vol)
    engine.volume.set({ 'volume': decibels })
  }, [params.master_vol, engine])

  useEffect(() => {
    if (!engine.initialized) {
      return
    }

    engine.oscillator.set({
      'envelope': {
        'attack': params.osc_env_atk,
        'decay': params.osc_env_dec,
        'sustain': params.osc_env_sus,
        'release': params.osc_env_rel
      }
    })
  }, [params.osc_env_atk, params.osc_env_dec, params.osc_env_sus, params.osc_env_rel, engine])

  useEffect(() => {
    if (!engine.initialized) {
      return
    }

    engine.oscillator.set({ 'oscillator': { 'type': params.osc_type } })
  }, [params.osc_type, engine])

  useEffect(() => {
    if (!engine.initialized) {
      return
    }

    engine.distortion.set({ 'distortion': params.dist_amt })
  }, [params.dist_amt, engine])

  useEffect(() => {
    if (!engine.initialized) {
      return
    }

    engine.delay.set({ 'wet': params.delay_wet }) 
    engine.delay.set({ 'delayTime': params.delay_time })
    engine.delay.set({ 'feedback': params.delay_feed })
  }, [params.delay_wet, params.delay_time, params.delay_feed, engine])

  return (
    <Rack>
      <SynthInstrumentContext.Provider value={[state, dispatch]}>
        {engine.initialized ? children : <p>Loading Instrument ...</p>}
      </SynthInstrumentContext.Provider>
    </Rack>
  )
}

const Rack = styled.div`
  overflow: hidden;
  border: 1px solid gray;
  padding: 1em;
  background-color: #234760;
  color: #eee;
  box-shadow: inset 0 0 140px rgba(0, 0, 0, 0.2), 0 0 8px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
`
