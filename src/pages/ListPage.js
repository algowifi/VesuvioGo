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
import { useNavigate } from 'react-router-dom';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { PinListHead } from '../sections/@dashboard/pin';
// mock
import USERLIST from '../_mock/user';
//
import Header from '../layouts/dashboard/header';
import Nav from '../layouts/dashboard/nav';
import { pins as allPins } from '../_mock/pins';
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

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'visited', label: 'Status', alignRight: true },  
];

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

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

// ----------------------------------------------------------------------

export default function MapPage() {
  const [open, setOpen] = useState(false);

  const [filteredPins, setFilteredPins] = useState([])
  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    setFilteredPins(allPins.filter(i => i.name.toLowerCase().includes(searchValue.toLowerCase())))
  }, [searchValue])

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const navigate = useNavigate();
  const navigateToPin = id => {
    navigate(`/pin/${id}`);
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const isNotFound = !filteredPins.length && !!searchValue;

  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} searchValue={searchValue} setSearchValue={setSearchValue}/>

      <Nav openNav={open} onCloseNav={() => setOpen(false)} />

      <Main>
          <Scrollbar>
            <TableContainer>
              <Table>
                <PinListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredPins.map((row) => {
                    const {
                      id,
                      name,
                      points,
                      thumbnail,
                      isVisited
                    } = row

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" onClick={() => navigateToPin(id)}>
                        <TableCell component="th" scope="row">
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <RoundedPin src={thumbnail} />
                            <Typography variant="subtitle2" noWrap style={{maxWidth: 200}}>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="right">{isVisited ? "visited" : "to visit"}</TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{searchValue}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

      </Main>
    </StyledRoot>
  );
}
