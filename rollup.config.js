import alias from '@rollup/plugin-alias';
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

import fs from 'fs-extra';
import path from 'path';

import pkg from './package.json';

let entries = [];

let core = {};

const NPM_LINK = process.env.NPM_LINK === 'true';

// alias entries
const ALIAS_ICON_COMPONENT_ENTRIES = [
    { find: '../../iconbase/IconBase', replacement: 'jazzsvelte/iconbase' },
    { find: '../icons/angledoubledown', replacement: 'jazzsvelte/icons/angledoubledown' },
    { find: '../icons/angledoubleleft', replacement: 'jazzsvelte/icons/angledoubleleft' },
    { find: '../icons/angledoubleright', replacement: 'jazzsvelte/icons/angledoubleright' },
    { find: '../icons/angledoubleup', replacement: 'jazzsvelte/icons/angledoubleup' },
    { find: '../icons/angledown', replacement: 'jazzsvelte/icons/angledown' },
    { find: '../icons/angleleft', replacement: 'jazzsvelte/icons/angleleft' },
    { find: '../icons/angleright', replacement: 'jazzsvelte/icons/angleright' },
    { find: '../icons/angleup', replacement: 'jazzsvelte/icons/angleup' },
    { find: '../icons/arrowdown', replacement: 'jazzsvelte/icons/arrowdown' },
    { find: '../icons/arrowup', replacement: 'jazzsvelte/icons/arrowup' },
    { find: '../icons/ban', replacement: 'jazzsvelte/icons/ban' },
    { find: '../icons/bars', replacement: 'jazzsvelte/icons/bars' },
    { find: '../icons/calendar', replacement: 'jazzsvelte/icons/calendar' },
    { find: '../icons/check', replacement: 'jazzsvelte/icons/check' },
    { find: '../icons/chevrondown', replacement: 'jazzsvelte/icons/chevrondown' },
    { find: '../icons/chevronleft', replacement: 'jazzsvelte/icons/chevronleft' },
    { find: '../icons/chevronright', replacement: 'jazzsvelte/icons/chevronright' },
    { find: '../icons/chevronup', replacement: 'jazzsvelte/icons/chevronup' },
    { find: '../icons/exclamationtriangle', replacement: 'jazzsvelte/icons/exclamationtriangle' },
    { find: '../icons/eye', replacement: 'jazzsvelte/icons/eye' },
    { find: '../icons/eyeslash', replacement: 'jazzsvelte/icons/eyeslash' },
    { find: '../icons/filter', replacement: 'jazzsvelte/icons/filter' },
    { find: '../icons/filterslash', replacement: 'jazzsvelte/icons/filterslash' },
    { find: '../icons/infocircle', replacement: 'jazzsvelte/icons/infocircle' },
    { find: '../icons/minus', replacement: 'jazzsvelte/icons/minus' },
    { find: '../icons/pencil', replacement: 'jazzsvelte/icons/pencil' },
    { find: '../icons/plus', replacement: 'jazzsvelte/icons/plus' },
    { find: '../icons/refresh', replacement: 'jazzsvelte/icons/refresh' },
    { find: '../icons/search', replacement: 'jazzsvelte/icons/search' },
    { find: '../icons/searchminus', replacement: 'jazzsvelte/icons/searchminus' },
    { find: '../icons/searchplus', replacement: 'jazzsvelte/icons/searchplus' },
    { find: '../icons/sortalt', replacement: 'jazzsvelte/icons/sortalt' },
    { find: '../icons/sortamountdown', replacement: 'jazzsvelte/icons/sortamountdown' },
    { find: '../icons/sortamountupalt', replacement: 'jazzsvelte/icons/sortamountupalt' },
    { find: '../icons/spinner', replacement: 'jazzsvelte/icons/spinner' },
    { find: '../icons/star', replacement: 'jazzsvelte/icons/star' },
    { find: '../icons/starfill', replacement: 'jazzsvelte/icons/starfill' },
    { find: '../icons/thlarge', replacement: 'jazzsvelte/icons/thlarge' },
    { find: '../icons/times', replacement: 'jazzsvelte/icons/times' },
    { find: '../icons/timescircle', replacement: 'jazzsvelte/icons/timescircle' },
    { find: '../icons/trash', replacement: 'jazzsvelte/icons/trash' },
    { find: '../icons/undo', replacement: 'jazzsvelte/icons/undo' },
    { find: '../icons/upload', replacement: 'jazzsvelte/icons/upload' },
    { find: '../icons/windowmaximize', replacement: 'jazzsvelte/icons/windowmaximize' },
    { find: '../icons/windowminimize', replacement: 'jazzsvelte/icons/windowminimize' }
];

