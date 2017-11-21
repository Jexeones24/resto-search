import React, { Component } from 'react'
import { getCoords, getPredictions } from './lib/service.js'
import './App.css'

export default class App extends Component {
  state = {
    coords: {},
    predictions: [],
    address: '',
    location: {}
  }

  handleChange = (e) => {
    this.setState({ address: e.target.value })
    let address = e.target.value
    getPredictions(address, this.state.coords.lat, this.state.coords.lng)
    .then(data => {
      this.setState({ predictions: data.predictions })
    })
  }

  handleClick = (p) => {
    this.setState({ location: p.description })
    getCoords(p.description)
    .then(data => {
      let coords = data.results[0].geometry.location
      this.setState({ coords })
    })
  }

  showPredictions = () =>
    <div>
      {this.state.predictions.map((p, i) =>
        <div
          key={i}
          className='list-item'
          onClick={this.handleClick.bind(this, p)}>{p.description}</div>
        )}
    </div>

  showCoords = () => <div>{'Location: '+this.state.location+ ' ' + 'Latitude: '+this.state.coords.lat + ' ' + 'Longitude: '+this.state.coords.lng}</div> 

  render() {
    return (
      <div className='App'>
        <div className='container'>
          <div className='content'>
            <form onSubmit={this.handleSubmit}>
              <input
                type='text'
                className='list-item'
                value={this.state.address}
                placeholder='search...'
                onChange={this.handleChange}
                required
              />
            </form>

            {this.state.predictions.length === 0 ? [] : this.showPredictions()}
            {Object.keys(this.state.coords).length === 0 && this.state.coords.constructor === Object ? [] : this.showCoords()}

          </div>
        </div>
      </div>
    )
  }
}
