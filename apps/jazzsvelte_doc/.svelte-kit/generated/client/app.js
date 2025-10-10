export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19'),
	() => import('./nodes/20'),
	() => import('./nodes/21'),
	() => import('./nodes/22'),
	() => import('./nodes/23'),
	() => import('./nodes/24')
];

export const server_loads = [];

export const dictionary = {
		"/": [2],
		"/avatar": [3],
		"/badge": [4],
		"/buttongroup": [6],
		"/button": [5],
		"/configuration": [7],
		"/inputtext": [8],
		"/installation": [9],
		"/panel": [10],
		"/playground": [11],
		"/progressbar": [12],
		"/progressspinner": [13],
		"/ripple": [14],
		"/scrolltop": [15],
		"/skeleton": [16],
		"/speeddial": [17],
		"/splitbutton": [18],
		"/tag": [19],
		"/theming": [20],
		"/tieredmenu": [21],
		"/toast": [22],
		"/tooltip": [23],
		"/virtualscroller": [24]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),

	reroute: (() => {})
};

export { default as root } from '../root.js';