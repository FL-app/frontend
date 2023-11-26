import { useNavigate } from 'react-router-dom';
import { Button } from '../../components';
import mainImg from '../../images/coming-soon-main-img.png';
import logo from '../../images/Logo.png';
import './ComingSoon.scss';

export const ComingSoon = () => {
	const navigate = useNavigate();

	const handleBackBtnClick = () => {
		navigate(-1);
	};

	return (
		<section className="coming-soon">
			<div className="coming-soon_container">
				<div className="coming-soon_diamond" />
				<img src={logo} alt="logo" className="coming-soon_logo" />
				<div className="coming-soon_img-container">
					<img
						src={mainImg}
						alt="comming soon main"
						className="coming-soon_main-img"
					/>
					<div className="coming-soon_text-container">
						<h1 className="coming-soon_title">Скоро!</h1>
						<h2 className="coming-soon_subtitle">В новом релизе</h2>
					</div>
				</div>
				<Button
					label="Назад"
					type="button"
					size="large"
					color="primary"
					className="coming-soon_back-btn"
					onClick={handleBackBtnClick}
				/>
			</div>
		</section>
	);
};
