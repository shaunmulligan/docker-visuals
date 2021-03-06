#/bin/bash

# Disable DPMS / Screen blanking
xset -dpms
xset s off
xset s noblank

mkdir /root/.config
sudo matchbox-window-manager -use_cursor no -use_titlebar no &
cd /usr/src/app/ && npm start
sleep 2s