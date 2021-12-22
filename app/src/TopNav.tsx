import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom";

import './TopNav.css';

export function TopNav() {

  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar id="top-nav" position="fixed">
        <Toolbar>
          <img id="v-logo" className="clickable" alt="voget.io" src="/assets/v-logo-white.png" onClick={() => navigate('/')}/>
          <Typography variant="h6" component="div" className="clickable" sx={{ flexGrow: 1 }} onClick={() => navigate('/')}>
            voget.io
          </Typography>
          <Link href="https://github.com/matty-v"><span className="fa fa-github" /></Link>
          <Link href="https://www.linkedin.com/in/matthew-voget-47a225a1"><span className="fa fa-linkedin" /></Link>
          <Link href="mailto:matt.voget@gmail.com"><span className="fa fa-envelope" /></Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
