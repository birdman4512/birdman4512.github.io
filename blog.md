---
title: Blog
description: "Writeups and tinkering notes from Dean Bird (VK4DSB) on amateur radio, DFIR/security tooling, and AI projects."
---

# Blog

Writeups, tinkering notes, and other things worth keeping a date stamp on.

Subscribe via [RSS]({{ "/feed.xml" | relative_url }}).

---

{% for post in site.posts %}
- **{{ post.date | date: "%Y-%m-%d" }}** — [{{ post.title }}]({{ post.url | relative_url }})
{% else %}
*No posts yet.*
{% endfor %}

---
Return to [home](index.html)
