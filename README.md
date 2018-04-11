# Click2Evaluate (or Éval'Ponts ?)
TDLOG (Techniques de Développement Logiciel) project at École des Ponts ParisTech by four students :
* Hervé Andrès
* Marc-Antoine Augé
* Bastien Dechamps
* Michaël Karpe

## Objective 
Make an application to evaluate courses in École des Ponts ParisTech in order to get more answers to improve courses.

## Production
An application with Ionic3 available on Android, on iOS and on computer for the frontend part 
and a REST API in Django for the backend part. 

A complete documentation of our code is available with the code for the backend part.

## Application
To test the application without backend, change the variable 'noServer' in /src/providers/api.ts. 

Some famous former students of the school are available to test the app, no password needed:
* henri.becquerel@enpc.fr
* guy.beart@enpc.fr
* henri.navier@enpc.fr
* raymond.aubrac@enpc.fr

The repo is available here: https://github.com/HerrVey/Click2Evaluate 

## Backend
The backend is made with Django and has two parts:
* A REST API in order to synchronize the data with the app
* A control panel in order to simplify the management of a survey campaign

The repo is available here: https://github.com/Marc-AntoineA/Click2Evaluate_server


