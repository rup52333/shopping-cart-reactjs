import React,{useState} from 'react';
import AppBar from '@mui/material/AppBar';
import {Box,Button} from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import {CartState} from '../Context/Context';
import { useNavigate } from "react-router-dom";

import { useContext} from 'react';
import {Cart} from '../Context/Context.jsx'
import Avatar from '@mui/material/Avatar';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'white',
  marginRight: theme.spacing(2),

  marginLeft: 5,
  width: '100%',
  
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color:'black'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color:'black',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));



export default function Header() {
    const navigate = useNavigate();
  
    const {
      state: { cart },
      dispatch,
      productDispatch,
    } = CartState();

  
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    navigate(`/login`)
    setAnchorEl(null);
  };


  const {account,setAccount}=useContext(Cart);

  return (
    <Box sx={{ flexGrow: 1 }}>
     
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={()=>navigate(`/`)}>
            Shopping Cart
          </Typography>
      


          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search a product"
              inputProps={{ 'aria-label': 'search' }}

              
              onChange={(e) => {
                productDispatch({
                  type: "FILTER_BY_SEARCH",
                  payload: e.target.value,
                });
              }}
            />
          </Search>
         
          <IconButton aria-label="cart" onClick={()=>navigate(`/cart`)}>
        <StyledBadge badgeContent={cart.length} color="secondary">
        <ShoppingCartIcon sx={{color:'white'}} />

      </StyledBadge>
        </IconButton>
   
      
          {auth && (
            <div>
              
              {/* <IconButton onClick={handleMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >

                <MenuItem onClick={handleClose}>Login</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>

              </Menu> */}
                        {account?<h5 color="inherit" style={{border:'1px solid green',backgroundColor:'green'}} >{account}</h5>: <Button color="inherit"  onClick={handleClose} sx={{border:'1px solid green',backgroundColor:'green'}}>Login</Button>}
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}




