---
layout: page
title: n-body Problem
description: Numerical simulation of the n-body problem
img: assets/img/n-body/title.png
importance: 1
category: fun
# related_publications: einstein1956investigations, einstein1950meaning

# add this at the end of the file (not does not work)
# <div class="row mt-3">
#     <div class="col-sm mt-3 mt-md-0">
#         {% include video.html path="assets/video/n-body/10_3d.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true %}
#     </div>
# </div>
# <div class="caption">
#     10 bodies with random initial conditions in 3D.
# </div>
---

This project aims to solve the n-body problem numerically. The n-body problem is the problem of predicting the motion of a group of celestial objects that interact with each other gravitationally. I give below some examples of the results obtained with this code.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/video/n-body/figure8.gif" title="figure 8" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Classical periodic solution of the 3-body problem. The three bodies follow a figure-8 trajectory.
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/video/n-body/20_random.gif" title="20 random" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    20 bodies with random initial conditions.
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/video/n-body/solar_rocky.gif" title="solar rocky" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    A simulation of the solar system with only the rocky planets during the period of 1.5 years.
</div>
