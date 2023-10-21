---
layout: page
permalink: /complete-summaries/
title: Notes in Mathematics
nav: true
nav_order: 4
description:
toc:
  sidebar:
---

<div class="post-description">
  <p>This website intends to summarize some notes about each "important" subject in Mathematics and Physics degree at Autonomous University of Barcelona (UAB) and at Paris Dauphine - PSL University. These summaries aim to provide a concise overview of the key concepts and topics covered in each subject, serving as a helpful resource for students and anyone interested in these fields of study.</p>
  <p>You can download the sections separately as you like or the whole file of Mathematics (better in order to avoid linking errors).</p>
</div>

{% if site.data.complete_summaries.areas %}

{% for area in site.data.complete_summaries.areas %}

<h2>{{ area.name }}</h2>
{% if area.name == "Mathematics" %}
<p>Full summaries of <a href="https://github.com/victorballester7/Complete-summaries/releases/latest/download/main_math.pdf" target="_top">Mathematics</a>.</p>
{% endif %}
{% for year in area.years %}
<h4>{{ year.name }}</h4>
<ul>
{% for subject in year.subjects %}
{% assign filename = subject | replace: ' ', '_' %}
  <li><a href="https://github.com/victorballester7/complete-summaries/releases/latest/download/{{ filename }}.pdf">{{ subject }}</a></li>
{% endfor %}
</ul>
{% endfor %}
{% endfor %}
{% endif %}
