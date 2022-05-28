import { QRCode as QR } from 'react-qrcode-logo';
import Logo from '../images/trackme-logo.svg';

const QRCode = ({ uid }) => {
	return (
		<div className='qr-container'>
			{/* //!remove ⬇️ */}
			<p>{uid}</p>
			{uid && <QR value={uid} logoImage={Logo} />}
			<p>scan this code with parent's phone</p>
		</div>
	);
};
export default QRCode;
