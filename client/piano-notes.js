// Creates musical notes for the piano with pretty good accuracy

const noteAlphabet = {
  1: 'C',
  2: 'C#/Db',
  3: 'D',
  4: 'D#/Eb',
  5: 'E',
  6: 'F',
  7: 'F#/Gb',
  8: 'G',
  9: 'G#/Ab',
  10: 'A',
  11: 'A#/Bb',
  12: 'B'
};

const noteAssembler = (notes, note, frequency, octave) => {
  const noteRateOfChange = 1.0596;
  for (let i = 1; i < 13; i++) {
    notes.push({ note: note[i], frequency, octave });
    frequency *= noteRateOfChange;
  }
};

// eslint-- disable-next-line
const createNotes = () => {
  const NOTES = [];
  let initialC = 32.70;

  const octaveRateOfChange = 2.00003;

  for (let i = 1; i < 9; i++) {
    noteAssembler(NOTES, noteAlphabet, initialC, i);
    initialC *= octaveRateOfChange;
  }

  return NOTES;
};

createNotes();

const notes = [
  {
    note: 'C',
    frequency: 32.7,
    octave: 1
  },
  {
    note: 'C#/Db',
    frequency: 34.648920000000004,
    octave: 1
  },
  {
    note: 'D',
    frequency: 36.71399563200001,
    octave: 1
  },
  {
    note: 'D#/Eb',
    frequency: 38.90214977166721,
    octave: 1
  },
  {
    note: 'E',
    frequency: 41.22071789805858,
    octave: 1
  },
  {
    note: 'F',
    frequency: 43.67747268478288,
    octave: 1
  },
  {
    note: 'F#/Gb',
    frequency: 46.28065005679594,
    octave: 1
  },
  {
    note: 'G',
    frequency: 49.03897680018098,
    octave: 1
  },
  {
    note: 'G#/Ab',
    frequency: 51.961699817471775,
    octave: 1
  },
  {
    note: 'A',
    frequency: 55.0586171265931,
    octave: 1
  },
  {
    note: 'A#/Bb',
    frequency: 58.340110707338056,
    octave: 1
  },
  {
    note: 'B',
    frequency: 61.81718130549541,
    octave: 1
  },
  {
    note: 'C',
    frequency: 65.40098100000002,
    octave: 2
  },
  {
    note: 'C#/Db',
    frequency: 69.29887946760002,
    octave: 2
  },
  {
    note: 'D',
    frequency: 73.42909268386899,
    octave: 2
  },
  {
    note: 'D#/Eb',
    frequency: 77.80546660782758,
    octave: 2
  },
  {
    note: 'E',
    frequency: 82.44267241765411,
    octave: 2
  },
  {
    note: 'F',
    frequency: 87.3562556937463,
    octave: 2
  },
  {
    note: 'F#/Gb',
    frequency: 92.56268853309359,
    octave: 2
  },
  {
    note: 'G',
    frequency: 98.07942476966598,
    octave: 2
  },
  {
    note: 'G#/Ab',
    frequency: 103.92495848593808,
    octave: 2
  },
  {
    note: 'A',
    frequency: 110.1188860117,
    octave: 2
  },
  {
    note: 'A#/Bb',
    frequency: 116.68197161799733,
    octave: 2
  },
  {
    note: 'B',
    frequency: 123.63621712642998,
    octave: 2
  },
  {
    note: 'C',
    frequency: 130.80392402943005,
    octave: 3
  },
  {
    note: 'C#/Db',
    frequency: 138.5998379015841,
    octave: 3
  },
  {
    note: 'D',
    frequency: 146.86038824051852,
    octave: 3
  },
  {
    note: 'D#/Eb',
    frequency: 155.61326737965342,
    octave: 3
  },
  {
    note: 'E',
    frequency: 164.88781811548077,
    octave: 3
  },
  {
    note: 'F',
    frequency: 174.71513207516344,
    octave: 3
  },
  {
    note: 'F#/Gb',
    frequency: 185.12815394684318,
    octave: 3
  },
  {
    note: 'G',
    frequency: 196.16179192207505,
    octave: 3
  },
  {
    note: 'G#/Ab',
    frequency: 207.85303472063075,
    octave: 3
  },
  {
    note: 'A',
    frequency: 220.24107558998037,
    octave: 3
  },
  {
    note: 'A#/Bb',
    frequency: 233.3674436951432,
    octave: 3
  },
  {
    note: 'B',
    frequency: 247.27614333937376,
    octave: 3
  },
  {
    note: 'C',
    frequency: 261.611772176581,
    octave: 4
  },
  {
    note: 'C#/Db',
    frequency: 277.20383379830525,
    octave: 4
  },
  {
    note: 'D',
    frequency: 293.7251822926843,
    octave: 4
  },
  {
    note: 'D#/Eb',
    frequency: 311.2312031573283,
    octave: 4
  },
  {
    note: 'E',
    frequency: 329.7805828655051,
    octave: 4
  },
  {
    note: 'F',
    frequency: 349.43550560428923,
    octave: 4
  },
  {
    note: 'F#/Gb',
    frequency: 370.2618617383049,
    octave: 4
  },
  {
    note: 'G',
    frequency: 392.3294686979079,
    octave: 4
  },
  {
    note: 'G#/Ab',
    frequency: 415.7123050323032,
    octave: 4
  },
  {
    note: 'A',
    frequency: 440.48875841222855,
    octave: 4
  },
  {
    note: 'A#/Bb',
    frequency: 466.7418884135974,
    octave: 4
  },
  {
    note: 'B',
    frequency: 494.55970496304786,
    octave: 4
  },
  {
    note: 'C',
    frequency: 523.2313927063274,
    octave: 5
  },
  {
    note: 'C#/Db',
    frequency: 554.4159837116246,
    octave: 5
  },
  {
    note: 'D',
    frequency: 587.4591763408374,
    octave: 5
  },
  {
    note: 'D#/Eb',
    frequency: 622.4717432507514,
    octave: 5
  },
  {
    note: 'E',
    frequency: 659.5710591484963,
    octave: 5
  },
  {
    note: 'F',
    frequency: 698.8814942737467,
    octave: 5
  },
  {
    note: 'F#/Gb',
    frequency: 740.5348313324621,
    octave: 5
  },
  {
    note: 'G',
    frequency: 784.6707072798769,
    octave: 5
  },
  {
    note: 'G#/Ab',
    frequency: 831.4370814337576,
    octave: 5
  },
  {
    note: 'A',
    frequency: 880.9907314872097,
    octave: 5
  },
  {
    note: 'A#/Bb',
    frequency: 933.4977790838475,
    octave: 5
  },
  {
    note: 'B',
    frequency: 989.1342467172449,
    octave: 5
  },
  {
    note: 'C',
    frequency: 1046.478482354436,
    octave: 6
  },
  {
    note: 'C#/Db',
    frequency: 1108.8485999027605,
    octave: 6
  },
  {
    note: 'D',
    frequency: 1174.9359764569651,
    octave: 6
  },
  {
    note: 'D#/Eb',
    frequency: 1244.9621606538003,
    octave: 6
  },
  {
    note: 'E',
    frequency: 1319.1619054287669,
    octave: 6
  },
  {
    note: 'F',
    frequency: 1397.7839549923215,
    octave: 6
  },
  {
    note: 'F#/Gb',
    frequency: 1481.091878709864,
    octave: 6
  },
  {
    note: 'G',
    frequency: 1569.364954680972,
    octave: 6
  },
  {
    note: 'G#/Ab',
    frequency: 1662.899105979958,
    octave: 6
  },
  {
    note: 'A',
    frequency: 1762.0078926963636,
    octave: 6
  },
  {
    note: 'A#/Bb',
    frequency: 1867.023563101067,
    octave: 6
  },
  {
    note: 'B',
    frequency: 1978.298167461891,
    octave: 6
  },
  {
    note: 'C',
    frequency: 2092.9883590633426,
    octave: 7
  },
  {
    note: 'C#/Db',
    frequency: 2217.730465263518,
    octave: 7
  },
  {
    note: 'D',
    frequency: 2349.907200993224,
    octave: 7
  },
  {
    note: 'D#/Eb',
    frequency: 2489.9616701724203,
    octave: 7
  },
  {
    note: 'E',
    frequency: 2638.363385714697,
    octave: 7
  },
  {
    note: 'F',
    frequency: 2795.609843503293,
    octave: 7
  },
  {
    note: 'F#/Gb',
    frequency: 2962.22819017609,
    octave: 7
  },
  {
    note: 'G',
    frequency: 3138.776990310585,
    octave: 7
  },
  {
    note: 'G#/Ab',
    frequency: 3325.848098933096,
    octave: 7
  },
  {
    note: 'A',
    frequency: 3524.068645629509,
    octave: 7
  },
  {
    note: 'A#/Bb',
    frequency: 3734.103136909028,
    octave: 7
  },
  {
    note: 'B',
    frequency: 3956.655683868806,
    octave: 7
  },
  {
    note: 'C',
    frequency: 4186.039507777457,
    octave: 8
  },
  {
    note: 'C#/Db',
    frequency: 4435.527462440994,
    octave: 8
  },
  {
    note: 'D',
    frequency: 4699.884899202478,
    octave: 8
  },
  {
    note: 'D#/Eb',
    frequency: 4979.998039194946,
    octave: 8
  },
  {
    note: 'E',
    frequency: 5276.805922330965,
    octave: 8
  },
  {
    note: 'F',
    frequency: 5591.303555301891,
    octave: 8
  },
  {
    note: 'F#/Gb',
    frequency: 5924.545247197884,
    octave: 8
  },
  {
    note: 'G',
    frequency: 6277.648143930879,
    octave: 8
  },
  {
    note: 'G#/Ab',
    frequency: 6651.79597330916,
    octave: 8
  },
  {
    note: 'A',
    frequency: 7048.243013318387,
    octave: 8
  },
  {
    note: 'A#/Bb',
    frequency: 7468.3182969121635,
    octave: 8
  },
  {
    note: 'B',
    frequency: 7913.43006740813,
    octave: 8
  }
];

export default notes;
