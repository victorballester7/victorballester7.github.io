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

{% if site.data.complete_summaries.mathematics %}

<p>Full summaries of <a href="https://github.com/victorballester7/Complete-summaries/releases/latest/download/main_math.pdf" target="_top">Mathematics</a>.</p>
{% for year in site.data.complete_summaries.mathematics %}
<h4>{{ year.name }}</h4>
<ul>
{% for subject in year.subjects %}
{% assign filename = subject | replace: ' ', '_' %}
  <li><a href="https://github.com/victorballester7/complete-summaries/releases/latest/download/{{ filename }}.pdf">{{ subject }}</a></li>
{% endfor %}
</ul>
{% endfor %}
{% endif %}

## Physics

{% if site.data.complete_summaries.physics %}
{% for year in site.data.complete_summaries.physics %}

<h4>{{ year.name }}</h4>
<ul>
{% for subject in year.subjects %}
{% assign filename = subject | replace: ' ', '_' %}
  <li><a href="https://github.com/victorballester7/complete-summaries/releases/latest/download/{{ filename }}.pdf"> {{ subject }}</a></li>
{% endfor %}
</ul>
{% endfor %}
{% endif %}
