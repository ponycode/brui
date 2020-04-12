#!/bin/bash


if [[ -d /home/pi ]] # Shitty way to see if we're running on a pi - TODO: improve
then

  # Turn off the screensaver, brui will put the HDMI to sleep after 1 hour
  # if you don't turn this off, brui will wake up to a black screen on a pour
  export DISPLAY=:0
  xset s noblank
  xset s off
  xset -dpms

  # hide the mouse cursor after inactivity
  unclutter -idle 0.5 -root &

  # Change chromium settings to prevent blocking error messages
  sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' /home/pi/.config/chromium/Default/Preferences
  sed -i 's/"exit_type":"Crashed"/"exit_type":"Normal"/' /home/pi/.config/chromium/Default/Preferences

  # Launch Chrome
  if [[ -f /usr/bin/chromium-browser ]]
  then
    # --kiosk is another option here
    /usr/bin/chromium-browser --touch-events --noerrdialogs --disable-infobars http://localhost:8080 &
  fi

  # force refreshes every 15 seconds
  #while true; do
  #      xdotool keydown ctrl+r; xdotool keyup ctrl+r;
  #      sleep 15
  #done
fi

# Start the server with flow_meter support
node api/server.js --flow_meter=0 --simulated_flow_meter=1 --environment=prod
