
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const ALLUSERSPROFILE: string;
	export const APPDATA: string;
	export const CHROME_CRASHPAD_PIPE_NAME: string;
	export const COLORTERM: string;
	export const CommonProgramFiles: string;
	export const CommonProgramW6432: string;
	export const COMPUTERNAME: string;
	export const ComSpec: string;
	export const DriverData: string;
	export const EFC_10460: string;
	export const FPS_BROWSER_APP_PROFILE_STRING: string;
	export const FPS_BROWSER_USER_PROFILE_STRING: string;
	export const GIT_ASKPASS: string;
	export const HOME: string;
	export const HOMEDRIVE: string;
	export const HOMEPATH: string;
	export const INIT_CWD: string;
	export const LANG: string;
	export const LOCALAPPDATA: string;
	export const LOGONSERVER: string;
	export const NODE: string;
	export const NODE_ENV: string;
	export const NODE_PATH: string;
	export const npm_command: string;
	export const npm_config_engine_strict: string;
	export const npm_config_frozen_lockfile: string;
	export const npm_config_registry: string;
	export const npm_config_user_agent: string;
	export const npm_execpath: string;
	export const npm_lifecycle_event: string;
	export const npm_lifecycle_script: string;
	export const npm_node_execpath: string;
	export const npm_package_dependencies_chart_js: string;
	export const npm_package_dependencies_file_saver: string;
	export const npm_package_dependencies_final_form: string;
	export const npm_package_dependencies_fs_extra: string;
	export const npm_package_dependencies_jspdf: string;
	export const npm_package_dependencies_jspdf_autotable: string;
	export const npm_package_dependencies_path: string;
	export const npm_package_dependencies_primeflex: string;
	export const npm_package_dependencies_primeicons: string;
	export const npm_package_dependencies_prismjs: string;
	export const npm_package_dependencies_prism_svelte: string;
	export const npm_package_dependencies_quill: string;
	export const npm_package_dependencies_xlsx: string;
	export const npm_package_dependencies__jazzsvelte_api: string;
	export const npm_package_dependencies__jazzsvelte_badge: string;
	export const npm_package_dependencies__jazzsvelte_button: string;
	export const npm_package_dependencies__jazzsvelte_button_group: string;
	export const npm_package_dependencies__jazzsvelte_check_icon: string;
	export const npm_package_dependencies__jazzsvelte_dom: string;
	export const npm_package_dependencies__jazzsvelte_exclamationtriangle_icon: string;
	export const npm_package_dependencies__jazzsvelte_icons: string;
	export const npm_package_dependencies__jazzsvelte_infocircle_icon: string;
	export const npm_package_dependencies__jazzsvelte_input_text: string;
	export const npm_package_dependencies__jazzsvelte_object: string;
	export const npm_package_dependencies__jazzsvelte_ripple: string;
	export const npm_package_dependencies__jazzsvelte_speed_dial: string;
	export const npm_package_dependencies__jazzsvelte_spinner_icon: string;
	export const npm_package_dependencies__jazzsvelte_tiered_menu: string;
	export const npm_package_dependencies__jazzsvelte_timescircle_icon: string;
	export const npm_package_dependencies__jazzsvelte_toast: string;
	export const npm_package_dependencies__jazzsvelte_tooltip: string;
	export const npm_package_dependencies__jazzsvelte_utils: string;
	export const npm_package_devDependencies_autoprefixer: string;
	export const npm_package_devDependencies_eslint: string;
	export const npm_package_devDependencies_eslint_config_prettier: string;
	export const npm_package_devDependencies_eslint_plugin_svelte: string;
	export const npm_package_devDependencies_gulp: string;
	export const npm_package_devDependencies_gulp_concat: string;
	export const npm_package_devDependencies_gulp_flatten: string;
	export const npm_package_devDependencies_gulp_rename: string;
	export const npm_package_devDependencies_gulp_uglify: string;
	export const npm_package_devDependencies_gulp_uglifycss: string;
	export const npm_package_devDependencies_postcss: string;
	export const npm_package_devDependencies_prettier: string;
	export const npm_package_devDependencies_prettier_plugin_svelte: string;
	export const npm_package_devDependencies_rollup: string;
	export const npm_package_devDependencies_rollup_plugin_postcss: string;
	export const npm_package_devDependencies_rollup_plugin_terser: string;
	export const npm_package_devDependencies_sass: string;
	export const npm_package_devDependencies_svelte: string;
	export const npm_package_devDependencies_svelte_check: string;
	export const npm_package_devDependencies_tslib: string;
	export const npm_package_devDependencies_typedoc: string;
	export const npm_package_devDependencies_typescript: string;
	export const npm_package_devDependencies_vite: string;
	export const npm_package_devDependencies_vitest: string;
	export const npm_package_devDependencies__fontsource_fira_mono: string;
	export const npm_package_devDependencies__neoconfetti_svelte: string;
	export const npm_package_devDependencies__rollup_plugin_alias: string;
	export const npm_package_devDependencies__rollup_plugin_babel: string;
	export const npm_package_devDependencies__rollup_plugin_commonjs: string;
	export const npm_package_devDependencies__rollup_plugin_node_resolve: string;
	export const npm_package_devDependencies__rollup_plugin_replace: string;
	export const npm_package_devDependencies__stackblitz_sdk: string;
	export const npm_package_devDependencies__sveltejs_adapter_auto: string;
	export const npm_package_devDependencies__sveltejs_kit: string;
	export const npm_package_devDependencies__sveltejs_vite_plugin_svelte: string;
	export const npm_package_devDependencies__typescript_eslint_eslint_plugin: string;
	export const npm_package_devDependencies__typescript_eslint_parser: string;
	export const npm_package_devDependencies__types_eslint: string;
	export const npm_package_devDependencies__types_node: string;
	export const npm_package_engines_node: string;
	export const npm_package_name: string;
	export const npm_package_private: string;
	export const npm_package_scripts_build: string;
	export const npm_package_scripts_check: string;
	export const npm_package_scripts_check_watch: string;
	export const npm_package_scripts_dev: string;
	export const npm_package_scripts_dev_force: string;
	export const npm_package_scripts_format: string;
	export const npm_package_scripts_format_check: string;
	export const npm_package_scripts_lint: string;
	export const npm_package_scripts_preview: string;
	export const npm_package_scripts_test: string;
	export const npm_package_type: string;
	export const npm_package_version: string;
	export const NUMBER_OF_PROCESSORS: string;
	export const NVM_HOME: string;
	export const NVM_SYMLINK: string;
	export const OneDrive: string;
	export const OneDriveConsumer: string;
	export const ORIGINAL_XDG_CURRENT_DESKTOP: string;
	export const OS: string;
	export const Path: string;
	export const PATHEXT: string;
	export const PNPM_HOME: string;
	export const PNPM_SCRIPT_SRC_DIR: string;
	export const PROCESSOR_ARCHITECTURE: string;
	export const PROCESSOR_IDENTIFIER: string;
	export const PROCESSOR_LEVEL: string;
	export const PROCESSOR_REVISION: string;
	export const ProgramData: string;
	export const ProgramFiles: string;
	export const ProgramW6432: string;
	export const PROMPT: string;
	export const PSModulePath: string;
	export const PUBLIC: string;
	export const SESSIONNAME: string;
	export const SystemDrive: string;
	export const SystemRoot: string;
	export const TEMP: string;
	export const TERM_PROGRAM: string;
	export const TERM_PROGRAM_VERSION: string;
	export const TMP: string;
	export const USERDOMAIN: string;
	export const USERDOMAIN_ROAMINGPROFILE: string;
	export const USERNAME: string;
	export const USERPROFILE: string;
	export const VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
	export const VSCODE_GIT_ASKPASS_MAIN: string;
	export const VSCODE_GIT_ASKPASS_NODE: string;
	export const VSCODE_GIT_IPC_HANDLE: string;
	export const VSCODE_INJECTION: string;
	export const VSCODE_NONCE: string;
	export const windir: string;
}

