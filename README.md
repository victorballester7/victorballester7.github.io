# My personal website

This is the source code of my personal website, which is a fork of the [al-folio](https://github.com/alshedivat/al-folio).

In order to edit the content of the website locally (before pushing it to GitHub) just run the following commands in the root directory of the repository:

```
systemctl start docker.service
sudo docker compose pull
sudo docker compose up
```

Wait a few seconds and then connect to the server address that appears in the terminal.

Note that you need to have `docker` and `docker-compose` installed in your system.
