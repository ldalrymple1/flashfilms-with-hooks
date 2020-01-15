import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { Link } from 'react-router-dom'

import '../styles/index.scss'
import '../styles/animate.css'


export default function Index() {
  const [ movies, setMovies ] = useState([])
  const [searchResult, setSearchResult] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    getMovies()
    searchResult1(searchResult)
    console.log(movies, 'moooovies')
  }, [])

  // &sort_by=popularity.desc&include_adult=false&include_video=false${this.props.match.params.id}&page=1
  
  function getMovies(){
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.MOVIEDB_ACCESS_TOKEN}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false${id}&page=1`)
      .then(res => res.data.results.length === 0 ? setSearchResult(true) : setMovies(res.data.results))
      .catch(err => console.log(err))

  }

  function searchResult1(searchResult) {
    if (searchResult) 
      return (
        <div className="error-response animated fadeInRight">
          <h1>OOPS! There were no results for your search...</h1>
        </div>
      )
  }

  
  return (
    <div className="wrapper animated fadeInRight">
      {movies.map(movie =>
      // write IF condition catch broken images
        <Link className="link" to={`/movies/${movie.id}`} key={movie.id}>
          <div className="card">
            <div className="poster-wrapper">
              <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title}></img>
            </div>
            <div className="title-wrapper">
              <p className="film-title">{movie.title.toUpperCase()}</p>
            </div>
          </div>
        </Link>
      )}
    </div>
    
  )
   


}

// class Index extends React.Component {
//   constructor() {
//     super()

//     this.state = {
//       movies: [],
//       searchResult: false
//     }

  

//   }

//   componentDidMount() {
//     axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.MOVIEDB_ACCESS_TOKEN}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false${this.props.match.params.id}&page=1`)
//       .then(res => {
//         if (res.data.results.length === 0) this.setState({ searchResult: true })
//         this.setState({ movies: res.data.results })

//       })
//       .catch(err => console.log(err))
      
//   }
  
//   render() {
//     console.log(this.state)
//     if (this.state.searchResult) {
//       return (
//         <div className="error-response animated fadeInRight">
//           <h1>OOPS! There were no results for your search...</h1>
//         </div>
//       )
//     }
//     if (!this.state.movies) return null
//     return (
//       <div className="wrapper animated fadeInRight">
//         {this.state.movies.map(movie =>
//         // write IF condition catch broken images
//           <Link className="link" to={`/movies/${movie.id}`} key={movie.id}>
//             <div className="card">
//               <div className="poster-wrapper">
//                 <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title}></img>
//               </div>
//               <div className="title-wrapper">
//                 <p className="film-title">{movie.title.toUpperCase()}</p>
//               </div>
//             </div>
//           </Link>
//         )}
//       </div>

//     )
//   }

// }

// export default Index


// axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.MOVIEDB_ACCESS_TOKEN}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_people=${this.state.actorID}${filteredGenre}&page=1`)
//   .then(res => {
//     console.log('new', res.data)
//     this.setState({ searchOutput: res.data })
//     this.props.history.push(`/search/${this.formatActorName}${this.state.actorID}`)
//   })