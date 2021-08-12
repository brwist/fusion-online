import os
from django.core.exceptions import ImproperlyConfigured
import environ

envObj = environ.Env()
environ.Env.read_env()

msg = "Set the %s environment variable"


def env(var_name):
    try:
        # return os.environ[var_name]
        return envObj(var_name)
    except KeyError:
        return
        # error_msg = msg % var_name
        # raise ImproperlyConfigured(error_msg)


API_KEY = env('API_KEY')
GRAPH_QL_URL = env('GRAPH_QL_URL')
