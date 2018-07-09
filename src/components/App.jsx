import React, { Component } from 'react'
import './App.css'
import Map from './Map/Map'
import Form from './Form/Form'
import { Container } from 'reactstrap'
import ReactGA from 'react-ga'

class App extends Component {
	componentDidMount() {
		// Google Analytics
		ReactGA.initialize('UA-121994767-1')
		ReactGA.pageview(window.location.pathname + window.location.search)
	}
	constructor() {
		super()
		this.state = {
			origin: undefined,
			destination: undefined,
			isSubmited: false
		}
	}
	searchOrigin = (e) => {
		const value = e.target.value
		this.setState({ origin: value, isSubmited: false })
	}

	searchDestination = (e) => {
		const value = e.target.value
		this.setState({ destination: value, isSubmited: false })
	}

	calc = () => {
		console.log('Botão "calcular" acionado')
		this.setState({
			isSubmited: true
		})
	}

	submitEnter = (e) => {
		if (e.keyCode === 13) {
			this.calc()
		}
	}

	render() {
		return (
			<div className='App'>
				<Container fluid>

					<Form
						searchOrigin={(e) => this.searchOrigin(e)}
						searchDestination={(e) => this.searchDestination(e)}
						calc={() => this.calc()}
						submitEnter={(e) => this.submitEnter(e)}
					/>

					<br />

					{this.state.isSubmited === true &&
						<div className='mapa-xbs'>
							<Map
								origin={this.state.origin}
								destination={this.state.destination}
							/>
						</div>
					}

				</Container>
			</div>
		)
	}
}

export default App
