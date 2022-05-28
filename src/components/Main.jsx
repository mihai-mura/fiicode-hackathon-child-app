import { Button } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import socket from '../services/socketio';
import LogoText from '../images/trackme-black.png';
import './Main.scss';

const Main = () => {
	const [name, setName] = useState('');
	const prevLocation = useRef(null);

	useEffect(() => {
		(async () => {
			const res = await fetch(`${process.env.REACT_APP_API_URL}/children/${localStorage.getItem('uuid')}`);
			const response = await res.text();
			setName(response);
			navigator.geolocation.getCurrentPosition(function (position) {
				socket.emit('location', {
					uuid: localStorage.getItem('uuid'),
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
				});
				prevLocation.current = { lat: position.coords.latitude, lng: position.coords.longitude };
			});
		})();
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			navigator.geolocation.getCurrentPosition(function (position) {
				if (position.coords.latitude !== prevLocation.current.lat || position.coords.longitude !== prevLocation.current.lng) {
					socket.emit('location', {
						uuid: localStorage.getItem('uuid'),
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
					});
					prevLocation.current.lat = position.coords.latitude;
					prevLocation.current.lng = position.coords.longitude;
				}
			});
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className='children-main'>
			<div className='navbar-qrcode'>
				<div className='qrcode-navbar-img-container'>
					<img src={LogoText} alt='logo' to='/' />
				</div>
			</div>
			<div className='children-container'>
				<div className='children-header'>
					<p className='welcome-kid'>
						Welcome back, <span className='children-name'>{name}</span>
					</p>
					<p className='emergency-text'>What is your emergency?</p>
				</div>
				<div className='emergency-buttons'>
					<Button radius='lg' variant='gradient' gradient={{ from: 'orange', to: 'red' }}>
						An accident
					</Button>
					<Button radius='lg' variant='gradient' gradient={{ from: 'orange', to: 'red' }}>
						Chest pain
					</Button>
					<Button radius='lg' variant='gradient' gradient={{ from: 'orange', to: 'red' }}>
						Breathlessness
					</Button>
					<Button radius='lg' variant='gradient' gradient={{ from: 'orange', to: 'red' }}>
						Uncounsciouness
					</Button>
				</div>
			</div>
		</div>
	);
};
export default Main;