const CORE_PASSTHROUGH_DEPENDENCIES = [
    { find: '../passthrough', replacement: 'jazzsvelte/passthrough' },
    { find: '../passthrough/tailwind', replacement: 'jazzsvelte/passthrough/tailwind' }
];

const ALIAS_COMPONENT_ENTRIES = [
    { find: '../utils/Utils', replacement: 'jazzsvelte/utils' },
    { find: '../api/Api', replacement: 'jazzsvelte/api' },
    { find: '../componentbase/ComponentBase', replacement: 'jazzsvelte/componentbase' },
    { find: '../hooks/Hooks', replacement: 'jazzsvelte/hooks' },
    { find: '../ripple/Ripple', replacement: 'jazzsvelte/ripple' },
    { find: '../csstransition/CSSTransition', replacement: 'jazzsvelte/csstransition' },
    { find: '../portal/Portal', replacement: 'jazzsvelte/portal' },
    { find: '../keyfilter/KeyFilter', replacement: 'jazzsvelte/keyfilter' },
    ...ALIAS_ICON_COMPONENT_ENTRIES,
    { find: '../tooltip/Tooltip', replacement: 'jazzsvelte/tooltip' },
    { find: '../virtualscroller/VirtualScroller', replacement: 'jazzsvelte/virtualscroller' },
    { find: '../terminalservice/TerminalService', replacement: 'jazzsvelte/terminalservice' },
    { find: '../overlayservice/OverlayService', replacement: 'jazzsvelte/overlayservice' },
    { find: '../checkox/Checkbox', replacement: 'jazzsvelte/checkbox' },
    { find: '../button/Button', replacement: 'jazzsvelte/button' },
    { find: '../inputtext/InputText', replacement: 'jazzsvelte/inputtext' },
    { find: '../inputnumber/InputNumber', replacement: 'jazzsvelte/inputnumber' },
    { find: '../messages/Messages', replacement: 'jazzsvelte/messages' },
    { find: '../progressbar/ProgressBar', replacement: 'jazzsvelte/progressbar' },
    { find: '../dropdown/Dropdown', replacement: 'jazzsvelte/dropdown' },
    { find: '../dialog/Dialog', replacement: 'jazzsvelte/dialog' },
    { find: '../paginator/Paginator', replacement: 'jazzsvelte/paginator' },
    { find: '../tree/Tree', replacement: 'jazzsvelte/tree' },
    ...CORE_PASSTHROUGH_DEPENDENCIES
];

// dependencies
const GLOBAL_DEPENDENCIES = {
    svelte: 'Svelte',
    //'react-dom': 'ReactDOM',
    //'react-transition-group': 'ReactTransitionGroup'
};

const GLOBAL_COMPONENT_DEPENDENCIES = {
    ...GLOBAL_DEPENDENCIES,
    ...(NPM_LINK ? [] : ALIAS_COMPONENT_ENTRIES.reduce((acc, cur) => ({ ...acc, [cur.replacement]: cur.replacement.replaceAll('/', '.') }), {}))
};

// externals
const EXTERNAL = ['svelte', /*'react-dom', 'react-transition-group',*/ '@babel/runtime', '@fullcalendar/core', 'chart.js/auto', 'quill'];

const EXTERNAL_COMPONENT = [...EXTERNAL, ...(NPM_LINK ? [] : ALIAS_COMPONENT_ENTRIES.map((entries) => entries.replacement))];

// plugins
const BABEL_PLUGIN_OPTIONS = {
    exclude: 'node_modules/**',
    presets: ['@babel/preset-env', '@babel/preset-svelte'],
    plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties'],
    skipPreflightCheck: true,
    babelHelpers: 'runtime',
    babelrc: false
};

const ALIAS_PLUGIN_OPTIONS_FOR_COMPONENT = {
    entries: ALIAS_COMPONENT_ENTRIES
};

