#Author - Joseph Mosko
#Fetch Longitude and Latitude of the International Space Station, refreshing every second. 
import json
#pip install requests
import requests
import time

def getLongitude(url):

    #response object from API
    response = requests.get(url)

    #A status code of 200 means that everything worked, so there is a problem if it is not 200 
    if response.status_code != 200:
        #Print error messages
        print("The API is down. Please try again")
        print("The status code is", response.status_code)
        return
    
    formatted_response = response.json()

    #Parse the longitude from the API 
    longitude = formatted_response['iss_position']['longitude']

    #Return the longitude
    return longitude

def getLatitude(url):
     #response object from API
    response = requests.get(url)

    #A status code of 200 means that everything worked, so there is a problem if it is not 200 
    if response.status_code != 200:
        #Print error messages
        print("The API is down. Please try again")
        print("The status code is", response.status_code)
        return
    
    formatted_response = response.json()

    #Parse the longitude from the API 
    latitude = formatted_response['iss_position']['latitude']

    #Return the longitude
    return latitude
def main():
    api_url = 'http://api.open-notify.org/iss-now.json'

    for i in range(10):
        print("Longitude:", getLongitude(api_url), "Latitude:", getLatitude(api_url))
        time.sleep(5)

main()