# brui

## Equipment


### Flow Sensors

I used the Titan 300 flow sensors purchased from here:
https://brewskey.myshopify.com/products/titan-300-flow-sensor

These are a little pricy - I'm pretty sure any food safe hall-effect flow sensor will work.

### Temperature Sensor

Coming Soon


### Brui PCB

You don't really need a PCB to connect the flow sensors to the raspberry pi but I wanted something nice looking.

You can order a bare PCB from OSH Park here for less than $15:
[![Order From OSH Park](https://oshpark.com/assets/badge-5b7ec47045b78aef6eb9d83b3bac6b1920de805e9a0c227658eac6e19a045b9c.png)](https://oshpark.com/shared_projects/nq7zyTg5)

The source KiCad files can be found in this project:
[KiCad Archive](/hardware/Brui-PCB-KiCad.zip)

The BOM can be found here ( all parts available from Mouser except for the Titan 300 flow sensors ):
[BRUI BOM](/hardware/bom.md)


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
