import React from 'react'
import './loading.css'
import { CircularProgress } from '@mui/material'
const Loading = () => {
  return (
    <div className="loading-container">
    <div className="loading-spinner"></div>
    <div className="loading-text">Loading...</div>
  </div>
  )
}

export default Loading