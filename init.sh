#Set the root password as root if not set as an ENV variable
export PASSWD=${PASSWD:=root}
#Set the root password
echo "root:$PASSWD" | chpasswd

echo "starting ssh agent"
eval "$(ssh-agent -s)"
$KEY > /.ssh/id_rsa
ssh-add /.ssh/id_rsa
ssh-add -l

git config --global user.email $EMAIL
git config --global user.name $NAME

# ssh -T git@github.com -i /data/id_rsa

if [ "$ERASE" == "TRUE" ]; then

	echo "Erasing project"
	cd /data
	rm -rf piTFT_mBeast
fi

echo "git clone"
DIRECTORY="/data/piTFT_mBeast"    # /   (root directory)
if [ -d "$DIRECTORY" ]; then
	echo "Project exists"
	cd /data/piTFT_mBeast
	git pull
else
	echo "Project doesnt exist, cloning"
	cd /data
	git clone https://github.com/resin-io-projects/piTFT_mBeast.git
	cd /data/piTFT_mBeast

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


echo "starting x-server"
cd /data/piTFT_mBeast && git push resin master --force
# xinit /usr/src/app/start-app.sh