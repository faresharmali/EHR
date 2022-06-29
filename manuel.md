cd test-network 
export PATH=${PWD}/../bin:$PATH
export FABRIC_CFG_PATH=$PWD/../config/


only bin 

flags:curl https://raw.githubusercontent.com/hyperledger/fabric/master/scripts/bootstrap.sh | bash -s -- 1.4.0 1.4.0 -d -s 

curl -sSL https://bit.ly/2ysbOFE | bash -s -- -h

h for help 
s for bin only