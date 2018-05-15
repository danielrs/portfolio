---
title: "gom"
date: 2018-05-11T21:50:30-05:00
description: API mocking and data server.
tags: ['go', 'api', 'generator']
weight: 1

projectUrl: https://github.com/danielrs/gom
---

Go Mocking is a tool for API mocking and dummy data server that uses RAML (Rest API Modelling Language) for setup. The idea is to **de-couple** back-end and front-end development by allowing back-end developers to define and API that front-developers can use while the real full-featured one is being created:

{{< img src="sequence1.svg" title="sequence 1" img-class="img--50" >}}

The previous sequence diagram shows the synchronous collaboration between back-end and front-end developers. Using *gom*, back-end developers can create an API definition that *gom* uses to create a mock API that front-end developers can use, removing the direct synchronicity between them.

{{< img src="sequence2.svg" title="sequence 2" img-class="img--75" >}}

this setup allows for faster prototyping and develpment of both parties.
