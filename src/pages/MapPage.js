import { useEffect, useState } from 'react';
import GoogleMap from 'google-map-react';
import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import Icon from '@mui/material/Icon';

import { useNavigate } from 'react-router-dom';
//
import Header from '../layouts/dashboard/header';
import Nav from '../layouts/dashboard/nav';
import { pins as allPins } from '../_mock/pins';
import RoundedPin from '../components/RoundedPin';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  height: `calc(100vh - ${APP_BAR_MOBILE}px)`,
  marginTop: APP_BAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    height: `calc(100vh - ${APP_BAR_DESKTOP}px)`,
    marginTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const Marker = ({item, onClick}) => {
  return <RoundedPin src={item.thumbnail} onClick={onClick} value={item.points}/>
}

const MarkerMyPosition = () => {
  return <Icon style={{color:"orange", fontSize:40, width:40}}>location_on</Icon>
}

// ----------------------------------------------------------------------

export default function MapPage() {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("")

  const navigate = useNavigate();
  const navigateToPin = id => {
    navigate(`/pin/${id}`);
  }

  const [coords, setCoords] = useState(null)
  useEffect(() => {
    setInterval(async () => {
      navigator.geolocation.getCurrentPosition(
        (i) => setCoords(i.coords), 
        (e) => console.log(e))
    }, 5000);
  }, [])


  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} searchValue={searchValue} setSearchValue={setSearchValue}/>

      <Nav openNav={open} onCloseNav={() => setOpen(false)} />

      <Main>
      <Helmet>
        <title> Vesuvio GO </title>
      </Helmet>

      <GoogleMap
        // apiKey={null}
        center={[40.70,14.40]}
        zoom={10}  
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => {}}
        // onBoundsChange={this._onBoundsChange}
        // onChildClick={this._onChildClick}
        // onChildMouseEnter={this._onChildMouseEnter}
        // onChildMouseLeave={this._onChildMouseLeave}
        // margin={[K_MARGIN_TOP, K_MARGIN_RIGHT, K_MARGIN_BOTTOM, K_MARGIN_LEFT]}
        // hoverDistance={K_HOVER_DISTANCE}
        // distanceToMouse={this._distanceToMouse}
        >
          {allPins.map(i => 
            <Marker lat={i.lat} lng={i.lng} item={i} key={i.id} onClick={() => navigateToPin(i.id)}/>
          )}
          {coords && <MarkerMyPosition lat={coords.latitude} lng={coords.longitude}/>}
      </GoogleMap>
      </Main>
    </StyledRoot>
  );
}