const REPLACE_PLUGIN_OPTIONS = {
    'process.env.NODE_ENV': JSON.stringify('production'),
    preventAssignment: true
};

const RESOLVE_PLUGIN_OPTIONS = {
    extensions: ['.js']
};

const COMMONJS_PLUGIN_OPTIONS = {
    exclude: process.env.INPUT_DIR + '**',
    sourceMap: false
};

const POSTCSS_PLUGIN_OPTIONS = {
    sourceMap: false
};

const TERSER_PLUGIN_OPTIONS = {
    compress: {
        keep_infinity: true,
        pure_getters: true,
        reduce_funcs: false
    }
};

const PLUGINS = [replace(REPLACE_PLUGIN_OPTIONS), resolve(RESOLVE_PLUGIN_OPTIONS), commonjs(COMMONJS_PLUGIN_OPTIONS), babel(BABEL_PLUGIN_OPTIONS), postcss(POSTCSS_PLUGIN_OPTIONS)];

const PLUGINS_COMPONENT = NPM_LINK ? PLUGINS : [alias(ALIAS_PLUGIN_OPTIONS_FOR_COMPONENT), ...PLUGINS];

function addEntry(name, input, output, isComponent = true) {
    const exports = name === 'jazzsvelte.api' || name === 'jazzsvelte' ? 'named' : 'auto';
    const useCorePlugin = !NPM_LINK && ALIAS_COMPONENT_ENTRIES.some((entry) => entry.replacement === name.replaceAll('.', '/'));
    const plugins = isComponent ? PLUGINS_COMPONENT : PLUGINS;
    const external = isComponent ? EXTERNAL_COMPONENT : EXTERNAL;
    const inlineDynamicImports = true;

    const onwarn = (warning) => {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
            return;
        }
    };

    const getEntry = (isMinify) => {
        return {
            onwarn,
            input,
            plugins: [...plugins, isMinify && terser(TERSER_PLUGIN_OPTIONS), useCorePlugin && corePlugin()],
            external,
            inlineDynamicImports
        };
    };

    const get_CJS_ESM = (isMinify) => {
        return {
            ...getEntry(isMinify),
            output: [
                ...(NPM_LINK
                    ? []
                    : [
                          {
                              format: 'cjs',
                              file: `${output}.cjs${isMinify ? '.min' : ''}.js`,
                              exports,
                              banner: "'use client';" // This line is required for SSR.
                          }
                      ]),
                {
                    format: 'esm',
                    file: `${output}.esm${isMinify ? '.min' : ''}.js`,
                    exports,
                    banner: "'use client';" // This line is required for SSR.
                }
            ]
        };
    };

    const get_IIFE = (isMinify) => {
        return {
            ...getEntry(isMinify),
            output: [
                {
                    format: 'iife',
                    name,
                    file: `${output}${isMinify ? '.min' : ''}.js`,
                    globals: isComponent ? GLOBAL_COMPONENT_DEPENDENCIES : GLOBAL_DEPENDENCIES,
                    exports
                }
            ]
        };
    };

    entries.push(get_CJS_ESM());

    if (!NPM_LINK) {
        entries.push(get_IIFE());

        // Minify
        entries.push(get_CJS_ESM(true));
        entries.push(get_IIFE(true));
    }
}

function corePlugin() {
    return {
        name: 'corePlugin',
        generateBundle(outputOptions, bundle) {
            const { name, format } = outputOptions;

            if (format === 'iife') {
                Object.keys(bundle).forEach((id) => {
                    const chunk = bundle[id];
                    const folderName = name.replace('jazzsvelte.', '').replaceAll('.', '/');
                    const filePath = `./dist/core/core${id.indexOf('.min.js') > 0 ? '.min.js' : '.js'}`;

                    core[filePath] ? (core[filePath][folderName] = chunk.code) : (core[filePath] = { [`${folderName}`]: chunk.code });
                });
            }
        }
    };
}

function addCore() {
    const lastEntry = entries[entries.length - 1];

    lastEntry.plugins = [
        ...lastEntry.plugins,
        {
            name: 'coreMergePlugin',
            generateBundle() {
                Object.entries(core).forEach(([filePath, value]) => {
                    const code = ALIAS_COMPONENT_ENTRIES.reduce((val, entry) => {
                        const name = entry.replacement.replace('jazzsvelte/', '');

                        val += value[name] + '\n';

                        return val;
                    }, '');

                    fs.outputFile(path.resolve(__dirname, filePath), code, {}, function (err) {
                        if (err) {
                            // eslint-disable-next-line no-console
                            return console.error(err);
                        }
                    });
                });
            }
        }
    ];
}

