import React from 'react';
import { Avatar, Badge } from '@mui/material';

export default ({src, visited=false, size=38, alt, onClick=() =>{}, value=""}) => {
  return (
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      badgeContent={value}
      color="secondary"
      invisible={!value}
    >
      <Avatar alt={alt} src={src} onClick={() => onClick()}
        style={{
          height: size,
          opecity: visited ? 0.7 : 1 
        }}
      />
    </Badge>
  )
}