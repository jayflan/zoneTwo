# Welcome!

zoneTwo is a work in progress

Intention is to create a 'lite' Strava clone for personal workout tracking.

Initial Goal: showcase heartrate, speed, and route metrics via upload of workout files.

Current Documentation using Jupyter Notebook (links to docs in this repo):

<ul>
  <li>
    <a href='https://github.com/jayflan/docs/blob/main/zoneTwo/backendGpx.ipynb'>Backend Logic</a>
  </li>
</ul>


Current Features

Developer:

- Db Layer for login authentication (email/password)
- Db Layer for workouts (name/description/data)
- Tests for Db Layer
- Tests for React Framework
- Tests for JWT Login

User:

- Landing page
- Login page
- Login via JSON Web Token
- Login via OAuth (Google)
- User overview page (dashboard)
- GPX file uploading popup / overlay
- User workout components: gps route, heartrate, speed

Future Features

Developer:

- Tests for React Router

User:
- Individual Workout Graph
- Error page

