import React, { useContext } from 'react'
import styled from 'styled-components'
import { getParam, setParam } from '../state'
import { SynthInstrumentContext } from './Engine'

export const WaveshapeSelector = ({ oscillatorNumber, ...attrs }) => {
  const [state, dispatch] = useContext(SynthInstrumentContext)

  const paramName = `osc${oscillatorNumber}_type`

  const types = {
    'sine': 'SIN',
    'square': 'SQR',
    'triangle': 'TRI',
    'sawtooth': 'SAW',
  }

  return <Selector {...attrs}>
    {Object.keys(types).map(type =>
      <Type
        key={type}
        className={[type, type === getParam(state, paramName) && 'selected'].join(' ')}
        value={type}
        label={types[type]}
        onSelect={val => setParam(dispatch, paramName, val)}
      />
    )}
  </Selector>
}

const Type = ({ value, label, onSelect, ...attrs }) => {
  return <StyledType
    {...attrs}
    onClick={() => onSelect(value)}
    title={label}>
    {label}
  </StyledType>
}

const Selector = styled.div`
  background-color: ${props => props.theme.colors.background};
`

const StyledType = styled.button`
  border: 1px solid ${props => props.theme.colors.borders.dark};
  outline: none;
  font-family: ${props => props.theme.fontFamily};
  font-size: 0;
  width: 2.5rem;
  height: 1.5rem;
  color: transparent;
  background-color: transparent;

  &.selected {
    background-color: ${props => props.theme.colors.accent1};
  }

  :hover:not(.selected) {
    background-color: ${props => props.theme.colors.shadows.lightWhite};
  }

  :before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background-size: 150%;
    background-position: center center;
    background-repeat: no-repeat;
    filter: invert();
  }

  & + & {
    border-left: 0;
  }
  &:first-child {
    border-radius: 2px 0 0 2px;
  }
  &:last-child {
    border-radius: 0 2px 2px 0;
  }

  &.sine:before {
    transform: scaleY(-1);
    background-image: url("data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjMDAwMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwIDEwMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PGc+PHBhdGggZD0iTTg5LjIsNjAuOGMtNC41LDAtNi42LTUuMy04LjYtMTAuNGMtMS44LTQuNS0zLjYtOS4xLTYuOC05LjFzLTUsNC42LTYuOCw5LjFjLTIsNS4xLTQuMSwxMC40LTguNiwxMC40cy02LjYtNS4zLTguNi0xMC40ICAgYy0xLjgtNC41LTMuNi05LjEtNi44LTkuMXMtNSw0LjYtNi44LDkuMWMtMiw1LjEtNC4xLDEwLjQtOC42LDEwLjRjLTQuNSwwLTYuNi01LjMtOC42LTEwLjRjLTEuOC00LjUtMy42LTkuMS02LjgtOS4xICAgYy0wLjYsMC0xLTAuNC0xLTFzMC40LTEsMS0xYzQuNSwwLDYuNiw1LjMsOC42LDEwLjRjMS44LDQuNSwzLjYsOS4xLDYuOCw5LjFjMy4yLDAsNS00LjYsNi44LTkuMWMyLTUuMSw0LjEtMTAuNCw4LjYtMTAuNCAgIHM2LjYsNS4zLDguNiwxMC40YzEuOCw0LjUsMy42LDkuMSw2LjgsOS4xYzMuMiwwLDUtNC42LDYuOC05LjFjMi01LjEsNC4xLTEwLjQsOC42LTEwLjRzNi42LDUuMyw4LjYsMTAuNGMxLjgsNC41LDMuNiw5LjEsNi44LDkuMSAgIGMwLjYsMCwxLDAuNCwxLDFTODkuOCw2MC44LDg5LjIsNjAuOHoiPjwvcGF0aD48L2c+PC9zdmc+");
  }
  &.triangle:before {
    transform: scaleY(-1);
    background-image: url("data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjMDAwMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwIDEwMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PGc+PHBhdGggZmlsbD0iIzAwMDAwMCIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ik0zMi4zLDQ3LjIiPjwvcGF0aD48L2c+PGc+PHBvbHlnb24gcG9pbnRzPSI1Ny41LDYxLjcgNDIuNSw0MS43IDI3LjUsNjEuNyAxMS43LDQwLjYgMTMuMywzOS40IDI3LjUsNTguMyA0Mi41LDM4LjMgNTcuNSw1OC4zIDcyLjUsMzguMyA4OC4zLDU5LjQgODYuNyw2MC42ICAgIDcyLjUsNDEuNyAgIj48L3BvbHlnb24+PC9nPjwvc3ZnPg==");
  }
  &.square:before {
    background-image: url("data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjMDAwMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwIDEwMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PGc+PHBhdGggZmlsbD0iIzAwMDAwMCIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ik0zMi4zLDQ3LjIiPjwvcGF0aD48L2c+PGc+PHBvbHlnb24gcG9pbnRzPSI5NSw2MSA3OSw2MSA3OSw0MSA2Niw0MSA2Niw2MSA0OSw2MSA0OSw0MSAzNiw0MSAzNiw2MSAxOSw2MSAxOSw0MSA1LDQxIDUsMzkgMjEsMzkgMjEsNTkgMzQsNTkgMzQsMzkgNTEsMzkgICAgNTEsNTkgNjQsNTkgNjQsMzkgODEsMzkgODEsNTkgOTUsNTkgICI+PC9wb2x5Z29uPjwvZz48L3N2Zz4=");
  }
  &.sawtooth:before {
    background-image: url("data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjMDAwMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwIDEwMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PGc+PHBhdGggZmlsbD0iIzAwMDAwMCIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGQ9Ik0zMi4zLDQ3LjIiPjwvcGF0aD48L2c+PGc+PHBvbHlnb24gcG9pbnRzPSI2NCw2MS45IDY0LDQxLjkgMzQsNjEuOSAzNCw0MS45IDUuNiw2MC44IDQuNCw1OS4yIDM2LDM4LjEgMzYsNTguMSA2NiwzOC4xIDY2LDU4LjEgOTQuNCwzOS4yIDk1LjYsNDAuOCAgIj48L3BvbHlnb24+PC9nPjwvc3ZnPg==");
  }
`
