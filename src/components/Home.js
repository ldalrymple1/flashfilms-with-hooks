import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import '../styles/animate.css'
import '../styles/home.scss'


function Home () {
  const [animateReady, setAnimateReady] = useState(null)
  const history = useHistory()

  setTimeout(() => {
    setAnimateReady
  }, 1300)
  setTimeout(() => {
    history.push('/search')
  }, 2300)

  return (
    <div className={`home-div ${animateReady ? 'animated fadeOut' : '' }`}>
      <h1 className="animated zoomIn">FLASH FILMS</h1>
    </div>
  )

}

export default Home

// class Home extends React.Component {
//   constructor() {
//     super()

//     this.state = {
//       animateReady: null,
//       test: ''
//     }
//   }

  


//   render() {
//     setTimeout(() => {
//       this.setState({ animateReady: true })
//     }, 1300)
//     setTimeout(() => {
//       this.props.history.push('/search')
//     }, 2300)
//     return (
//       <div className={`home-div ${this.state.animateReady ? 'animated fadeOut' : '' }`}>
//         <h1 className="animated zoomIn">FLASH FILMS</h1>
//       </div>
//     )
//   }
// }

