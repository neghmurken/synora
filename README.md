# SYÑORA

A web based synthesizer using Web Audio API and Web MIDI API, using Tone.js and React

## Routing

```
           /---> OSC1 ---\
Midi ---> |               |---> FILTER ---> DIST ---> DELAY ---> OUT
           \---> OSC2 ---/
```

## How to use

```shell
$ yarn install
$ yarn start
```

## TODO

 - Filter (type, cut, res, and ADSR)
 - Symetric knob visual feedback
 - Reverb
 - Handle velocity (MIDI and keyboard position)
 - MIDI activity indicator
 - Knob help (description and unit)
 - Presets (save to string, load from string and URL, example presets)
 - Tests...
