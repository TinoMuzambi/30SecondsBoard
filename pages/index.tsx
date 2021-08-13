const Home = () => {
	function fillArray(value, len) {
		if (len == 0) return [];
		var a = [value];
		while (a.length * 2 <= len) a = a.concat(a);
		if (a.length < len) a = a.concat(a.slice(0, len - a.length));
		return a;
	}

	const images = fillArray({ image: "https://unsplash.it/100" }, 63);
	return (
		<main className="main">
			<h1 className="title">30 Seconds Game</h1>
			<section className="board">
				{images.map((el, key) => (
					<div key={key}>
						<img src={el.image} alt="Random" />
					</div>
				))}
			</section>
		</main>
	);
};

export default Home;
// 33
