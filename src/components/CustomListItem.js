import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const ListItemLink = props => 
{
  return <ListItem alignItems="center" button component="a" {...props} />;
}


const CustomListItem = (props) =>
{
  return (
    <ListItemLink href={props.link} target="__blank">
      <ListItemText primary={props.title} secondary={props.article}/>
    </ListItemLink>
  );
}

export default CustomListItem;