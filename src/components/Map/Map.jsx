/* global google */
import React from 'react'

import { compose, withProps, lifecycle } from 'recompose'
import { withGoogleMap, GoogleMap, DirectionsRenderer } from 'react-google-maps'

const keyGmaps = 'AIzaSyBZJDUkG83bcVMgdRoJPOotgt0v305l6W4'

const Map = compose(
	withProps({
		googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${keyGmaps}&v=3.exp&libraries=geometry,drawing,places`,
		loadingElement: <div style={{ height: '70vh' }} />,
		containerElement: <div style={{ height: '70vh' }} />,
		mapElement: <div style={{ height: '70vh' }} />
	}),
	withGoogleMap,
	lifecycle({
		componentDidMount() {
			const DirectionsService = new google.maps.DirectionsService()

			DirectionsService.route({
				origin: this.props.origin,
				destination: this.props.destination,
				travelMode: google.maps.TravelMode.DRIVING,
			}, (res, status) => {
				if (status === google.maps.DirectionsStatus.OK) {
					this.setState({
						directions: res,
						distance: res.routes[0].legs[0].distance.value
					})
					console.log(`${this.state.distance} metros`)
				} else {
					console.error(`error fetching directions ${res}`)
				}
			})
		}
	})
)(props =>
	<GoogleMap defaultZoom={1}>
		{
			props.directions &&
			<DirectionsRenderer
				directions={props.directions}
			/>
		}

		{
			props.distance !== undefined &&
			<div className='results'>
				<p>Distância entre os pontos: {props.distance}m</p>
				<p>Valor R${props.distance / 1000 * 1.9 + 5}</p>
			</div>
		}
	</GoogleMap>
)

export default Map
