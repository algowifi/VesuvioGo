import React from 'react';
import { Avatar } from '@mui/material';

export default ({src, visited=false, size=38, alt}) => {
  return <Avatar alt={alt} src={src} style={{
    height: size,
    opecity: visited ? 0.7 : 1 
  }} />
}