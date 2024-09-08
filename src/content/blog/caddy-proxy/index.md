---
title: "Caddy Server and Proxy"
date: 2024-09-09

categories: ["tech"]
tags: ["tech", "software", "tools"]
---


> Oh, we open our website. 
> Sometimes it shows the homepage, 
> sometimes only the text `Unauthorized`. 
> Later a bot will be demonized.

[Caddy server](https://caddyserver.com/) is a web server that auto generates SSL certificates (for https).

I used caddy a few months ago to deploy a project. It was a breeze. Caddy can be configured with a Caddyfile, here is an example:

```
example.com { 
  reverse_proxy localhost:3000
}
```

Recently, I deployed another project for a friend where backend and frontend ran on different ports. And the requests to backend all started with `/api`.

Tempted by the dark side, I generated the caddy server config by prompting GPT4. Had I started by either reading the docs or the caddy forum posts, I could have saved a lot of time. 

Whatever Professor GPT generated didn't work on the first try. I "fixed" a few things to get caddy to accept this config as valid:

```
example.com {
  handle /api/* {
    reverse_proxy localhost:3000
  }
  handle /* {
    reverse_proxy localhost:4000
  }
}
```

This did not work.

And it resulted in that weird behavior. Caddy started load balancing between the backend and frontend. It would sometimes call the first port and sometimes the other. 

After double-checking everything else we confirmed Caddy to be the culprit. 

After trying various forum posts and minimalist examples in docs, the solution that is working fine (for now (hopefully)): 

```
example.com {
  @backend {
    path /api /api/*
  }
  handle @backend {
      reverse_proxy localhost:3000
  }
  handle {
      reverse_proxy localhost:4000
  }
}
```

(f ->c u<- k gpt)

