import { useEffect, useState } from 'react';
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
import { useNavigate, useParams } from 'react-router-dom';
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



// ----------------------------------------------------------------------

export default function MapPage() {
  const {id:pinId} = useParams()
  const [pin, setPin] = useState(null)

  useState(() => {
    if(pinId){
      const loadPin = async () => {
        setPin(await getPinById(pinId))
      }
      loadPin()
    }
  }, [pinId])

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
          <Container>
            <Typography variant="h2">{pin.name}</Typography>
            <Typography variant="p">
              {pin.isVisited ? `You already visited this place and earned ${pin.points} points.` : `Visit this place and earn ${pin.points}.`}
            </Typography>
          </Container>
        </Container>
      </Main>
    </StyledRoot>
  );
}
