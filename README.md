This is Harits Syah (@haritssr) personal website

## Commit Rules

Commit rules ini mengacu pada kaidah penulisan commit yang baik yaitu 50/72, 50 untuk maksimal karakter commit message, dan 72 untuk maksimal karakter commit description

- add = menambahkan sesuatu
- refactor = memperbarui/memperbaiki/optimisasi kode
- delete = menghapus sesuatu tanpa menggantinya dengan yang baru
- bugfix = memperbaiki behaviour dari kasus yang tidak disadari/terjangkau dari hasil kode yang dibuat
- style = redesign

e.g.
add: new Component ExplanationList

## Global Folder Explanation

- /pages
- includes all routes of this site

- /pages/experiments
- includes all experiments of this site

- /data
- includes all (quite) big static data for /pages/[...] (route inside folder /pages )

- /components
- includes all component for /pages/[...]

- /styles
- includes all custom styles for /pages/[...] and global.css

- /utils
- includes some utility function e.g. wrapper function for fetching api (instead of making the function inline in file)

- /postData
- includes data for dynamic pages in /pages/experiments/nextjs/posts but manipulated in /utils/posts.js
