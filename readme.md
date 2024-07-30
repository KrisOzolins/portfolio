<!-- Project shields -->
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

# KrisOzolins Portfolio

> Next.js + standalone Node.js/Express monorepo for my portfolio website.

- [Introduction](#introduction)
- [Description](#description)
- [Development](#development)
  - [Info](#info)
  - [To Do](#to-do)
  - [Project Dependencies and Requirements](#project-dependencies-and-requirements)
  - [Setup](#setup)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
  - [Development workflow and project configuration](#development-workflow-and-project-configuration)
  - [Testing](#testing)
  - [Deployment](#deployment)
    - [Develop](#develop)
    - [Staging](#staging)
    - [Prod](#prod)
  - [Branching](#branching)
  - [Infrastructure](#infrastructure)
- [Project Details and Management](#project-details-and-management)
- [License](#license)

## Introduction

My personal portfolio project used to showcase some of my skills, as reference for other projects and last but not least as my personal public portfolio website for potential employers, clients, etc.

Feel free to explore, use as a reference or for inspiration, make suggestions, etc.

## Description

This project is a monorepo containing both the frontend and backend parts of the portfolio website. The frontend is built with Next.js, while the backend is a standalone Node.js/Express server.

## Development

### Info
* Tech used: Next.js, Node.js/Express, Redux, TypeScript, PostgreSQL.
* Dev: clone, run `npm i && cd server && npm i`, then edit both ./.env and ./server/.env files, create db and `npm run dev`.
* ...

### To Do
* [ ] Test GHA CI/CD pipeline.
* [ ] ...

### Project Dependencies and Requirements

- Node.js >= v22.x and [NPM](https://www.npmjs.com/)
- MySQL database (>= v8.*).
- Redis (for caching).

### Setup

1. Setup the local dev environment.
2. Clone the repo: https://github.com/KrisOzolins/portfolio.
3. Run `npm i` to install Node.js dependencies.
4. Run `cd server && npm i` to install Node.js dependencies for the server.
5. Copy `.env.example` env file to `.env.development` and fill in the necessary environment variables (both in project **root** and **server** directories).
6. When you first start the project (`npm run dev`) with an empty database, it will be automatically seeded with some initial data, otherwise you can run `npm run seed` from the server directory to seed the database.

### Environment Variables

The most important parameters in .env files are described below:

**Project root**:
- NEXT_PUBLIC_BASE_URL: Base URL of the project.
- NEXT_PUBLIC_NODE_PROTOCOL: Node.js server protocol.
- NEXT_PUBLIC_NODE_HOST: Node.js server host.
- NEXT_PUBLIC_NODE_PORT: Node.js server port.
- NEXT_PUBLIC_MAPS_API_KEY: Google maps Api key.
- NEXT_PUBLIC_RECAPTCHA_SITE_KEY: Your Recaptcha site key.
- NEXT_PUBLIC_ANALYTICS_ID: Google Analytics ID.

**Server**:
- PUBLIC_BASE_URL: Base URL of the project.
- SERVER_BASE_URL: Base URL of the server.
- NODE_PORT: Node.js server port.
- DB_*: Local DB credentials.
- MAIL_*: Your Mail credentials.
- JWT_SECRET: Your JWT secret key.
- SESSION_SECRET: Your session secret key.
- RECAPTCHA_SECRET: Your Recaptcha secret key.
- DROPBOX_ACCESS_TOKEN: Your Dropbox access token for DB backups.
- NEW_RELIC_APP_NAME: New Relic app name.
- NEW_RELIC_LICENSE_KEY: New Relic license key.
- GOOGLE_CLIENT_ID: Google client ID for OAuth.
- GOOGLE_CLIENT_SECRET: Google client secret for OAuth.

### Running the App

- In the project root directory, run `npm run dev` to start both the Next.js app and Node.js server.
- Now you should be able to access and test the app at `http://localhost:3000`.

### Development workflow and project configuration

- VCS - Create a new `feat/*` or `fix/*` branch from the `main`. Once done, push it to the repo, create a pull request and merge it back to the `staging` branch.
- Node.js - For using different versions of Node.js, you can use NVM.
- Tailwind, Prettier, ESLint, ...

### Local development using Docker

- You can also use Docker for local development. To do so, you need to have Docker and Docker Compose installed on your machine.
- Run `docker-compose up` to start the project in development mode.
- Now you should be able to access and test the app at `http://localhost:3000`.

### Testing

- Project doesn't have any automated testing yet. So everything is first tested locally, then after push to `staging` branch, manual tests are done there.

### Deployment

The current process outlined below uses the GHA CI/CD system.

1. Pushing/merging a PR into either `staging` or `main` initiates GHA CI/CD deployment pipeline.
2. Once everything is built (with no errors), DigitalOcean App platform's deployment is initiated.
3. Custom NPM post-build hook is initiated to do any kind of needed housekeeping work after the container is built and about to be deployed live.

#### Develop

...

#### Staging

...

#### Prod

...

### Branching

- `main` - the main branch.
- `staging` - for staging environment.
- `develop` - for local develop environment.
- `task/*` and `feat/*` - created off of `main` for new feature development.
- `fix/*` - created off of `main` for bug fixes.

### Infrastructure

<!-- ![Infrastructure](resources/images/infrastructure.png) -->
...

## Project Details and Management

- Project management is happening in both my personal Notion and Github Issues at the moment. Once everything is confirmed working correctly and migrated, we can move to only using github issues to keep the process simple.
- Meetings are held on a weekly basis, usually on Fridays.
- Project manager: Krisjanis Ozolins (kris@krisozolins.com).
- Technical lead: Krisjanis Ozolins (kris@krisozolins.com).

## License

The MIT License (MIT)
Copyright (c) 2024 KrisOzolins https://krisozolins.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

<!-- MARKDOWN LINKS & IMAGES -->
[forks-shield]: https://img.shields.io/github/forks/krisozolins/portfolio.svg?style=for-the-badge
[forks-url]: https://github.com/krisozolins/portfolio/network/members
[stars-shield]: https://img.shields.io/github/stars/krisozolins/portfolio.svg?style=for-the-badge
[stars-url]: https://github.com/krisozolins/portfolio/stargazers
[issues-shield]: https://img.shields.io/github/issues/krisozolins/portfolio.svg?style=for-the-badge
[issues-url]: https://github.com/krisozolins/portfolio/issues
[license-shield]: https://img.shields.io/github/license/krisozolins/portfolio.svg?style=for-the-badge
[license-url]: https://github.com/krisozolins/portfolio/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/krisozolins
[product-screenshot]: resources/images/screenshot.png
