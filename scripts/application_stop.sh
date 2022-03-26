#!/bin/bash
#Stopping existing node servers
echo "Stopping any existing node servers"
npm install pm2 -g
pm2 stop index || true
pm2 delete index || true