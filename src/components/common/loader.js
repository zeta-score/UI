import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import LinearProgress from '@material-ui/core/LinearProgress';

const styles = theme => ({
  root: {
    flexGrow: 1,
    position: 'fixed',
    top: 0,
    width: '100%'
  },
  linearColorPrimary: {
    backgroundColor: '#5b9ce4',
  },
  linearBarColorPrimary: {
    backgroundColor: '#1b2e43',
  },
});

function Loader(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <LinearProgress
        classes={{
          colorPrimary: classes.linearColorPrimary,
          barColorPrimary: classes.linearBarColorPrimary,
        }}
      />
    </div>
  );
}

Loader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loader);
