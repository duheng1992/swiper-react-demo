import { useRef, useState, useEffect, useMemo, useCallback } from 'react';

import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';
import styles from './App.module.css';

const SwiperItems = [
	{
		backgroundColor: '#3860f4',
		// backgroundImage: `url(${ImageUrl}/web/images/lunbo1.png)`,
		content: (
			<div className={styles['banner-show']}>
				<h1>轮播图1</h1>
				<p className={styles['banner-desc']}>XXXXXXXXXXXXXXXXXXXXXXX</p>
				<span>
					<a className={styles['banner-free-use']}>查看详情</a>
				</span>
			</div>
		),
	},
	{
		backgroundColor: '#4f42d2',
		// backgroundImage: `url(${ImageUrl}/web/images/lunbo2.png)`,
		content: (
			<div className={styles['banner-show']}>
				<h1>轮播图2</h1>
				<p className={styles['banner-desc']}>YYYYYYYYYYYYYYYYYYYYYYYYYY</p>
				<span>
					<a className={styles['banner-free-use']}>查看详情</a>
				</span>
			</div>
		),
	},
	{
		backgroundColor: '#0f0a3e',
		// backgroundImage: `url(${ImageUrl}/web/images/lunbo3.png)`,
		content: (
			<div className={styles['banner-show']}>
				<h1>轮播图3</h1>
				<p className={styles['banner-desc']}>ZZZZZZZZZZZZZZZZZZZZZZ</p>
				<span>
					<a className={styles['banner-free-use']}>查看详情</a>
				</span>
			</div>
		),
	},
];

const App = () => {
	const swiperRef = useRef(null);
	const [bulletActiveClass, setBulletActiveClass] = useState('current');
	const [current, setCurrent] = useState(0);

	const onSlideChange = item => {
		const index = item.realIndex || 0;
		// 动态设置背景色
		document.body.style.setProperty(
			'--bannerBackgroundColor',
			SwiperItems[index]['backgroundColor']
		);

		// 设置轮播图导航动画样式
		setCurrent(index);
	};

	const onVisibilitychange = () => {
		// 页面 不在可视区域，自动关闭轮播动画
		setBulletActiveClass(!document.hidden ? 'current' : ' ');
	};

	useEffect(() => {
		document.addEventListener('visibilitychange', onVisibilitychange);

		// 页面初始加载背景色不加动画
		setTimeout(
			() =>
				document.body.style.setProperty(
					'--bannerBackgroundTransition',
					'background 4s'
				),
			1
		);

		return () => {
			document.removeEventListener('visibilitychange', onVisibilitychange);
		};
	}, []);

	const Pagination = useCallback(
		() => (
			<div className="custom-swiper-container">
				{SwiperItems.map((_item, index) => {
					return (
						<span
							key={index}
							className={
								'custom-swiper ' + (current === index ? bulletActiveClass : ' ')
							}
						></span>
					);
				})}
			</div>
		),
		[bulletActiveClass, current]
	);

	return (
		<div className={styles['swiper-container']} ref={swiperRef}>
			<Pagination />
			<Swiper
				updateOnWindowResize={true}
				speed={2000}
				slidesPerView="auto"
				loop={true}
				loopedSlides={SwiperItems.length}
				centeredSlides
				preventClicks
				preventClicksPropagation
				spaceBetween={50}
				onSlideChange={onSlideChange}
				autoplay={{
					disableOnInteraction: false,
					delay: 10000,
				}}
				navigation
				pagination={false}
				rewind
				modules={[Autoplay, Navigation, Pagination]}
				effect="slide"
			>
				{SwiperItems.map((item, index) => {
					return (
						<SwiperSlide key={index}>
							{({ isActive }) => {
								return (
									<div
										className={`${styles['banner-item']} ${
											isActive ? 'active' : ''
										}`}
										style={{
											width: '1200px',
											margin: '0 auto',
											backgroundSize: '500px 486px',
										}}
									>
										{item.content}
									</div>
								);
							}}
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	);
};

export default App;
