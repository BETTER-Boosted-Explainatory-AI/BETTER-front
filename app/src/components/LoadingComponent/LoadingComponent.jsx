import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingComponent = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <CircularProgress color="secondary" />
    </div>
  );
}

export default LoadingComponent;