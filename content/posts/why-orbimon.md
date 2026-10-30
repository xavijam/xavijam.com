---
title: "Why Orbimon"
date: "2026-10-30"
description: "Why I started Orbimon after Tinybird, and where the name comes from."
---

After seven years at Tinybird, I started something new: [Orbimon](https://orbimon.com). It's an independent observability platform for Starlink. Here is why Starlink, why now, and why that name.

## It started on holidays

I started using Starlink because I needed internet when I went on holidays. I didn't want (or couldn't) pay for an extra fiber line just for a few weeks a year. What helped me most was having something I could use anywhere: in the car while travelling, working from the beach, from the countryside, from wherever I was.

I needed to be connected as much as possible, in case something happened, or in case I had to work while the family enjoyed their holidays. Starlink made that possible.

I bought my first one in 2024, the one with the mast. I fell in love with the device. It's incredible, and it works really well 😄

## The weak point: not knowing what happened

But it had one weak point for me: knowing what was going on with the connection. I had obstruction problems, and every now and then it dropped. If I left processes running, some of them were cut because they lost the connection, and I didn't know why, when, or for how long.

The only observability you get is in the mobile app, and it only covers the recent past. Latency and drops go back about twelve hours at most (less if the dish restarted), and usage only the last fifteen minutes. There's also an event log for the last day. That's it.

I remember thinking: how strange that they don't give you real stats. Then I looked around, and there are many options out there, built by people who are really good at this. But almost all of them have the same catch: you have to be on the same network as the Starlink, because the stats are collected locally.

## Two dishes, more questions

What I wanted was to know what was happening remotely. Later I bought a second Starlink for home, to tinker with. With two of them, the questions multiplied. Is anyone using it? How many people? How much are they downloading? Is something going on? Does it need to be installed again, or updated? That kind of thing.

In the end, it's an observability problem, and a monitoring problem. And that's something I know quite well after building Tinybird.

## Data, again

I've said it before: I started Tinybird without knowing much about data, and I ended up loving it. Playing with data, getting value out of it, and telling stories through it has been one of the parts I've enjoyed most these years. Orbimon is a chance to keep doing exactly that.

## And hardware, finally

The other part is hardware, which I love. To get the data, we read it from the dish locally. The dish has a small interface on your own network (gRPC, the same one the official app talks to), and you can ask it for its status and its recent history. So you have to build the device, see how it behaves, collect the data, and then send it somewhere you can query it later.

That small device is what we call Orbimon Edge. Something like a Raspberry Pi sitting next to your Starlink, reading the dish and sending the data.

It sounds simple, but it isn't. If something fails, you have to keep the data stored and retry later. You have to ship updates. Anything with hardware always looked super complicated to me, but also fascinating. I'm an IoT geek at home: a 3D printer, Raspberry Pis here and there, Shelly devices... I've always loved tinkering.

Data and hardware. Right now, those are the two things that attract me most, and Orbimon puts them together.

## Who it's for

So for me it's a chance to keep working on what I love, while solving a real problem. A problem for people like me, with one or two Starlinks, who'd like to see what's happening now, or what happened a year ago. And for companies with hundreds or thousands of Starlinks, who want all of them under control and to know what's going on. Or who want to give their own customers that visibility: fleets, airlines, villages, whatever.

## Why the name

I wanted a name that tied it to satellites, the internet and space. So it had to have something to do with orbits (órbita, in Spanish), because that's where the satellites live. And then something close to an observatory, about observability: a place where you can really see what's going on. A data observatory, a space observatory. Everything connected.

Orbit plus observability. That's more or less where Orbimon comes from.

## Join the beta

Right now I'm looking for 10 people to try Orbimon in beta. If you have a Starlink and want to know what's really happening with it, [join the beta](https://orbimon.com/beta).

🌊🌊🌊🌊
