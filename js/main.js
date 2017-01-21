// Author: Artem Sapegin, http://sapegin.me, 2015

function loadPulse() {
	const pulseUrl = '/build/pulse.svg';
	const xhr = new XMLHttpRequest();
	const timestamp = (new Date())
			.toISOString()
			.slice(0, 10)
		;
	xhr.open('GET', pulseUrl + '?' + timestamp);
	xhr.onload = function() {
		if (xhr.status === 200) {
			onPulseLoaded(xhr.responseText);
		}
	};
	xhr.send();
}

function onPulseLoaded(svgText) {
	const container = document.getElementById('pulse');
	const chartElem = container.querySelector('.js-pulse-chart');
	chartElem.innerHTML = svgText;

	const infoElem = container.querySelector('.js-pulse-info');
	const template = container.querySelector('.js-pulse-template').textContent;
	const data = JSON.parse(container.querySelector('desc').textContent);
	infoElem.innerHTML = tmpl(template, data);
}

function tmpl(template, data) {
	return template.replace(/\{([^}]+)}/g, function tmplReplace(m, key) {
		return data[key] || '';
	});
}

loadPulse();
