import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import CustomListItem from './CustomListItem';

const styles = theme => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      margin: '0 auto',
      marginTop: '1%',
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
});

const ArticleList = props =>
{
  const { classes, titles, links, articles } = props;
  return (
    <div>
      <h3 style={{textAlign: 'center', textDecoration: 'underline'}}>Articles Found:</h3>
        <List className={classes.root}>
            {
              titles.map((item, index) => <CustomListItem key={index} link={links[index]} title={item} article={articles[index]} />)
            }
        </List>
    </div>
  );
}

ArticleList.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  

export default withStyles(styles)(ArticleList);
