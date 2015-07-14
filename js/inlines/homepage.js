// Author: Artem Sapegin, http://sapegin.me, 2015

function showMoreProjects(event, linkElem) {
	event.preventDefault();
	var hiddenClass = 'is-hidden';
	linkElem.classList.add(hiddenClass);
	var projectsElem = document.querySelector(linkElem.getAttribute('href'));
	projectsElem.classList.remove(hiddenClass);
}

function loadPulse() {
	var pulseUrl = '/build/pulse.svg';
	var xhr = new XMLHttpRequest();
	xhr.open('GET', pulseUrl + '?' + (new Date()).toISOString().slice(0, 10));
	xhr.onload = function() {
		if (xhr.status === 200) {
			onPulseLoaded(xhr.responseText);
		}
	};
	xhr.send();
}

function onPulseLoaded(svgText) {
	var container = document.getElementById('pulse');
	var chartElem = container.querySelector('.js-pulse-chart');
	chartElem.innerHTML = svgText;
	
	var infoElem = container.querySelector('.js-pulse-info');
	var template = container.querySelector('.js-pulse-template').textContent;
	var data = JSON.parse(container.querySelector('desc').textContent);
	infoElem.innerHTML = tmpl(template, data);
}

function tmpl(template, data) {
	return template.replace(/\{([^\}]+)\}/g, function tmplReplace(m, key) {
		return data[key] || '';
	});
}

loadPulse();
