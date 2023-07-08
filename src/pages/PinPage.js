import React, { useEffect, useState } from 'react';
import GoogleMap from 'google-map-react';
import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';
import ConfettiExplosion from 'react-confetti-explosion';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { PinListHead } from '../sections/@dashboard/pin';
// mock
import USERLIST from '../_mock/user';
//
import Header from '../layouts/pin/header';
import Nav from '../layouts/dashboard/nav';
import { getPinById } from '../_mock/pins';
import RoundedPin from '../components/RoundedPin'

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
  backgroundColor: theme.palette.grey[200],
  [theme.breakpoints.up('lg')]: {
    height: `calc(100vh - ${APP_BAR_DESKTOP}px)`,
    marginTop: APP_BAR_DESKTOP + 24
  },
}));


// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}


// ----------------------------------------------------------------------

export default function MapPage() {
  const {id:pinId} = useParams()
  const query = useQuery();

  const [pin, setPin] = useState(null)  
  const [isExploding, setIsExploding] = useState(false)

  useEffect(() => {
    if(pinId){
      const loadPin = async () => {
        setPin(await getPinById(pinId))
      }
      loadPin()
    }
  }, [pinId])

  useEffect(() => {
    if(!!query.get("justVisited") && pin && !pin.isVisited)
      setVisited()
  }, [pin])

  const setVisited = () => {
    if(pin){
      setIsExploding(true)
      setPin({
        ...pin,
        isVisited: true
      })
    }
  }

  if(!pin) {
    return <div>loading...</div>
  }

  return (
    <StyledRoot>
      <Header/>

      <Main>
        <Container style={{padding:0}}>
          <div alt={"alt text"} style={{
            width: "100%", 
            height:"30vh", 
            backgroundImage:`url('${pin.thumbnail}')`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center"
          }}/>
          <Container style={{padding:0}}>
            <Container>
              <Typography variant="h2">{pin.name}</Typography>
              <Typography variant="p">
                {pin.isVisited ? `You already visited this place and earned ${pin.points} points.` : `Visit this place and earn ${pin.points} points.`}
              </Typography>
            </Container>
            <Container style={{display:"flex",justifyContent:"center", width:"100%", marginTop:40, flexDirection:"column", alignItems:"center"}}>
              <Button variant="contained" disabled={pin.isVisited} onClick={setVisited}>Mark as visited</Button>
              {isExploding && <ConfettiExplosion 
                  style={{}}
                  particleCount={400}
                  particleSize={18}
                  force={1}
                  height="150vh"
                  width={1000}
                  duration={3000}
                  onComplete={() => setIsExploding(true)} 
                />}
            </Container>
          </Container>
        </Container>
      </Main>
    </StyledRoot>
  );
}
