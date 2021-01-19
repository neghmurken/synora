import React from 'react'
import styled from 'styled-components'
import { Selector } from './ui/Selector'

export const FiltertypeSelector = ({ ...attrs }) => {
  const types = {
    'highpass': 'HP',
    'lowpass': 'LP',
    'bandpass': 'BP',
    'notch': 'NT',
  }

  return <StyledSelector {...attrs} paramName={`flt_type`} types={types} />
}

const StyledSelector = styled(Selector)`
  button {

  }
`