function addComponent() {
    fs.readdirSync(path.resolve(__dirname, process.env.INPUT_DIR), { withFileTypes: true })
        .filter((dir) => dir.isDirectory())
        .forEach(({ name: folderName }) => {
            fs.readdirSync(path.resolve(__dirname, process.env.INPUT_DIR + folderName)).forEach((file) => {
                const name = file.split(/(.js)$/)[0].toLowerCase();

                if (name === folderName) {
                    const input = process.env.INPUT_DIR + folderName + '/' + file;
                    const output = process.env.OUTPUT_DIR + folderName + '/' + name;

                    addEntry('jazzsvelte.' + folderName, input, output, true);
                }
            });
        });
}

function addIcon() {
    const iconDir = path.resolve(__dirname, process.env.INPUT_DIR + 'icons');

    fs.readdirSync(path.resolve(__dirname, iconDir), { withFileTypes: true })
        .filter((dir) => dir.isDirectory())
        .forEach(({ name: folderName }) => {
            fs.readdirSync(path.resolve(__dirname, iconDir + '/' + folderName)).forEach((file) => {
                if (/\.js$/.test(file)) {
                    const name = file.split(/(.js)$/)[0].toLowerCase();
                    const input = process.env.INPUT_DIR + 'icons/' + folderName + '/' + file;
                    const output = process.env.OUTPUT_DIR + 'icons/' + folderName + '/' + name;

                    addEntry('jazzsvelte.icons.' + folderName, input, output, true);
                }
            });
        });
}

function addPassThrough() {
    const inputDir = process.env.INPUT_DIR + 'passthrough';
    const outputDir = process.env.OUTPUT_DIR + 'passthrough';

    addEntry('passthrough', `${inputDir}/index.js`, `${outputDir}/index`, false);
    addEntry('passthrough.tailwind', `${inputDir}/tailwind/index.js`, `${outputDir}/tailwind/index`, false);
}

function addJazzsvelte() {
    const input = process.env.INPUT_DIR + 'jazzsvelte.all.js';
    const output = process.env.OUTPUT_DIR + 'jazzsvelte.all';

    addEntry('jazzsvelte', input, output, false);
}

function addPackageJson() {
    const outputDir = path.resolve(__dirname, process.env.OUTPUT_DIR);
    const packageJson = `{
    "name": "jazzsvelte",
    "version": "${pkg.version}",
    "private": false,
    "author": "PrimeTek Informatics",
    "description": "Jazzsvelte is an open source UI library for React featuring a rich set of 90+ components, a theme designer, various theme alternatives such as Material, Bootstrap, Tailwind, premium templates and professional support. In addition, it integrates with PrimeBlock, which has 370+ ready to use UI blocks to build spectacular applications in no time.",
    "homepage": "https://www.jazzsvelte.org",
    "repository": {
        "type": "git",
        "url": "https://github.com/primefaces/jazzsvelte.git"
    },
    "license": "MIT",
    "bugs": {
        "url": "https://github.com/primefaces/jazzsvelte/issues"
    },
    "keywords": [
        "jazzsvelte",
        "svelte",
        "hooks",
        "ui-kit",
        "ui library",
        "component library",
        "material",
        "material design",
        "bootstrap",
        "tailwind theme",
        "dark theme"
    ],
    "unpkg": "jazzsvelte.all.min.js",
    "jsdelivr": "jazzsvelte.all.min.js",
    "main": "jazzsvelte.all.min.js",
    "module": "jazzsvelte.all.esm.min.js",
    "web-types": "web-types.json",
    "peerDependencies": {
        "svelte": "^4.0.0"
    },
    "sideEffects": [
        "**/*.css"
    ],
    "engines": {
        "node": ">=14.0.0"
    }
}`;

    !fs.existsSync(outputDir) && fs.mkdirSync(outputDir);
    fs.writeFileSync(path.resolve(outputDir, 'package.json'), packageJson);
}

addIcon();
addComponent();
addJazzsvelte();
addPassThrough();
addCore();
addPackageJson();

export default entries;
