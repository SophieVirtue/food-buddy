import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const TagInput = ({ tag, deleteTag }) => {
  return (
    <li>
      <Button
        variant="outlined"
        color="primary"
        className={classes.button}
        onClick={deleteTag(tag._id)}
      >
        {tag.title}
        {/* <input type="text" id={tag._id} onChange={() => {}} /> */}
      </Button>
    </li>
  );
};

TagInput.propTypes = {
  title: PropTypes.string.isRequired
};

export default withStyles(styles)(TagInput);