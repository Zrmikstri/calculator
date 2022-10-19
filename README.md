# Calculator using React Native

First React Native project for CS526. 

Simple working calculator using React Native


Run this calculator on web and mobile through docker

1. Open terminal and run the commands
    >   git clone https://github.com/Zrmikstri/calculator.git  

    >   cd .\calculator\

    >   wsl

2. Open Docker Desktop 
3. Run commands on terminal
    > docker run -u $(id -u) -it --rm --name calculator -p 19000-19010:19000-19010 -v \`pwd`:/current node:18-slim bash

    > cd current/

4. Install node_module by this command
    > npm install

5. Run app      
    5.1. To run this calculator on web use commands
    > export NODE_OPTIONS=--openssl-legacy-provider

    > npm run web

    After, open this link on browser **http://localhost:19006**

    5.2. To run this calculator on mobile (android)
    >   npm start
    
    After, open ExpoGo on your mobile (your mobile and laptop have to connect same private wifi) and 








