---
date: "2021-10-01"
title: "How to run your Monogame app on a Raspberry Pi (or any Linux)"
image: "images/blog/01.png"
categories: ["Raspberry Pi", "Monogame", "Linux"]
draft: false
---

If you are here you probably have a Windows game developed using Monogame that you would like to port to a Raspberry Pi device with Raspberry Pi OS (Raspbian). Or even, to any Linux distribution. Well, you are in the right place. This mini-tutorial will cover all the steps to run your game on it.

Requirements
Before starting to get your hands on the task you must comply with these requirements to maximize compatibility and to be up-to-date.

Monogame 3.8 (it could run on older versions but not tested)
Your game using .Net Core 3 or newer
Your game and assets built with target DesktopGL
Raspberry Pi 2 or newer (dotnet can publish only on newer devices and not on the original RPi)
How to do it
We are going to use our videogame Zombusters that is #OpenSource as an example of a real project working.

Clone the Game Repository
git clone https://github.com/retrowax/Zombusters.git

2. Download and install .NET Core 3.1 SDK

In this case, at the moment we are still using .NET Core 3.1 but it would be the same for the latest version 5.0. Here you will find the SDK:

https://dotnet.microsoft.com/download/dotnet-core/3.1

We need to download the Arm32 version because Raspberry Pi OS is still 32bit.

wget https://download.visualstudio.microsoft.com/download/pr/2178c8a1-ad48-4e51-9ddd-4e3ab64d1f0e/68746abefadf62be43ca525653c915a1/dotnet-sdk-3.1.405-linux-arm.tar.gz

Now we need to uncompress the file and install it on our path:

mkdir -p “$HOME/dotnet” && tar zxf dotnet-sdk-3.1.405-linux-arm.tar.gz -C “$HOME/dotnet”

export DOTNET_ROOT=$HOME/dotnet

export PATH=$PATH:$HOME/dotnet

If you want .NET Core to still work after restarting the system you would need to do this:

sudo vi /etc/profile

Add these lines at the bottom of the file and save it, use your editor of choice I used vi.

export DOTNET_ROOT=$HOME/dotnet

export PATH=$PATH:$HOME/dotnet

3. Build the Game Solution

Now is time to build the solution but first, we need to download the required Nuget dependencies included on the solution before we could build it.

dotnet restore ZombustersLinux.sln

Then, build the Debug flavor:

dotnet msbuild ZombustersLinux.sln

Now you would like to make changes to your solution in order to adapt it or solve eventual issues with your solution being migrated to your Raspberry Pi.

If the build runs without errors, it generates a dll with the debug build that could be executed with this command (the path is where your solution files were generated):

dotnet /home/pi/Documents/github/Zombusters/ZombustersWindows/bin/Debug/netcoreapp3.1/ZombustersLinux.dll

Note: if is the first time migrating to a Linux environment it would be possible that your Content Load paths could be wrong and could generate errors when building.

And that’s it! You will have now your game up and running on your Raspberry Pi.

This process could be used to execute it on other Linux distributions, you only need to download the correct arch for the .NET Core SDK.

Finally, if you would like to try Zombusters on your Raspberry Pi, you can download it for FREE here:

https://retrowax.itch.io/zombusters-raspberry-pi-edition

In the next posts, we will cover the ways to create a Release build and the best options to distribute it.

Stay tuned!