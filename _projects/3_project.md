---
layout: page
title: Spacecraft Trajectory Propagation
description: Numerical propagation of trajectories of Earth-orbiting spacecraft
img: assets/img/satellites/iss.jpg
# redirect: https://unsplash.com
importance: 3
category: work
---

This was my final bachelor's project at the Autonomous University of Barcelona. I worked on it under the supervision of <a href="http://www.gsd.uab.es/people?controller=member&view=member&id=9&slug=josep-maria">Prof. J. M. Mondelo</a>.

The goal of this work was to give quantitative insight in the effect that the perturbations to the Keplerian approximation have on the trajectories of Earth-orbiting spacecraft. Here I only give a brief summary of the work. You can find all the code used and the report in my [Github](https://github.com/victorballester7/final-bachelor-thesis).

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/satellites/ISS_pointMass_comparison.jpg" title="iss 1" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/satellites/ISS.jpg" title="iss 2" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Plots concering the orbit of the ISS (a Low-Earth-Orbit satellite). On the left, the comparison of the errors in the position of the ISS when using the point mass approximation and the full model used in this work. On the right, the orbit of the ISS using the geopotential model with and without the effect of the atmospheric drag.
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/satellites/GALILEO_pointMass_comparison.jpg" title="galileo 1 image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/satellites/GALILEO.jpg" title="galileo 2" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Plots concering the orbit of the Galileo satellite (a Medium-Earth-Orbit satellite). On the left, the comparison of the errors in the position of the Galileo satellite when using the point mass approximation and the full model used in this work. On the right, the orbit of the Galileo satellite using the geopotential model and the different perturbations: Moon, Sun and solar radiation pressure.
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/satellites/SIRIUS.jpg" title="sirius" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/satellites/TDRS-3.jpg" title="tdrs-3" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    On the right, the orbit of the Sirius satellite (a Medium-Earth-Orbit satellite) using the geopotential model and the different perturbations: Moon, Sun and solar radiation pressure. On the right, the orbit of the TDRS-3 satellite (a Geostationary satellite) using the geopotential model and the different perturbations: Moon, Sun and solar radiation pressure. 
</div>
