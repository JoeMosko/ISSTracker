#Since the create_app method is outside the scope of main, we need to import it
from website import create_app


app = create_app()
#Only if we run this file, are we going to run the app. Prevents from running just from importing
#
    #Startup a webserver
    #TURN TO DEBUG=FALSE when running in production
    #app.run(debug=False)