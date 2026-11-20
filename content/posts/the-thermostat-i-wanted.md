---
title: "The thermostat I wanted"
date: "2026-11-20"
description: "Why I ended up building my own thermostat, and everything I learned on the way."
---

We have aerothermia at home, with underfloor heating and a collector on each floor. I needed thermostats, so I went looking at what you can buy, and nothing really convinced me.

In the end, one thermostat I saw gave me the last push. I liked it a lot. Not to make a product out of it, but because it showed me that something like that could look good on my wall and still cover exactly what I needed.

The conclusion I reached is simple, and a bit stubborn: the best thermostat is the one you build yourself, so it covers your own needs. And it is not only that it is mine. It is that I made it, and I learned a lot of things on the way.

## What I actually needed

The valves sit at the collectors, with 230 V actuators. The wall is flat, with no mechanism box, so a deep connector does not fit, and the cable coming out of the wall is not exactly what a shop thermostat expects.

I also knew how I wanted to live with it. I don't want buttons on the wall. I want to change the temperature from the iPhone, or by asking Siri, and I already switch heat and cool on the aerothermia unit itself. That mix is ordinary if you live in the house. It is much less ordinary if you try to buy it as a product.

## A dead screen, and a better one

I tried e-paper first. The board died, and I sent it back. Then I moved to a Waveshare ESP32-S3 with a 4.2 inch reflective LCD. No backlight, a screen that looks closer to paper than to a phone, and a temperature sensor already on the board. The thermostat itself has no relay. It only measures, shows the room, and talks to the house.

![The office thermostat on a desk, its reflective screen showing OFICINA at 21.0 °C and Calentando, surrounded by jumper wires, a buck converter, a USB cable, and green 3D-printed case frames.](/images/posts/the-thermostat-i-wanted/thermostat-desk.jpg)

The firmware is ESPHome. Home Assistant sits in the middle, with the Dual Smart Thermostat integration in heat pump mode. A HomeKit Bridge exposes it as a normal thermostat, so I can use Apple Home and Siri. The first room is the office. The screen says OFICINA. In Home Assistant it is already live.

There are seams, and I have left them visible on purpose. Because cooling is a separate toggle, Home shows Off, Heat and Auto, but not Cool. The valve for the office is still a test switch. The Shelly Pro 3 that will drive the actuators, and the Mean Well 24 V supply that will power the boards through a small buck converter, are waiting for the manifold wiring. I am not going to hang everything until I have the parts. One room working is enough to learn. The rest will come after.

## A case, about six times

I designed the case in code, with CadQuery, and I print it on a Bambu Lab P1S. There is a wall plate that reuses the plugs already in the wall, a panel that holds the board and the power bits, and a shell around it. I wanted it symmetric, with no snap clips, and I have been changing it by tenths of a millimetre.

The last shell is v4.6. It is 100.8 by 79.6 mm, with a window of 84.0 by 62.8. In v4.5 the top tongue overlapped the panel by 1.2 mm, and you had to force it. In v4.6 I cut that overlap to 0.7 mm. The face that comes off the printer bed is a bit rough. I thought about buying another bed just to get it smooth, and then I let it go. I will hang the first one in green, to see how it really fits, and only then print it in white.

I printed that piece about six times before it fit. Yes, six. Each time I would take it off the bed, try it, mutter something, change a number in the code, and print it again. It is a ridiculous way to spend an evening, and also one of the parts I enjoy most. With software you feel the change. With a case you hold it. You see that it does not close, you fix half a millimetre, and then, one morning, it does.

*[PHOTO, optional: the case on the wall, when you hang the green one]*

## When the board goes silent

There was another hole, and this one mattered more than the fit of a tongue.

If the board dies or comes off the wall, I need to know. I also need the heating not to stay on as if nothing had happened. I expected Apple Home to show "No Response", the way it does with other accessories. It does not, not for this. The board in Home Assistant does become unavailable. The climate entity, the one HomeKit is looking at, stays available, because Dual Smart Thermostat does not follow the board down. So Apple Home keeps showing a thermostat that looks fine.

I stopped waiting for a perfect platform fix. A Home Assistant automation waits fifteen minutes, turns the climate off, and sends a notification to my iPhone. It runs at home, with no cloud in the middle. I tested the notification before trusting it. It works, and I relaxed a little.

The temperature itself needed honesty too. The sensor sits on the board, and the board warms it, so the reading was high. I applied an offset of 2.4 °C, and I will fine tune it later. The thermostat currently uses a tolerance of 1 °C. For underfloor heating, something closer to 0.3 or 0.5 °C might be better. I have not changed it yet. It is good enough for this first room, and I would rather live with it for a while than pretend I already know.

## Hands, and a leap I would not have taken

I should say this plainly: without AI I would not have dared to take on this project at all. I don't know electronics the way I know software. The firmware, the parts I had never touched, the case designed in code, the Home Assistant setup: I would have stopped before starting. AI made the leap possible.

Then my hands did the rest, and that is where I learned the most. I learned to solder, badly at first and then a bit better. I spent evenings with a multimeter, checking voltages and polarity before plugging anything in. I learned what a buck converter does, how pins and connectors go together, how boards talk to each other, how to design a part so it actually fits. So much of my work today is AI and software that this part, the tangible one, is something I genuinely enjoy.

## The one that covers my needs

I like shipping a thing end to end: the board, the case, the firmware, the automation, the way it feels in your hand and in the Home app. I like iterating until the obvious problems are gone, and I like stopping when the next improvement can wait.

When the tool does not fit, I have usually ended up building it. At CARTO I was the first employee, making geospatial data easier to visualize. At Tinybird the connector that was supposed to take billing from Stripe to Holded did not work well, so I built my own sync app. And there is a line I keep finding, from sensor to decision: Tinybird was real-time data, and [Orbimon](https://orbimon.com) exists because nothing independent existed for Starlink, a small device at the edge reading the dish locally.

At home, the version of that story is quieter. A room that says OFICINA, a case I had to print about six times, and a thermostat that does what I need because I made it that way.

The office is first. The rest will follow.
