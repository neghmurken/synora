# SYÑORA

A web based synthesizer using Web Audio API and Web MIDI API, using Tone.js and React

## Routing

           /---> OSC1 ---\     /---> FLT1 ---\
Midi ---> |               |---|               |---> DIST ---> DELAY ---> OUT
           \---> OSC2 ---/     \---> FLT2 ---/

## How to use

```shell
$ yarn install
$ yarn start
```

## TODO

 - Detune and pitch
 - Waveshap knob
 - Filter (type, cut, res, and ADSR)
 - Reverb
 - Handle velocity (MIDI and keyboard position)
 - Redesign
 - Presets (save to string, load from string and URL, example presets)
 - Tests...
