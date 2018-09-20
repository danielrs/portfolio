---
title: "gom"
date: 2018-05-11T21:50:30-05:00
description: API mocking and data server.
tags: ['go', 'api', 'generator']
weight: 3

githubUser: danielrs
githubRepo: gom
---

When working in a new project, back-end and front-end developers often go hand in hand; even more if the front-end of the application makes heavy use of the API that back-end developers take care of. For simple applications, this is often not a problem, as the front-end developers just wait for the API updates and modify their side of the application accordingly.

{{< img src="sequence1.svg" title="sequence 1" img-class="img--50" >}}

For bigger applications, the usual worflow is to make sure to design a good API specification that both the back-end and front-end developers need to follow. However, the real-time interaction with the API is affected, as any changes may take longer to be committed.

**Go** **M**ocking is a tool for API mocking and dummy data server that uses RAML (Rest API Modelling Language) for setup. The idea is to **de-couple** back-end and front-end development by allowing back-end developers to define and API that front-end developers can use while the real, full-featured API is being created. The following diagram shows the process when *gom* is involved:

{{< img src="sequence2.svg" title="sequence 2" img-class="img--75" >}}

The current scope of *gom* is to just mock an API an serve dummy data, however, the current design creates an *Abstract Syntax Tree* (AST) of the API specification; which could allow for code generation in the future.
