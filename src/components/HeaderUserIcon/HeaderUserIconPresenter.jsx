import React from 'react';
import { ListItemText, Button, Badge, withStyles, Menu, MenuItem, Avatar } from '@material-ui/core';

const HeaderUserIconPresenter = ({ user, onImgChangeButtonClick, onChange }) => {
  const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));

  const StyledMenuItem = withStyles((theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        style={{ marginRight: 8 }}
        aria-haspopup="true"
        variant="contained"
        color="default"
        onClick={handleClick}
      >
        <Avatar style={{ height: 30, width: 30, marginRight: 5 }}>
          {user.image ? (
            <img src={`${process.env.REACT_APP_SERVER_URL}${user.image}`} alt="profile" />
          ) : (
            user.nickname.slice(0, 1).toUpperCase()
          )}
        </Avatar>
        <div>{user.nickname}</div>
      </Button>
      <StyledMenu id="customized-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <StyledMenuItem className="browse-btn" onClick={onImgChangeButtonClick}>
          <i className="far fa-image" style={{ marginRight: 10 }}></i>
          <input
            style={{ display: 'none' }}
            type="file"
            onChange={onChange}
            id="real-input"
            class="image_inputType_file"
            accept="img/*"
            required
          ></input>
          <ListItemText primary="프로필 이미지 수정" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
};

export default HeaderUserIconPresenter;
