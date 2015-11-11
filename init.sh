#Set the root password as root if not set as an ENV variable
export PASSWD=${PASSWD:=root}
#Set the root password
echo "root:$PASSWD" | chpasswd

echo "starting ssh agent"
eval "$(ssh-agent -s)"
$KEY > /data/id_rsa
chmod 700 /data/id_rsa

ssh-add /data/id_rsa
ssh-add -l

git config --global user.email $EMAIL
git config --global user.name $NAME

ssh -T git@github.com -i /data/id_rsa

if [ "$ERASE" == "TRUE" ]; then

	echo "Erasing project"
	cd /data
	rm -rf applause-o-meter
fi

echo "git clone"
DIRECTORY="/data/applause-o-meter"    # /   (root directory)
if [ -d "$DIRECTORY" ]; then
	echo "Project exists"
	cd /data/applause-o-meter
	git pull
else
	echo "Project doesnt exist, cloning"
	cd /data
	git clone https://github.com/shaunmulligan/firebaseDTL
	cd /data/firebaseDTL

	git remote add resin $REMOTE
	if [ "${PUSHTOALL}" == "TRUE" ]; then
	    arr=($(printenv | awk -F "=" '{print $1}' | grep REMOTE_ADD_))
	    for i in ${arr[*]}
	    do
		eval a=\$$i
		echo adding remote $i $a
		git remote set-url --add resin $a
	    done
	fi
fi

echo "starting node app"
xinit /usr/src/app/start-app.sh