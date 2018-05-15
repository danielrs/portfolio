---
title: "Botellier"
date: 2018-05-11T21:51:40-05:00
description: A distributed key-value data store.
tags: ['java', 'kotlin', 'db', 'in-memory-db']
weight: 2

projectUrl: https://github.com/danielrs/botellier
---

[kotlin]: https://kotlinlang.org/
[redis]: https://redis.io/
[zookeeper]: https://zookeeper.apache.org/

Botellier is a distributed key-value, in-memory data store written completely in [Kotlin][kotlin]. It aims to imitate the [Redis][redis] API and work as a drop-in replacement for simple cases. This project started out as a learning-only project for practicing distributed systems. I decided to design Botellier after Redis due to its simple and predictable API.

Botellier covers most simple commands that Redis does, and provides a persistent data solution based on segments. The following demo shows some simple usage:

<script src="https://asciinema.org/a/b5yhrwnsu8v4rkna08yoa3wre.js" id="asciicast-b5yhrwnsu8v4rkna08yoa3wre" async></script>

## Difficulties

Working with distributed systems is always hard. So instead of implementing my own consensus algorithm from scratch, I decided to use [ZooKeeper][zookeeper] for my leader election process; in which a leader is selected, along with a synchronized replica and follower replicas.
