##Llevada a cabo del despliegue en heroku

Para lleva a cabo el despliegue de la aplicación en heroku debemo crear un archivo [Procfile](https://github.com/lrdzero/CCProyect/blob/master/Procfile)

Con este PaaS simle idicamos a heroku como realizar el lanzamiento de nuestra aplicación.

![](http://googledrive.com/host/0B6Q-phIC3pUpblVzUS1RbEZjb1E/EjercicioHW36.png)

Tambien mediante la especificación de Automatic Deploy a partir de la conexión con el repositorio ejecutamos de forma secuencial,
las herramientas de integracióncontinua y el PaaS tal y como se especificó en el despliegue tra el CI. Esto se puede comprobar tras
realizar un commit.

![](http://googledrive.com/host/0B6Q-phIC3pUpblVzUS1RbEZjb1E/EjercicioHW37.png)
Travis:
![](http://googledrive.com/host/0B6Q-phIC3pUpblVzUS1RbEZjb1E/EjercicioHW38.png)
Snap-ci (falla al reconocer el comando grunt aún estando especificado en el packaje.json)
![](http://googledrive.com/host/0B6Q-phIC3pUpblVzUS1RbEZjb1E/EjercicioHW39.png)
![](http://googledrive.com/host/0B6Q-phIC3pUpblVzUS1RbEZjb1E/EjercicioHW40.png)

Activity Feed Heroku
![](http://googledrive.com/host/0B6Q-phIC3pUpblVzUS1RbEZjb1E/EjercicioHW41.png)
