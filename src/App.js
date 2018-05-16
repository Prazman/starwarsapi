import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function PageSelector(props){
  let prevbutton
  let nextbutton
  console.log(props.prev)
  if(props.prev){
    prevbutton = <button value={props.prev} onClick={props.onButtonClicked} >Previous </button>
  }
  if(props.next){
    nextbutton = <button value={props.next} onClick={props.onButtonClicked} >Next </button>
  }
  return (<div>
            {prevbutton}
            {nextbutton}
          </div>
            )
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {people: []};
  }
  render() {
    let people_list = this.state.people.map(function(character){
      return (<tr>
                <td> {character.name} </td>
                <td> {character.gender}</td>
                <td> {character.height} </td>
                <td> {character.mass}</td>
                <td> {character.skin_color}</td>
              </tr>
    )})
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Characters from Star Wars</h1>
        </header>
        <table>
        <tbody>
        {people_list}
        </tbody>
        </table>
        <PageSelector onButtonClicked={this.onButtonClicked.bind(this)} prev={this.state.prev} next={this.state.next}></PageSelector>
      </div>
    );
  }
  componentDidMount(){
           var apiURL="https://swapi.co/api/people";
           this.updateList(apiURL)

  }
  updateList(url,callback){

     var self = this
    axios.get(url).then(function(response){    
    self.setState({people:response.data.results,next:response.data.next,prev:response.data.previous})
    });  
  }
  onButtonClicked(event){
    var url = event.target.value;
    this.updateList(url);
  }
}

export default App;
