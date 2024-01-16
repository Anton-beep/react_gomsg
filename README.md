# Run react app (with docker)
_[you need to install docker engine before](https://docs.docker.com/engine/install/)_
```shell
git clone https://github.com/Anton-beep/react_gomsg
cd react_gomsg
docker build -t react_gomsg .
docker run -p 3000:3000 react_gomsg
```