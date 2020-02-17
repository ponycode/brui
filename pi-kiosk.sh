#!/bin/bash

# from: https://pimylifeup.com/raspberry-pi-kiosk/

export DISPLAY=:0


# Turn off the screensaver
xset s noblank
xset s off
xset -dpms


# hide the mouse cursor after inactivity
unclutter -idle 0.5 -root &


# Change chromium settings to prevent blocking error messages
sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' /home/pi/.config/chromium/Default/Preferences
sed -i 's/"exit_type":"Crashed"/"exit_type":"Normal"/' /home/pi/.config/chromium/Default/Preferences


# Launch Chrome
#/usr/bin/chromium-browser --touch-events --noerrdialogs --disable-infobars --kiosk http://localhost:8080 &
/usr/bin/chromium-browser --touch-events --noerrdialogs --disable-infobars http://localhost:8080 &


# force refreshes every 15 seconds
#while true; do
#      xdotool keydown ctrl+r; xdotool keyup ctrl+r;
#      sleep 15
#done
