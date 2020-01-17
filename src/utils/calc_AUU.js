function rash(q, t1, t2) {
	var r = +(q * 1000 / (t1 - t2)).toFixed(3);
	return r;
}

function ro(t, p) {
	let ror = (Math.pow(t * 0.01, 5) * (-0.033875 * p + 12.742) +
		Math.pow(t * 0.01, 4) * (0.096667 * p - 44.488) +
		Math.pow(t * 0.01, 3) * (-0.11255 * p + 68.806) +
		Math.pow(t * 0.01, 2) * (0.083292 * p - 84.927) +
		t * 0.01 * (-0.037762 * p + 6.4159) +
		0.049917 * p +
		999.792).toFixed();
	return ror;
}
function pr2(isx) {
	let { qco, t1, t2, t11, t21, p1, p2 } = isx;
	p1 = p1 / 10;
	p2 = p2 / 10;
	let G1 = (rash(qco, t1, t2) * 1000 / ro(t1, p1)).toFixed(3);
	let G2 = (rash(qco, t11, t21) * 1000 / ro(t11, p1)).toFixed(3);
	let G3 = (G2 - G1).toFixed(3);
	let r = {
		G1,
		G2,
		G3
	};
	return r;
}

function calc(isx) {
	var result = pr2(isx);
	return result;
}

export default calc;
