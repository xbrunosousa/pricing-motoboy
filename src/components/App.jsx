/* global google */
import React, { Component } from 'react'
import './App.css'
import Map from './Map/Map'
import Form from './Form/Form'
import { Container, Alert } from 'reactstrap'
import ReactGA from 'react-ga'
import { directionsDefault } from './Map/defaultDirections'

class App extends Component {
	constructor() {
		super()
		this.state = {
			origin: 'Torre de TV, Brasília',
			destination: 'Esplanada dos Ministérios',
			isSubmited: false,
			directions: directionsDefault,
			distance: undefined
		}
	}

	componentDidMount() {
		// Google Analytics
		ReactGA.initialize('UA-121994767-1')
		ReactGA.pageview(window.location.pathname + window.location.search)
	}

	searchOrigin = (e) => {
		const value = e.target.value
		this.setState({ errorRequisition: false, origin: value, isSubmited: false })
	}

	searchDestination = (e) => {
		const value = e.target.value
		this.setState({ errorRequisition: false, destination: value, isSubmited: false })
	}

	calc = () => {
		const DirectionsService = new google.maps.DirectionsService()

		DirectionsService.route({
			origin: this.state.origin,
			destination: this.state.destination,
			travelMode: google.maps.TravelMode.DRIVING,
		},
			(res, status) => {
				if (status === google.maps.DirectionsStatus.OK) {
					this.setState({
						directions: res,
						distance: res.routes[0].legs[0].distance.value / 1000 | 0,
						price: res.routes[0].legs[0].distance.value / 1000 * 1.9 + 3,
						isSubmited: true
					})
				} else {
					// console.error('Erro de requisição', res)
					this.setState({ errorRequisition: true })
				}
			})
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
		const keyGmaps = 'AIzaSyBZJDUkG83bcVMgdRoJPOotgt0v305l6W4'
		return (
			<div className='App'>
				<Container fluid>

					<Form
						searchOrigin={(e) => this.searchOrigin(e)}
						searchDestination={(e) => this.searchDestination(e)}
						calc={() => this.calc()}
						submitEnter={(e) => this.submitEnter(e)}
					/>

					<div className='mapa-xbs'>
						<Map
							googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${keyGmaps}&v=3.exp&libraries=geometry,drawing,places`}
							loadingElement={<div style={{ height: '100vh' }} />}
							containerElement={<div style={{ height: '100vh' }} />}
							mapElement={<div style={{ height: '100vh' }} />}
							directions={this.state.directions}
						/>
					</div>

					{
						this.state.distance >= 1 &&
						<Alert className='success-search' color='success'>
							Distância: {this.state.distance} km –
								Valor total: {this.state.price
								.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
						</Alert>
					}

					{
						this.state.errorRequisition === true &&
						<Alert className='error-search' color='danger'>
							Houve um erro. Verifique o endereço digitado
						</Alert>
					}

					{
						this.state.distance === 0 &&
						<Alert className='error-search' color='danger'>
							A distância minima é de 1km!
						</Alert>
					}

				</Container>

			</div>
		)
	}
}

export default App
