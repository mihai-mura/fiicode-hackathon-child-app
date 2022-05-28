import { QRCode as QR } from 'react-qrcode-logo';
import Logo from '../images/trackme-logo.svg';
import LogoText from '../images/trackme-black.png';
import QrGrid from '../images/qr-grid.png';
import './QRCode.scss';

const QRCode = ({ uid }) => {
	return (
		<div className='qrcode-page'>
			<div className='navbar-qrcode'>
				<div className='qrcode-navbar-img-container'>
					<img src={LogoText} alt='logo' to='/' />
				</div>
			</div>
			<div className='qr-container'>
				{/* //!remove ⬇️
				<p>{uid}</p> */}
				<p className='qrcode-text'>
					Scan this code with
					<br />
					parent's phone
				</p>
				<div className='qr-image-container'>
					{uid && <QR value={uid} logoImage={Logo} />}
					<img className='qr-grid' src={QrGrid} alt='qr-grid' />
				</div>
			</div>
		</div>
	);
};
export default QRCode;
