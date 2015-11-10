
# echo "helllllllos"

if [ ! -z "$RESIN" ]; then  
    cd /data/applause-o-meter && git push resin master --force
else  
    cd ~/resin/hackprojects/cron-lock-updates && git push resin master --force
fi  