import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function PageSelector(props){
  let prevbutton
  let nextbutton
  console.log(props.prev)
  if(props.prev){
    prevbutton = <button className="btn btn-default" value={props.prev} onClick={props.onButtonClicked} >Previous </button>
  }
  if(props.next){
    nextbutton = <button className="btn btn-default" value={props.next} onClick={props.onButtonClicked} >Next </button>
  }
  return (<div>
            {prevbutton}
            {nextbutton}
          </div>
            )
}

class CharacterTable extends Component{
  constructor(props) {
    super(props);
    this.state = {people: []};
  }
  render() {
    let people_list = this.state.people.map(function(character){
      return (<tr>
                <td> {character.name}</td>
                <td> {character.gender}</td>
                <td> {character.height} cm</td>
                <td> {character.mass} kg</td>
                <td> {character.skin_color}</td>
              </tr>
    )})
    return (
            <div>
              <h2> Characters </h2>
              <table className="table table-bordered">
              <thead>
                <th>Name</th>
                <th>Gender</th>
                <th>Height</th>
                <th>Mass</th>
                <th>Skin Color</th>
              </thead>
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
           this.updateCharacterList(apiURL)

  }
  updateCharacterList(url,callback){

     var self = this
    axios.get(url).then(function(response){    
    self.setState({people:response.data.results,next:response.data.next,prev:response.data.previous})
    });  
  }
  onButtonClicked(event){
    var url = event.target.value;
    this.updateCharacterList(url);
  }
}

class VehicleTable extends Component{
  constructor(props) {
    super(props);
    this.state = {vehicles: []};
  }
  render() {
    let vehicle_list = this.state.vehicles.map(function(vehicle){
      return (<tr>
                <td> {vehicle.name}</td>
                <td> {vehicle.model}</td>
                <td> {vehicle.manufacturer}</td>
                <td> {vehicle.length} m</td>
                <td> {vehicle.passengers}</td>
              </tr>
    )})
    return (
            <div>
              <h2> Vehicles </h2>
              <table className="table table-bordered">
              <thead>
              <tr>
                <th>Name</th>
                <th>Model</th>
                <th>Manufacturer</th>
                <th>Length</th>
                <th>Passenger Capacity</th>
                </tr>
              </thead>
              <tbody>
              {vehicle_list}
              </tbody>
              </table>
              <PageSelector onButtonClicked={this.onButtonClicked.bind(this)} prev={this.state.prev} next={this.state.next}></PageSelector>       
            </div>
    );
  }
  componentDidMount(){
           var apiURL="https://swapi.co/api/vehicles";
           this.updateVehicleList(apiURL)

  }
  updateVehicleList(url,callback){

     var self = this
    axios.get(url).then(function(response){    
    self.setState({vehicles:response.data.results,next:response.data.next,prev:response.data.previous})
    });  
  }
  onButtonClicked(event){
    var url = event.target.value;
    this.updateVehicleList(url);
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render(){
    return (<div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Characters and vehicles from Star Wars</h1>
        </header>
        <div className="row">
          <div className="col-md-6">
            <CharacterTable></CharacterTable>
           
          </div>
          <div className="col-md-6">
            <VehicleTable></VehicleTable>
           
          </div>

        </div>
      </div>
      )
  }
}

export default App;
