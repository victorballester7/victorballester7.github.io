---
layout: page
title: Connect 4
description: An AI that plays Connect 4 implemented in C
img: assets/img/connect4/connect4.png
importance: 2
category: work
giscus_comments: true
---

This is a Connect 4 game implemented in C. It uses a <a href="https://en.wikipedia.org/wiki/Minimax">minimax</a> algorithm with <a href="https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning">alpha-beta pruning</a> to play against the user.

The game can be configured to play with different board sizes and different levels of difficulty. In a standard game of Connect 4, that is with a board of 7 columns wide and 6 rows tall, and with the highest difficulty, the AI is beatable, although it is not easy. I am currently working on a version that is unbeatable by implementing functions using bitwise operations to speed up the algorithm.

To play the game just download it from [Github](https://github.com/victorballester7/connect4) and run the executable:

    git clone git@github.com:victorballester7/connect4.git
    cd connect4
    make run

I leave here a few screenshots of the game:

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/connect4/mainmenu.png" title="Main menu" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/connect4/settings_colors.png" title="Color settings menu" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    On the left, the main menu. On the right, the color settings menu.
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/connect4/match_ended.png" title="Full game" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.html path="assets/img/connect4/connect4-green-blue.png" title="Gameplay with special colors" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    A match ended in a win for the AI, on the left. On the right, a game with special colors.
</div>

The algorithm is based on assigning a punctuation to each board of the game. To do that, I iterate over all the tiles of the board and extract the 6 closest tiles in each direction (horizontal, vertical, and both diagonals), apart from the tile itself. Doing it in this way, accounts for all the possibilities of eventually making 4 in a row with that tile.

Then, for each of these strings I assign a value and sum it to the total punctuation of the board, if the tile has the same color as the player who is playing, or subtract it to the total punctuation if it has the color of the other player. Obviously, the values chosen for each string are not arbitrary, and they are based somehow on the intuition of what is a good move and what is not. You can check the details in the function [evaluateNumber](https://github.com/victorballester7/connect4/blob/c79dbccc512fb535da3c656e2a2e7ca90278754f/others/evaluation.c#L230).
