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
	() => import('./nodes/24'),
	() => import('./nodes/25')
];

export const server_loads = [];

export const dictionary = {
		"/": [2],
		"/avatar": [3],
		"/badge": [4],
		"/buttongroup": [6],
		"/button": [5],
		"/chip": [7],
		"/configuration": [8],
		"/inputtext": [9],
		"/installation": [10],
		"/panel": [11],
		"/playground": [12],
		"/progressbar": [13],
		"/progressspinner": [14],
		"/ripple": [15],
		"/scrolltop": [16],
		"/skeleton": [17],
		"/speeddial": [18],
		"/splitbutton": [19],
		"/tag": [20],
		"/theming": [21],
		"/tieredmenu": [22],
		"/toast": [23],
		"/tooltip": [24],
		"/virtualscroller": [25]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),

	reroute: (() => {})
};

export { default as root } from '../root.js';