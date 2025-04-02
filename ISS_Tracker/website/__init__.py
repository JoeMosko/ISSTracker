from flask import Flask
#Create the create_app method
def create_app():
    #Initializing flask
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'ISSTrackerKeyData!'
    #The @views needs permission from init, so we import it here 
    from .views import views
    from .auth import auth

    #All of the urls in the blueprint files
    app.register_blueprint(views, url_prefix="/")
    app.register_blueprint(auth, url_prefix="/")
    #return the app
    return app

