import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

const apiContrints = {
  initial: 'initial',
  process: 'process',
  success: 'success',
}

class Home extends Component {
  state = {places: [], status: apiContrints.initial}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({status: apiContrints.process})
    const response = await fetch('https://apis.ccbp.in/tg/packages')
    const data = await response.json()
    console.log(data)
    const responseData = data.packages.map(each => ({
      id: each.id,
      name: each.name,
      description: each.description,
      imageUrl: each.image_url,
    }))

    this.setState({places: responseData, status: apiContrints.success})
  }

  renderLodaer = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderSuccess = () => {
    const {places} = this.state
    return (
      <ul className="cards-list">
        {places.map(each => (
          <li key={each.id} className="card">
            <div>
              <img src={each.imageUrl} alt={each.name} className="image" />
            </div>
            <div className="content">
              <h1>{each.name}</h1>
              <p>{each.description}</p>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  renderViews = () => {
    const {status} = this.state

    switch (status) {
      case apiContrints.process:
        return this.renderLodaer()
      case apiContrints.success:
        return this.renderSuccess()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="main">
        <h1 className="heading">Travel Guide</h1>
        {this.renderViews()}
      </div>
    )
  }
}
export default Home
