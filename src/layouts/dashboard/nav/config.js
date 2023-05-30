// component
import Icon from '@mui/material/Icon';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/VesuvioGo/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'map',
    path: '/map',
    icon: <Icon>map</Icon>,
  }, {
    title: 'list',
    path: '/list',
    icon: <Icon>checklist</Icon>,
  }
];

export default navConfig;
