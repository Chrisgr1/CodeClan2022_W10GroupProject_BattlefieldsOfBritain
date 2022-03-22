import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography'

const marks = [
  {
    value: 0,
    label: '900',
  },
  {
    value: 6.25,
  },
  {
    value: 12.5,
    label: '1000'
  },
  {
    value: 18.75,
  },
  {
    value: 25,
    label: '1100',
  },
  {
    value: 31.25,
  },
  {
    value: 37.5,
    label: '1200',
  },
  {
    value: 43.75,
  },
  {
    value: 50,
    label: '1300'
  },
  {
    value: 56.25,
  },
  {
    value: 62.5,
    label: '1400',
  },
  {
    value: 68.75,
  },
  {
    value: 75,
    label: '1500',
  },
  {
    value: 81.25,
  },
  {
    value: 87.5,
    label: '1600',
  },
  {
    value: 93.75,
  },
  {
    value: 100,
    label: '1700',
  },
];

function valuetext(value) {
  return `${value} AD`;
}

function dateConverter(value) {
    return ( (value * 8) + 900 );
}

function valueLabelFormat(value) {
//   return marks.findIndex((mark) => mark.value === value) + 1
    return dateConverter(value);
}

export default function DiscreteSliderMarks({changeYearValues}) {

  function handleOnChange(e) {
    changeYearValues( [dateConverter(e.target.value[0]), dateConverter(e.target.value[1])] );
  }

  return (
    <Box sx={{ 
      fontFamily: 'Alegreya',
      width: '42%', 
      height: '70%',
      borderTop: '0 0 1em rgba(122, 69, 0, 0.5) inset',
      // borderBottom: '0 0 1em rgba(122, 69, 0, 0.5) inset',
      alignSelf: 'center',
      borderRadius: '15px',
      // opacity: 0.9,
      background: 'white',
      // marginLeft: '1em',
      boxShadow: '0 0 2em rgba(122, 69, 0, 0.5) inset',
      padding: '2em',
      }}>

      <Typography id='date-range' gutterBottom>
        Date Range
      </Typography>

      <Slider
        getAriaLabel={() => 'date-range'}
        orientation="vertical"
        defaultValue={[0, 100]}
        valueLabelFormat={valueLabelFormat}
        getAriaValueText={valuetext}
        step={null}
        valueLabelDisplay="auto"
        marks={marks}
        onChange={handleOnChange}
        sx={{ height: '80%', marginTop: '1em' }}

      />

    </Box>
  );
}     