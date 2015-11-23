# [START docker]
# The Google App Engine python runtime is Debian Jessie with Python installed
# and various os-level packages to allow installation of popular Python
# libraries. The source is on github at:
#   https://github.com/GoogleCloudPlatform/python-docker
FROM gcr.io/google_appengine/python
RUN apt-get update
RUN apt-get -y install python-numpy python-scipy
# Create a virtualenv for the application dependencies.
# If you want to use Python 3, add the -p python3.4 flag.
#RUN virtualenv /env

# Set virtualenv environment variables. This is equivalent to running
# source /env/bin/activate. This ensures the application is executed within
# the context of the virtualenv and will have access to its dependencies.
#ENV VIRTUAL_ENV /env
#ENV PATH /env/bin:$PATH

# Install dependencies.
ADD requirements.txt /app/requirements.txt
RUN pip install -r /app/requirements.txt

# Add application code.
ADD . /app

# Use Gunicorn to serve the application.
CMD gunicorn DjangoVM.wsgi
# [END docker]
