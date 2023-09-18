import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { RootState } from '@/rtk';

function FetchingLinear(): JSX.Element {
  const { fetching } = useSelector((state: RootState) => state.app);
  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      {fetching && <LinearProgress sx={{ position: 'absolute', width: '100%' }} />}
    </Box>
  );
}
export { FetchingLinear };
