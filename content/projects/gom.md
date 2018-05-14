---
title: "Gom"
date: 2018-05-11T21:50:30-05:00
description: API mocking and data server.
tags: ['go', 'api', 'generator']
weight: 1

projectUrl: https://github.com/danielrs/gom
---

Go Mocking is a tool for API mocking and dummy data server that uses RAML (Rest API Modelling Language) for setup. The idea is to **de-couple** back-end and front-end development by allowing back-end developers to define and API that front-developers can use while the real full-featured one is being created.

Of course, the usual way to do it is first design and create an API specification that allows developers to work at the same time. However, *gom* allows for an early working API that helps to further refine and tests components that will interact with the real API.

This is currently a work in progress, however, the RAML parser and compiler is working. The data generation and API emulation is being developed.
