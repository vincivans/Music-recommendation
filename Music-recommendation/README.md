# Music-recommendation
CS546 final project
Team Winnebago, Alaska



##Layer

├─┬ index
│ ├── [public] header (login/signup/logout, user profile, Album bar)
│ ├── [public] Top 10 tracks that played in our website
│ ├── [public] Hottest ablums	
│ └── [public] footer
│
├─┬ Artist profile
│ ├── [public] header (login/signup/logout, user profile, search bar)
│ ├── [public] Artist details (all albums artist have, tracks)
│ ├── [public] Recommend artists who relate to the artist you are looking for
│ └── [public] footer
├
│ 
├─┬ Album profile	
│ ├── [public] header (login/signup/logout, user profile, search bar)
│ ├── [public] Album details (artists, album name, tracks, preview of each track)
│ ├── [public] Recommend artists who relate to the artist you are looking for
│ └── [public] footer
│ 
│
├─┬ log in
│ ├── [public] login form
│ ├── [public] link to signup
│ └── [public] footer
│
├─┬ sign up
│ ├── [public] signup form
│ ├── [public] link to login
│ └── [public] footer
│
└─┬ user profile
  ├─┬ login
  │ ├── [private] header (login/signup/logout, user profile, search bar)
  │ ├── [private] favorite music
  │ ├── [private] recent listened music
  │ └── [private] footer
  └─┬ not login
    └── [public] redirect to login page






##First use instructions:
go to the file's tasks repository, using shell command as follow:

$cd Music-recommendation/tasks/

run the seed script using following command:

$node seed.js

After initialization, it will diplay "done" in the shell window,
then you can use cmd+c in Mac or ctrl+d in window to end the seed file.

in the shell window, type in the following command to run the project:

$npm start


