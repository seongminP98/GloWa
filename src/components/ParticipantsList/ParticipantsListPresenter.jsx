import React from 'react';
import styled from 'styled-components';
import ScheduleItem from '../../components/ScheduleItem';
import { Popover, List, ListSubheader, ListItem, ListItemText, Badge, withStyles, Menu, MenuItem, Avatar } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const ParticipantsListItemDiv = styled.div`
  display: flex;
  align-items: center;
`;

const ParticipantsList = styled.div`
  margin-left: 5px;
  margin-right: 10px;
`;

const ParticipantsListPresenter = ({ master_id, user_id, user_nickname, onMandateButtonClick, onKickButtonClick }) => {
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
    <ParticipantsListItemDiv>
      <Button
        aria-controls="customized-menu"
        style={{ marginRight: 8 }}
        aria-haspopup="true"
        variant="contained"
        color="default"
        onClick={handleClick}
      >
        <Avatar style={{ height: 30, width: 30, marginRight: 5 }}>{user_nickname.slice(0, 1).toUpperCase()}</Avatar>
        <ParticipantsList>{user_nickname}</ParticipantsList>
      </Button>
      <StyledMenu id="customized-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        {master_id !== user_id && (
          <>
            <StyledMenuItem onClick={onMandateButtonClick}>
              <i className="fas fa-crown" style={{ marginRight: 7 }}></i>
              <ListItemText primary="모든 권한 위임" />
            </StyledMenuItem>
            <StyledMenuItem onClick={onKickButtonClick}>
              <i className="fas fa-user-slash" style={{ marginRight: 7 }}></i>
              <ListItemText primary="일정에서 제외하기" />
            </StyledMenuItem>
          </>
        )}
        {master_id === user_id && (
          <StyledMenuItem onClick={onMandateButtonClick}>
            <i className="fas fa-crown" style={{ marginRight: 7 }}></i>
            <ListItemText primary="방장입니다." />
          </StyledMenuItem>
        )}
      </StyledMenu>
    </ParticipantsListItemDiv>
  );
};

export default ParticipantsListPresenter;
