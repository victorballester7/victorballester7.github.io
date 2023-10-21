---
layout: page
permalink: /complete-summarie/
title: Notes in Mathematics
nav: true
nav_order: 4
description: This website intends to summarize some notes about each "important" subject in Mathematics and Physics degree at Autonomous University of Barcelona (UAB) and at Paris Dauphine - PSL University.
toc:
  sidebar: left
---

## Mathematics

{% if site.data.complete-summaries.mathematics %}
{% assign sorted = site.data.complete-summaries.mathematics | sort: 'order' %}
{% for subject in sorted %}
<a href="https://github.com/victorballester7/complete-summaries/releases/latest/download/{{ subject.file }}" class="btn btn--primary">{{ subject.name }}</a>
{% endfor %}
{% else %}

<p>There are no notes yet.</p>
{% endif %}
