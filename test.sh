#!/bin/bash
/home/pi/.nvm/versions/node/v10.13.0/bin/node /home/pi/brui/api/server.js  --flow_meter=1 --simulated_flow_meter=1 --environment=prod

echo "STARTING BROWSER"
/home/pi/brui/exec-start-post.sh
