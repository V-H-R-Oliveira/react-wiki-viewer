import React, { Component } from 'react';
import Header from './components/Header';
import SearchInput from './components/SearchInput';
import ArticleList from './components/ArticleList';
import './App.css';

class App extends Component 
{
  constructor(props)
  {
    super(props);
    this.state =
    {
      titles: [],
      articles: [],
      links: []
    }

    this.dataFromCompHandler = this.dataFromCompHandler.bind(this);
  }
  
  dataFromCompHandler = ({titles, articles, links}) => this.setState({titles, articles, links});
  
  render() 
  {
    return (
      <div>
        <Header />
        <SearchInput addToRootState={this.dataFromCompHandler} />
        <ArticleList titles={this.state.titles} articles={this.state.articles} links={this.state.links} />
      </div>
    );
  }
}

export default App;
