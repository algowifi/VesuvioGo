import React from 'react';
import { Avatar } from '@mui/material';

export default ({src, visited=false, size=38, alt, onClick=() =>{}}) => {
  return <Avatar alt={alt} src={src} onClick={() => onClick()}style={{
    height: size,
    opecity: visited ? 0.7 : 1 
  }} />
}