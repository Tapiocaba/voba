# Backend Files

API server built using FastAPI. To run the API server, first `cd` into the `/app` folder, then run,

```
uvicorn main:app --reload
```

To build zip files for lambda deployment:

Install all dependencies in a folder (run from cmd shell in VSCode with `venv` activated):
```
pip freeze > requirements.txt
pip3 install -t dep -r requirements.txt --platform manylinux2014_x86_64 --target ./python --only-binary=:all:
```

Create bundle
```
cd dep
zip ../treehacks-api.zip -r .
cd ..
zip treehacks-api.zip -u main.py models.py dependencies.py __init__.py .env
```