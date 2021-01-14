import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'

export const Knob = ({ label, min, max, value, onChange, step = null }) => {
  const [id] = useState(Math.round(Math.random() * 100000))
  const [active, setActive] = useState(false)
  const [anchorX, setAnchorX] = useState(null)

  const setValue = useCallback(delta => {
    const normalizedDelta = step ?
      delta * Math.abs(delta) * step :
      ((max - min) / 100) * delta

    const newValue = Math.max(min, Math.min(max, value + normalizedDelta))
    onChange(Math.floor(newValue))
  }, [min, max, value, onChange, step])

  useEffect(() => {
    if (active) {
      function handleOutsideMouseup () {
        setActive(false)
      }

      document.addEventListener('mouseup', handleOutsideMouseup)
      return () => {
        document.removeEventListener('mouseup', handleOutsideMouseup)
      }
    }
  }, [active, setActive])

  useEffect(() => {
    if (active) {
      function handleOutsideMousemove (event) {
        const delta = event.pageX - anchorX
        if (delta !== 0) {
          setValue(delta / 2)
        }
        setAnchorX(event.pageX)
      }

      document.addEventListener('mousemove', handleOutsideMousemove)
      return () => {
        document.removeEventListener('mousemove', handleOutsideMousemove)
      }
    }
  }, [active, setAnchorX, setValue, anchorX])

  const click = event => {
    setActive(true)
    setAnchorX(event.pageX)
  }

  return (
    <KnobWrapper
      active={active}
      onMouseDown={click}
      rotation={calculateRotation(value, min, max, 45)}
    >
      <KnobControl id={id} type="number" min={min} max={max} value={Math.round(value)} readOnly/>
      {label && <KnobLabel id={id} data-min={min} data-max={max}>{label}</KnobLabel>}
    </KnobWrapper>
  )
}

const calculateRotation = (value, min, max, offset) => ((value - min) / (max - min)) * 270 - offset

const KnobWrapper = styled.div`
  color: ${props => props.active ? 'red' : 'black'};
  width: 3.5rem;
  max-width: 3.5rem;
  height: 3.5rem;
  position: relative;
  border: 0.25rem solid ${props => props.active ? 'orange' : 'grey'};
  border-bottom-color: transparent;
  border-radius: 50%;
  margin: 0 auto ${props => props.label ? '1rem' : '0'};
  user-select: none;
  text-align: center;

  &:before {
    content: '';
    position: absolute;
    border-right: 0.25rem solid white;
    border-top: 0.25rem solid transparent;
    border-bottom: 0.25rem solid transparent;
    top: calc(50% - 0.25rem);
    left: 0.125rem;
    transform-origin: 1.375rem 0.25rem;
    transform: rotate(${props => props.rotation}deg);
  }
`

const KnobLabel = styled.label`
  display: inline-block;
  position: absolute;
  bottom: -2rem;
  left: 0;
  width: 100%;
  font-size: 0.9rem;
  color: white;

  &:before,
  &:after {
    top: 0;
    position: absolute;
    font-size: 0.7rem;
    margin-top: -1rem;
    color: rgba(255, 255, 255, 0.8);
  }

  &:before {
    content: attr(data-min);
    left: -0.25rem;
  }

  &:after {
    content: attr(data-max);
    right: -0.25rem;
  }
`

const KnobControl = styled.input`
  appearance: none;
  display: inline-block;
  color: white;
  padding: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  border: .4rem solid black;
  border-radius: 50%;
  background: transparent;
  outline: none;
  user-select: none;
  pointer-events: none;
  cursor: ew-resize;

  &::selection {
     background: transparent;
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`