/**
 * Similar to [`$env/static/private`](https://kit.svelte.dev/docs/modules#$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://kit.svelte.dev/docs/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		ALLUSERSPROFILE: string;
		APPDATA: string;
		CHROME_CRASHPAD_PIPE_NAME: string;
		COLORTERM: string;
		CommonProgramFiles: string;
		CommonProgramW6432: string;
		COMPUTERNAME: string;
		ComSpec: string;
		DriverData: string;
		EFC_10460: string;
		FPS_BROWSER_APP_PROFILE_STRING: string;
		FPS_BROWSER_USER_PROFILE_STRING: string;
		GIT_ASKPASS: string;
		HOME: string;
		HOMEDRIVE: string;
		HOMEPATH: string;
		INIT_CWD: string;
		LANG: string;
		LOCALAPPDATA: string;
		LOGONSERVER: string;
		NODE: string;
		NODE_ENV: string;
		NODE_PATH: string;
		npm_command: string;
		npm_config_engine_strict: string;
		npm_config_frozen_lockfile: string;
		npm_config_registry: string;
		npm_config_user_agent: string;
		npm_execpath: string;
		npm_lifecycle_event: string;
		npm_lifecycle_script: string;
		npm_node_execpath: string;
		npm_package_dependencies_chart_js: string;
		npm_package_dependencies_file_saver: string;
		npm_package_dependencies_final_form: string;
		npm_package_dependencies_fs_extra: string;
		npm_package_dependencies_jspdf: string;
		npm_package_dependencies_jspdf_autotable: string;
		npm_package_dependencies_path: string;
		npm_package_dependencies_primeflex: string;
		npm_package_dependencies_primeicons: string;
		npm_package_dependencies_prismjs: string;
		npm_package_dependencies_prism_svelte: string;
		npm_package_dependencies_quill: string;
		npm_package_dependencies_xlsx: string;
		npm_package_dependencies__jazzsvelte_api: string;
		npm_package_dependencies__jazzsvelte_badge: string;
		npm_package_dependencies__jazzsvelte_button: string;
		npm_package_dependencies__jazzsvelte_button_group: string;
		npm_package_dependencies__jazzsvelte_check_icon: string;
		npm_package_dependencies__jazzsvelte_dom: string;
		npm_package_dependencies__jazzsvelte_exclamationtriangle_icon: string;
		npm_package_dependencies__jazzsvelte_icons: string;
		npm_package_dependencies__jazzsvelte_infocircle_icon: string;
		npm_package_dependencies__jazzsvelte_input_text: string;
		npm_package_dependencies__jazzsvelte_object: string;
		npm_package_dependencies__jazzsvelte_ripple: string;
		npm_package_dependencies__jazzsvelte_speed_dial: string;
		npm_package_dependencies__jazzsvelte_spinner_icon: string;
		npm_package_dependencies__jazzsvelte_tiered_menu: string;
		npm_package_dependencies__jazzsvelte_timescircle_icon: string;
		npm_package_dependencies__jazzsvelte_toast: string;
		npm_package_dependencies__jazzsvelte_tooltip: string;
		npm_package_dependencies__jazzsvelte_utils: string;
		npm_package_devDependencies_autoprefixer: string;
		npm_package_devDependencies_eslint: string;
		npm_package_devDependencies_eslint_config_prettier: string;
		npm_package_devDependencies_eslint_plugin_svelte: string;
		npm_package_devDependencies_gulp: string;
		npm_package_devDependencies_gulp_concat: string;
		npm_package_devDependencies_gulp_flatten: string;
		npm_package_devDependencies_gulp_rename: string;
		npm_package_devDependencies_gulp_uglify: string;
		npm_package_devDependencies_gulp_uglifycss: string;
		npm_package_devDependencies_postcss: string;
		npm_package_devDependencies_prettier: string;
		npm_package_devDependencies_prettier_plugin_svelte: string;
		npm_package_devDependencies_rollup: string;
		npm_package_devDependencies_rollup_plugin_postcss: string;
		npm_package_devDependencies_rollup_plugin_terser: string;
		npm_package_devDependencies_sass: string;
		npm_package_devDependencies_svelte: string;
		npm_package_devDependencies_svelte_check: string;
		npm_package_devDependencies_tslib: string;
		npm_package_devDependencies_typedoc: string;
		npm_package_devDependencies_typescript: string;
		npm_package_devDependencies_vite: string;
		npm_package_devDependencies_vitest: string;
		npm_package_devDependencies__fontsource_fira_mono: string;
		npm_package_devDependencies__neoconfetti_svelte: string;
		npm_package_devDependencies__rollup_plugin_alias: string;
		npm_package_devDependencies__rollup_plugin_babel: string;
		npm_package_devDependencies__rollup_plugin_commonjs: string;
		npm_package_devDependencies__rollup_plugin_node_resolve: string;
		npm_package_devDependencies__rollup_plugin_replace: string;
		npm_package_devDependencies__stackblitz_sdk: string;
		npm_package_devDependencies__sveltejs_adapter_auto: string;
		npm_package_devDependencies__sveltejs_kit: string;
		npm_package_devDependencies__sveltejs_vite_plugin_svelte: string;
		npm_package_devDependencies__typescript_eslint_eslint_plugin: string;
		npm_package_devDependencies__typescript_eslint_parser: string;
		npm_package_devDependencies__types_eslint: string;
		npm_package_devDependencies__types_node: string;
		npm_package_engines_node: string;
		npm_package_name: string;
		npm_package_private: string;
		npm_package_scripts_build: string;
		npm_package_scripts_check: string;
		npm_package_scripts_check_watch: string;
		npm_package_scripts_dev: string;
		npm_package_scripts_dev_force: string;
		npm_package_scripts_format: string;
		npm_package_scripts_format_check: string;
		npm_package_scripts_lint: string;
		npm_package_scripts_preview: string;
		npm_package_scripts_test: string;
		npm_package_type: string;
		npm_package_version: string;
		NUMBER_OF_PROCESSORS: string;
		NVM_HOME: string;
		NVM_SYMLINK: string;
		OneDrive: string;
		OneDriveConsumer: string;
		ORIGINAL_XDG_CURRENT_DESKTOP: string;
		OS: string;
		Path: string;
		PATHEXT: string;
		PNPM_HOME: string;
		PNPM_SCRIPT_SRC_DIR: string;
		PROCESSOR_ARCHITECTURE: string;
		PROCESSOR_IDENTIFIER: string;
		PROCESSOR_LEVEL: string;
		PROCESSOR_REVISION: string;
		ProgramData: string;
		ProgramFiles: string;
		ProgramW6432: string;
		PROMPT: string;
		PSModulePath: string;
		PUBLIC: string;
		SESSIONNAME: string;
		SystemDrive: string;
		SystemRoot: string;
		TEMP: string;
		TERM_PROGRAM: string;
		TERM_PROGRAM_VERSION: string;
		TMP: string;
		USERDOMAIN: string;
		USERDOMAIN_ROAMINGPROFILE: string;
		USERNAME: string;
		USERPROFILE: string;
		VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
		VSCODE_GIT_ASKPASS_MAIN: string;
		VSCODE_GIT_ASKPASS_NODE: string;
		VSCODE_GIT_IPC_HANDLE: string;
		VSCODE_INJECTION: string;
		VSCODE_NONCE: string;
		windir: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
