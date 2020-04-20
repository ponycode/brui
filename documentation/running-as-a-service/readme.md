# Running Brui as a systemd Service

1. Run: cp documentation/running-as-a-service /lib/systemd/system/brui.service to create the systemd unit file
2. Change paths inside /lib/systemd/system/brui.service if needed.
3. Reload the systemd services: sudo systemctl daemon-reload
4. Start the brui service: systemctl start brui
5. Check the status of the brui service: systemctl status brui
6. Stop the brui service: systemctl stop brui
