# Overview 

Create from scratch

crear el repositorio
$:> npx create-nx-workspace@latest coding-challenges-repo

 NX   Let's create a new workspace [https://nx.dev/getting-started/intro]

✔ Which stack do you want to use? · none
✔ Would you like to use Prettier for code formatting? · Yes
✔ Which AI agents would you like to set up? (space to select, enter to confirm) · No items were selected
✔ Which CI provider would you like to use? · skip
✔ Would you like remote caching to make your build faster? · skip

crear app con node + express
$:> npm i @nx/node -D
$:> npx nx generate @nx/node:app apps/challenge-backend --framework=express

 NX  Generating @nx/node:application

✔ Which linter would you like to use? · eslint
✔ Which unit test runner would you like to use? · jest
✔ Which end-to-end test runner would you like to use? · jest
UPDATE package.json
CREATE apps/challenge-backend/src/assets/.gitkeep
CREATE apps/challenge-backend/src/main.ts
CREATE apps/challenge-backend/tsconfig.app.json
CREATE apps/challenge-backend/tsconfig.json
CREATE .vscode/launch.json
UPDATE nx.json
CREATE apps/challenge-backend/package.json
UPDATE .vscode/extensions.json
CREATE eslint.config.mjs
CREATE apps/challenge-backend/eslint.config.mjs
CREATE jest.preset.js
CREATE jest.config.ts
CREATE apps/challenge-backend/.spec.swcrc
CREATE apps/challenge-backend/tsconfig.spec.json
CREATE apps/challenge-backend/jest.config.ts
UPDATE .gitignore
CREATE apps/challenge-backend-e2e/package.json
CREATE apps/challenge-backend-e2e/jest.config.ts
CREATE apps/challenge-backend-e2e/src/challenge-backend/challenge-backend.spec.ts
CREATE apps/challenge-backend-e2e/src/support/global-setup.ts
CREATE apps/challenge-backend-e2e/src/support/global-teardown.ts
CREATE apps/challenge-backend-e2e/src/support/test-setup.ts
CREATE apps/challenge-backend-e2e/.spec.swcrc
CREATE apps/challenge-backend-e2e/tsconfig.json
CREATE apps/challenge-backend-e2e/eslint.config.mjs
UPDATE tsconfig.json

add start to package
"scripts": {
   "start:challenge:backend": "npx nx serve challenge-backend"
 },

$:> npm run start:challenge:backend


 
Add react lib

npm i @nx/react -D
$:> npx nx generate @nx/react:lib packages/shared-ui --style=scss
NX  Generating @nx/react:library

✔ Which bundler would you like to use to build the library? Choose 'none' to skip build setup. · vite
✔ Which linter would you like to use? · eslint
✔ What unit test runner should be used? · vitest
Fetching @nx/vite...
UPDATE package.json
CREATE packages/shared-ui/package.json
CREATE packages/shared-ui/README.md
CREATE packages/shared-ui/src/index.ts
CREATE packages/shared-ui/tsconfig.lib.json
CREATE packages/shared-ui/.babelrc
CREATE packages/shared-ui/tsconfig.json
CREATE packages/shared-ui/eslint.config.mjs
UPDATE nx.json
UPDATE .gitignore
UPDATE eslint.config.mjs
CREATE packages/shared-ui/tsconfig.spec.json
CREATE vitest.workspace.ts
CREATE packages/shared-ui/vite.config.ts
CREATE packages/shared-ui/src/lib/shared-ui.tsx
CREATE packages/shared-ui/src/lib/shared-ui.module.scss
CREATE packages/shared-ui/src/lib/shared-ui.spec.tsx
UPDATE tsconfig.json


Add react app
$:>  npx nx generate @nx/react:app apps/the-game-of-life-app --style=scss
 NX  Generating @nx/react:application

✔ Would you like to add routing to this application? (y/N) · true
✔ Which bundler do you want to use to build the application? · vite
✔ Which linter would you like to use? · eslint
✔ What unit test runner should be used? · vitest
✔ Which E2E test runner would you like to use? · none
✔ Which port would you like to use for the dev server? · 4200
CREATE apps/the-game-of-life-app/index.html
CREATE apps/the-game-of-life-app/public/favicon.ico
CREATE apps/the-game-of-life-app/src/app/app.spec.tsx
CREATE apps/the-game-of-life-app/src/assets/.gitkeep
CREATE apps/the-game-of-life-app/src/main.tsx
CREATE apps/the-game-of-life-app/tsconfig.app.json
CREATE apps/the-game-of-life-app/src/app/nx-welcome.tsx
CREATE apps/the-game-of-life-app/src/app/app.module.scss
CREATE apps/the-game-of-life-app/src/app/app.tsx
CREATE apps/the-game-of-life-app/src/styles.scss
CREATE apps/the-game-of-life-app/tsconfig.json
CREATE apps/the-game-of-life-app/package.json
CREATE apps/the-game-of-life-app/eslint.config.mjs
UPDATE package.json
UPDATE nx.json
CREATE apps/the-game-of-life-app/tsconfig.spec.json
CREATE apps/the-game-of-life-app/vite.config.ts
UPDATE tsconfig.json

add start to package
"scripts": {
   "start:tgol:app": "npx nx serve the-game-of-life-app"
 },

# CodingChallengesRepo

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ Your new, shiny [Nx workspace](https://nx.dev) is ready ✨.

[Learn more about this workspace setup and its capabilities](https://nx.dev/nx-api/js?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!

## Generate a library

```sh
npx nx g @nx/js:lib packages/pkg1 --publishable --importPath=@my-org/pkg1
```

## Run tasks

To build the library use:

```sh
npx nx build pkg1
```

To run any task with Nx use:

```sh
npx nx <target> <project-name>
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Versioning and releasing

To version and release the library use

```
npx nx release
```

Pass `--dry-run` to see what would happen without actually releasing the library.

[Learn more about Nx release &raquo;](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Keep TypeScript project references up to date

Nx automatically updates TypeScript [project references](https://www.typescriptlang.org/docs/handbook/project-references.html) in `tsconfig.json` files to ensure they remain accurate based on your project dependencies (`import` or `require` statements). This sync is automatically done when running tasks such as `build` or `typecheck`, which require updated references to function correctly.

To manually trigger the process to sync the project graph dependencies information to the TypeScript project references, run the following command:

```sh
npx nx sync
```

You can enforce that the TypeScript project references are always in the correct state when running in CI by adding a step to your CI job configuration that runs the following command:

```sh
npx nx sync:check
```

[Learn more about nx sync](https://nx.dev/reference/nx-commands#sync)

## Set up CI!

### Step 1

To connect to Nx Cloud, run the following command:

```sh
npx nx connect
```

Connecting to Nx Cloud ensures a [fast and scalable CI](https://nx.dev/ci/intro/why-nx-cloud?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) pipeline. It includes features such as:

- [Remote caching](https://nx.dev/ci/features/remote-cache?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Task distribution across multiple machines](https://nx.dev/ci/features/distribute-task-execution?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Automated e2e test splitting](https://nx.dev/ci/features/split-e2e-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Task flakiness detection and rerunning](https://nx.dev/ci/features/flaky-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

### Step 2

Use the following command to configure a CI workflow for your workspace:

```sh
npx nx g ci-workflow
```

[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/nx-api/js?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:
- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
