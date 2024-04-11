#! /bin/bash

terraform apply \
  -var "do_token=$(cat ~/Desktop/dopat.txt)" \
  -var "pvt_key=~/Desktop/ssh/keys" \
  -var "pub_key=~/Desktop/ssh/keys.pub" \
  -auto-approve
