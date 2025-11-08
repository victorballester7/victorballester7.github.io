async function includeHTML(id, file) {
  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error(`Failed to fetch ${file}`);
    const html = await response.text();
    document.getElementById(id).innerHTML = html;

    // if id == header, activate the correct class active or not, otherwise skip this
    if (id == "header") {
      activateHeaderLink();
    }
  } catch (err) {
    console.error(err);
  }
}

async function activateHeaderLink() {
  const currentPath = window.location.pathname.replace(/\/$/, ""); // sin barra final
  document.querySelectorAll("#header nav a").forEach((link) => {
    const linkPath = link.getAttribute("href").replace(/\/$/, "");
    if (linkPath === currentPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

