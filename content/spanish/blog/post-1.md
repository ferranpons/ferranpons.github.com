---
date: "2021-06-25"
title: "Cómo hacer funcionar tu juego en Monogame en una Raspberry Pi (o cualquier Linux)"
image: "images/blog/01.png"
categories: ["Raspberry Pi", "Monogame", "Linux"]
draft: false
---

Si está aquí, probablemente tenga un juego de Windows desarrollado con Monogame que le gustaría portar a un dispositivo Raspberry Pi con Raspberry Pi OS (Raspbian). O incluso, a cualquier distribución de Linux. Bueno, estás en el lugar correcto. Este mini-tutorial cubrirá todos los pasos para ejecutar tu juego en él.

Requisitos
Antes de comenzar a poner sus manos en la tarea, debe cumplir con estos requisitos para maximizar la compatibilidad y estar actualizado.

Monogame 3.8 (podría ejecutarse en versiones anteriores pero no probado)
Tu juego usando .Net Core 3 o posterior
Tu juego y recursos creados con Target DesktopGL
Raspberry Pi 2 o posterior (dotnet solo puede publicar en dispositivos más nuevos y no en el RPi original)
Cómo hacerlo
Vamos a utilizar nuestro videojuego Zombusters que es #OpenSource como ejemplo de un proyecto real funcionando.

Clonar el repositorio del juego
clon de git https://github.com/retrowax/Zombusters.git

2. Descargue e instale .NET Core 3.1 SDK

En este caso, de momento seguimos usando .NET Core 3.1 pero sería lo mismo para la última versión 5.0. Aquí encontrará el SDK:

https://dotnet.microsoft.com/download/dotnet-core/3.1

Necesitamos descargar la versión Arm32 porque el sistema operativo Raspberry Pi todavía es de 32 bits.

wget https://download.visualstudio.microsoft.com/download/pr/2178c8a1-ad48-4e51-9ddd-4e3ab64d1f0e/68746abefadf62be43ca525653c915a1/dotnet-sdk-3.1.405-linux-arm.tar.gz

Ahora necesitamos descomprimir el archivo e instalarlo en nuestra ruta:

mkdir -p “$HOME/dotnet” && tar zxf dotnet-sdk-3.1.405-linux-arm.tar.gz -C “$HOME/dotnet”

exportar DOTNET_ROOT=$HOME/dotnet

export PATH=$PATH:$HOME/dotnet

Si desea que .NET Core siga funcionando después de reiniciar el sistema, deberá hacer esto:

sudo vi /etc/perfil

Agregue estas líneas en la parte inferior del archivo y guárdelo, use el editor de su elección. Usé vi.

exportar DOTNET_ROOT=$HOME/dotnet

export PATH=$PATH:$HOME/dotnet

3. Crea la solución del juego

Ahora es el momento de compilar la solución, pero primero debemos descargar las dependencias de Nuget requeridas incluidas en la solución antes de que podamos compilarla.

dotnet restaurar ZombustersLinux.sln

Luego, crea el sabor Debug:

dotnet msbuild ZombustersLinux.sln

Ahora le gustaría realizar cambios en su solución para adaptarla o resolver eventuales problemas con la migración de su solución a su Raspberry Pi.

Si la compilación se ejecuta sin errores, genera un dll con la compilación de depuración que podría ejecutarse con este comando (la ruta es donde se generaron los archivos de la solución):

dotnet /home/pi/Documentos/github/Zombusters/ZombustersWindows/bin/Debug/netcoreapp3.1/ZombustersLinux.dll

Nota: si es la primera vez que migra a un entorno Linux, es posible que sus rutas de carga de contenido estén equivocadas y generen errores al compilar.

¡Y eso es! Ahora tendrás tu juego funcionando en tu Raspberry Pi.

Este proceso podría usarse para ejecutarlo en otras distribuciones de Linux, solo necesita descargar el arco correcto para el SDK de .NET Core.

Finalmente, si desea probar Zombusters en su Raspberry Pi, puede descargarlo GRATIS aquí:

https://retrowax.itch.io/zombusters-raspberry-pi-edición

En las próximas publicaciones, cubriremos las formas de crear una versión de lanzamiento y las mejores opciones para distribuirla.

¡Manténganse al tanto!