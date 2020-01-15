import React from 'react'
import axios from 'axios'

import '../styles/search.scss'
import '../styles/animate.css'

class Search extends React.Component {
  constructor() {
    super()

    this.state = {
      genres: [],
      selectedGenre: '',
      searchActor: '',
      actorID: null,
      searchOutput: [],
      submitting: false,
      error: false

    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.MOVIEDB_ACCESS_TOKEN}`)
      .then(res => this.setState({ genres: res.data.genres }))
      .catch(err => console.log(err))
  }

  handleChange(e) {
    // console.log(e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    // console.log('I have submitted', this.state)
    const filteredGenre = this.filteredGenre()
    const formattedActorName = this.formatActorName()
    // console.log(formattedActorName, filteredGenre)

    if (this.state.searchActor === '') return this.props.history.push(`/search/${filteredGenre}`)
    else {
      axios.get(`https://api.themoviedb.org/3/search/person?include_adult=false&query=${formattedActorName}&&page=1&language=en-US&api_key=${process.env.MOVIEDB_ACCESS_TOKEN}`)
        .then(res => {
          if (res.data.results.length === 0) {

            this.setState({ error: true, searchActor: 'Invalid search' })
            setTimeout(() => {

              return this.setState({ error: false })
            },3000)
            return
          }
          this.setState({ actorID: res.data.results.pop().id })
          this.setState({ submitting: true })
          setTimeout(() => {
            //add error if the typed name is wrong (NEED CLASSES)
            const actorIDConcat = `&with_people=${this.state.actorID}`
            this.props.history.push(`/search/${filteredGenre}${actorIDConcat}`)
          }, 800)

        })
    }
  }

  formatActorName() {
    if (this.state.searchActor.split(' ').length > 1) {
      return this.state.searchActor.toLowerCase().split(' ').join('-')
    } else {
      return this.state.searchActor.toLowerCase()
    }
  }

  filteredGenre() {
    if (this.state.selectedGenre !== 'GENRE' && this.state.selectedGenre !== '') {
      return `&with_genres=${this.state.genres.filter(genre => genre.name === this.state.selectedGenre).pop().id}`
    } else {
      return ''
    }
  }

  render() {
    console.log('state change', this.state)
    // console.log('state props', this.props)
    const { genres, submitting, error } = this.state
    return (
      <div className={`form-line-wrapper animated fadeIn ${submitting ? 'fadeOutLeft' : ''}`}>
        <div className="first-second-wrapper">
          <div className="firsthalf">
            {!error ? 
              <h1>MAKE A CHOICE:</h1> :
              <h1 className="invalid-input">INVALID SEARCH</h1>
            }
            
            
          </div>
          <div className="secondhalf">
            <form onSubmit={this.handleSubmit}>
              <div className="custom-select">
                <select onChange={this.handleChange} name="selectedGenre">
                  <option>GENRE</option>
                  {genres.map(genre => <option key={genre.id}>{genre.name}</option>)}
                </select>
              </div>
              <br></br>
              <input className={`${this.state.error ? 'input-error' : ''}`} type="text" placeholder="ACTOR" onChange={this.handleChange} name="searchActor" />
              <br></br>
              <button>SUBMIT</button>
            </form>
          </div>
        </div>
        <div className="bottomline">
          <div className="line"></div>
        </div>
      </div>
    )
  }
}

export default Search