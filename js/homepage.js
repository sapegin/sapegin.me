// Author: Artem Sapegin, http://sapegin.me, 2015

function loadPulse() {
	let pulseUrl = '/build/pulse.svg';
	let xhr = new XMLHttpRequest();
	xhr.open('GET', pulseUrl + '?' + (new Date()).toISOString().slice(0, 10));
	xhr.onload = function() {
		if (xhr.status === 200) {
			onPulseLoaded(xhr.responseText);
		}
	};
	xhr.send();
}

function onPulseLoaded(svgText) {
	let container = document.getElementById('pulse');
	let chartElem = container.querySelector('.js-pulse-chart');
	chartElem.innerHTML = svgText;

	let infoElem = container.querySelector('.js-pulse-info');
	let template = container.querySelector('.js-pulse-template').textContent;
	let data = JSON.parse(container.querySelector('desc').textContent);
	infoElem.innerHTML = tmpl(template, data);
}

function tmpl(template, data) {
	return template.replace(/\{([^\}]+)\}/g, function tmplReplace(m, key) {
		return data[key] || '';
	});
}

loadPulse();
