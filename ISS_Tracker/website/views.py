#Stores the pages users can navigate to 
from flask import Blueprint

#Create the name of our blueprint
views = Blueprint('view', __name__)

#Anytime we go to this route, the home() function will run
@views.route('/')
def home():
    return "<h1>Test</h1>"