# Run react app (with docker)
_[you need to install docker before](https://docs.docker.com/engine/install/)_
```shell
git clone https://github.com/Anton-beep/react_gomsg
cd react_gomsg
```

change file src/config.json: change 127.0.0.1 in "http://127.0.0.1:8080/api" to your local ip (starts with 192.168 and could be found by ```ipconfig``` in windows or ```ifconfig``` in linux, for example 192.168.56.1)

````shell
docker build -t react_gomsg .
docker run -p 3000:3000 react_gomsg
````