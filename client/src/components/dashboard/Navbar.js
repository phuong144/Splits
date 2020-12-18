import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export default function Navbar() {
  const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      backgroundColor: '#303030',
      marginBottom: '20px',
    },
    link: {
      textDecoration: 'none',
    },
  });
  const classes = useStyles();
  return (
      <Paper className={classes.root}>
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          centered
          value={0}
        >
          <Link to="/dashboard/workout"><Tab value={0} className={classes.link} label="View Today's Workout"/></Link>
          <Link to="/dashboard/switch"><Tab value={1} className={classes.link} label="Choose Split"/></Link>
        </Tabs>
      </Paper>
  );
}
