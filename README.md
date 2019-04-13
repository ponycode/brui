# brui

## Raspbian setup

Install pigpio: `sudo apt-get install pigpio`

I had trouble with `brui/npm install` freezing up. I ran the command below first:

```
sudo apt-get install libsqlite3-dev
npm install sqlite3 --build-from-source --sqlite=/usr
```

And then ran `brui/npm install`.


## Running locally

Start the API server by running `npm run server` or run the 'Run Server' configuration in VSCode.

Start the Vue dev server by running `npm run serve`
