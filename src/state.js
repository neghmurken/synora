import { append, assoc, compose, find, ifElse, map, propEq, when } from 'ramda'

export const initialState = {
  notes: [],
  engine: {
    initialized: false,
    oscillator: null,
    volume: null,
    distortion: null,
    delay: null,
    waveform: null,
  },
  parameters: {
    osc_type: 'sawtooth',
    osc_env_atk: 0.01,
    osc_env_dec: 0.2,
    osc_env_sus: 1,
    osc_env_rel: 0.01,
    master_vol: 0.7,
    dist_amt: 0,
    delay_wet: 0,
    delay_time: 0.2,
    delay_feed: 0.3,
  },
  waveform: {
    values: [],
  }
}

export const reducer = (state = initialState, action) => {
  if (!action) {
    return state
  }

  switch (action.type) {
    case 'init_engine':
      return { ...state, engine: { ...action.engine, initialized: true } }

    case 'update_waveform':
      return { ...state, waveform: { ...state.waveform, values: state.engine.waveform.getValue() } }

    case 'note_pressed':
      return {
        ...state,
        notes: ifElse(
          find(propEq('note', action.note)),
          map(when(
            propEq('note', action.note),
            compose(assoc('isPlaying', true), assoc('triggered', false)),
          )),
          append({ note: action.note, isPlaying: true, triggered: false }),
        )(state.notes),
      }

    case 'note_triggered':
      return {
        ...state,
        notes: map(when(
          propEq('note', action.note),
          assoc('triggered', true),
        ))(state.notes),
      }

    case 'note_released':
      return {
        ...state,
        notes: map(when(
          propEq('note', action.note),
          compose(assoc('isPlaying', false), assoc('triggered', false)),
        ))(state.notes),
      }

    case 'set_parameter':
      return {
        ...state,
        parameters: {
          ...state.parameters,
          [action.name]: action.value,
        }
      }
    default:
      return state
  }
}

export const getParams = state => state.parameters
export const getParam = (state, name) => getParams(state)[name] || null

export const setParam = (dispatch, name, value) => dispatch({ type: 'set_parameter', name, value })
