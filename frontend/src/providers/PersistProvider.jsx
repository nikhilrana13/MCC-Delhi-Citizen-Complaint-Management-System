"use client"
import React from 'react'
import { persistor } from '../redux/Store'
import { PersistGate } from 'redux-persist/integration/react'

const PersistProvider = ({children}) => {
  return (
    <PersistGate loading={null} persistor={persistor}>
            {children}
    </PersistGate>
  )
}

export default PersistProvider