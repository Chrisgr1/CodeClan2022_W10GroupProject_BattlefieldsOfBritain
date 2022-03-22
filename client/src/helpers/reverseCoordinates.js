import React, { useState, useEffect } from 'react';

  export const reverseCoordinates = (array) => {

    return array.map(firstInner=> {
      return firstInner.map( secondInner => {
        return secondInner.map( finalInner => {
          return finalInner.reverse()
          
        })
      })
    })
  }
