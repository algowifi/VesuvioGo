import React, {useEffect, useState} from 'react'
import { CircularProgress, Typography } from '@mui/material';
import { Navigate } from 'react-router-dom';


export default () => {

  const [showLogo, setShowLogo] = useState(true)
  useEffect(() => {
    const waitAndHideLogo = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowLogo(false)
    } 
    waitAndHideLogo()
  }, [])

  const [waitingForGeolocResponse, setWaitForGeolocResponse] = useState(true)
  const [geolocBlocked, setGeolocBlocked] = useState(true)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (i) => {
        setWaitForGeolocResponse(false)
        setGeolocBlocked(false)
      }, 
      (e) => {
        setWaitForGeolocResponse(false)
        setGeolocBlocked(true)
      }
    )
  },[])

  const loadingContainer = (
    <div style={{
      display: "flex",
      flexDirection:"column",
      alignItems:"center",
      height:"100%",
      width:"100%",
      paddingTop: 300
    }}>
      <Typography variant="h1">Vesuvio GO</Typography>
      <CircularProgress color="inherit" />
    </div>
  )

  const broserIsDesktopContainer = (
    <div style={{
      display: "flex",
      flexDirection:"column",
      alignItems:"center",
      height:"100%",
      width:"100%",
      paddingTop: 300
    }}>
      <Typography variant="h1">Vesuvio GO</Typography>
      <Typography variant="subtitle1">This application is only available on mobile.</Typography>
    </div>
  )

  const geolocBlockedContainer = (
    <div style={{
      display: "flex",
      flexDirection:"column",
      alignItems:"center",
      height:"100%",
      width:"100%",
      paddingTop: 300
    }}>
      <Typography variant="h1">Vesuvio GO</Typography>
      <Typography variant="subtitle1">This application needs access to your location. Allow access and refresh the page.</Typography>
    </div>
  )

  const browserIsDesktop = !(/Android|iPhone/i.test(navigator.userAgent) || /127|192|localhost/i.test(window.location.hostname))

  return (
    <div style={{
      width:"100%",
      height:"100vh",
      position:"absolute",
      zIndex: 10000,
      backgroundColor:"white"
    }}>
      {
      (showLogo || waitingForGeolocResponse) ? 
        loadingContainer : 
      browserIsDesktop ? 
        broserIsDesktopContainer :
      geolocBlocked ? 
        geolocBlockedContainer :
        <Navigate to="/map" />
      }
    </div>
  )
}