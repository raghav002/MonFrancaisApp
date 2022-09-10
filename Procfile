heroku buildpacks:clear
heroku buildpacks:add --index heroku/python
heroku web:gunicorn frenchapp:app
heroku ps:scale web=1