import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/iconify';
//
import LanguagePopover from '../../dashboard/header/LanguagePopover';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  color: theme.palette.grey[800],
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav, searchValue, setSearchValue }) {
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }

  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={goBack}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
          <Iconify icon="material-symbols:arrow-back" />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} ><Typography variant="h4">Vesuvio GO</Typography></Box>

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <LanguagePopover />
          {/* 
          <NotificationsPopover />
          <AccountPopover />
           */}
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
