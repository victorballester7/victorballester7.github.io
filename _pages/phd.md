---
layout: page
permalink: /phd/
title: PhD diary
nav: true
nav_order: 4
description:
toc:
  sidebar:
---

<body>
  <div id="app"></div>

  <script>
    // Docsify Configuration (see https://docsify.js.org/#/configuration)
    window.$docsify = {
      name: 'Simple Docsify Template',

      // Sidebar Configuration
      auto2top: true,
      loadSidebar: true,
      maxLevel: 0,
      // Set subMaxLevel to 0 to remove automatic display of page table of contents (TOC) in Sidebar
      subMaxLevel: 3,

      // Search Plugin Configuration
      search: {
        placeholder: 'Type to search',
        noData: 'No matches found.',
        // Headline depth, 1 - 6
        depth: 2,
      }
    };
  </script>

  <!-- Required -->
  <script src="https://cdn.jsdelivr.net/npm/docsify@4/lib/docsify.min.js"></script>

  <!-- Recommended -->
  <script src="https://cdn.jsdelivr.net/npm/docsify@4/lib/plugins/zoom-image.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/docsify@4/lib/plugins/search.js"></script>

</body>
</html>
