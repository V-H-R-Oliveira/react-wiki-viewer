import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../App.css';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  }
});

class SearchInput extends Component
{
  constructor(props)
  {
      super(props);
      this.state = {
          keyword: '',
          qtd: 1,
          titles: [],
          articles: [],
          links: []
      }
      this.onChangeHandler = this.onChangeHandler.bind(this);
      this.onSubmitHandler = this.onSubmitHandler.bind(this);
      this.fetchData = this.fetchData.bind(this);
  }

  onChangeHandler = e =>
  {
      this.setState({[e.target.name]: e.target.value});
  }

  fetchData = (keyword, amount) =>
  {
    const url = `https://en.wikipedia.org//w/api.php?action=opensearch&format=json&origin=*&search=${keyword}&limit=${amount}`;
    console.log('was updated and the url to be fetch is ' , url);
    
    axios.get(url).then(res => 
    {
      const arrayTitles = res.data[1];
      const arrayArticles = res.data[2];
      const arrayLinks = res.data[3];

      this.setState({titles: arrayTitles, articles: arrayArticles, links: arrayLinks});
      this.props.addToRootState(this.state);
      this.setState({qtd: 1, keyword: ''});
    }).catch(err => console.error(err));
  }

  onSubmitHandler = e =>
  {
    e.preventDefault();
    this.fetchData(this.state.keyword, this.state.qtd); 
  }

  render()
  {
    const { classes } = this.props;

    return (
       <div>
            <form className={classes.container} autoComplete="off" onSubmit={this.onSubmitHandler}>
                <TextField
                    id="outlined-full-width"
                    autoFocus
                    type="text"
                    className="input-mui"
                    name="keyword"
                    label="Do a search"
                    placeholder="Type something"
                    helperText="This will be query in wikipedia API"
                    fullWidth
                    margin="normal"
                    onChange={this.onChangeHandler}
                    value={this.state.keyword}
                    required
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }} />
                    <label style={{marginLeft: "1%", marginRight: "5px"}} htmlFor="qtd">Article amount:</label>
                    <span style={{marginRight: '1%'}}>{this.state.qtd}</span>
                    <input type="range" name="qtd" min="1" max="50" step="1" 
                    onChange={this.onChangeHandler} value={this.state.qtd} /> 
            </form>
            <Button variant="outlined" color="primary" className={classes.button}>
                <a href="https://en.wikipedia.org/wiki/Special:Random" rel="noopener noreferrer" 
                target="_blank" style={{textDecoration: 'none', color: 'inherit'}}>
                Get a random article</a>
            </Button>
        </div>
    );
  }
}

SearchInput.propTypes = 
{
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchInput);
