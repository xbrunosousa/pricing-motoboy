import React from 'react'
import { Button, Col, InputGroup, Input, InputGroupText, InputGroupAddon } from 'reactstrap'

const Form = ({ searchOrigin, searchDestination, calc, submitEnter, resetForm }) => (
	<div className='Form'>
		<Col sm={{ size: 6, offset: 3 }}>


			<InputGroup>
				<InputGroupAddon addonType="prepend">
					<InputGroupText>Origem</InputGroupText>
				</InputGroupAddon>

				<Input
					onChange={searchOrigin}
					onKeyDown={submitEnter}
					placeholder='Insira o endereço de partida...'
				/>

			</InputGroup>

			<br />

			<InputGroup>
				<InputGroupAddon addonType="prepend">
					<InputGroupText>Destino</InputGroupText>
				</InputGroupAddon>
				<Input
					onChange={searchDestination}
					type='text'
					onKeyDown={submitEnter}
					placeholder='Insira o endereço de destino...'
				/>
			</InputGroup>

			<br />
			<Button color='primary' className='calc' onClick={calc}>Calcular</Button>
		</Col>
	</div>
)

export default Form
