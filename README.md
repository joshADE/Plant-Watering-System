# Plant-Watering-System
 An app to monitor plants and water them remotely

# Technologies used
* [React JS](https://reactjs.org/) (Javascript Library)
* [Redux](https://redux.js.org/) (State Container)
* [.Net Core](https://dotnet.microsoft.com/download/dotnet/3.1) (REST API)

# Requirements

* NodeJS (version 14.x and above)
* GIT (version 2.x and above) (optional)
* Visual Studio (version 2019 and above)
* Visual Studio Code (optional)
* SQL Server Management Studio

# How to run it locally on machine:

1. Download or clone the repository
1.1 Extract the folder from the .zip file if you downloaded it
2. Open the folder and you will find two sub folders, the Backend folder and the frontend folder
3. Go inside the Backend folder an open the "Plant-Watering-System-Backend.sln" file with Visual Studio.
4. If you recieve a security warning when opening the file in Visual Studio, click ok and accept the warning.
5. In Visual Studio, open the file appsettings.json
6. Where it says ConnectionStrings->Dev change the server name from "DESKTOP-LJG3CL3" to your server name for SQL Server Management Studio using Windows Authentication. Save the file after making this change.
7. In Visual Studio click Tools > NuGet Package Manager > Package Manager Console. A console should open in the bottom of the window. At the console prompt, type the command "UPDATE-DATABASE" and press enter.
8. If you did steps 5-7 correctly. A database should have been created in SQL Server Management Studio called PlantDB. If you get an error, make sure to follow the previous step properly. There is also the possibility that you may already have a database called PlantDB already. If that is the case, simply change the name of the database in appsettings.json from PlantDB to something else.
9. For this step, you might not need to make any changes. You will only need to make changes if the front end application is running on another port. Open the Startup.cs file in Visual Studio, in the Configure method, make sure that the app.UseCors line has the correct url for the front-end server(it should be okay if the frontend is running on localhost:3000).
10. Build the project by clicking Build > Build Solution in Visual Studio.
11. Run the backend application by clicking the |>IIS Express button at the top of the window.
12. When the application runs, pay attention to the port that it is running on.
13. Go back to the folder that has the two subfolder in step 2. This time, open the frontend folder in Visual Studio Code or a terminal of you choice. 
13.1 If you chose to use Visual Studio Code, you will have to open the editor terminal by cliking Terminal > New Terminal and a terminal should open in the bottom of the editor.
14. At the terminal propmt type "npm install" and press enter to install the required frontend dependencies. This command will not work if you don't have node installed.
15. Navigate to the file src > actions > api.js and make sure that the baseUrl variable has the same port number as the backend server as mentioned in step 12.
16. Run the application by typing "npm start" in terminal and pressing enter.
16.1 You may get a message saying that something is running on port 3000 and may be propmted to run the application on another port. If you decide to run the application on another port, go back to step 9 and change the port number to the corresponding port. 
