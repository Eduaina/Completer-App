const componentElements = document.querySelectorAll("[data-import]");

const displayImports = (elements) => {
  for (let element of elements) {
    const importElement = element.getAttribute("data-import");

    fetch(importElement)
      .then((res) => {
        if (!res.ok) {
          throw "Not found";
        }
        return res.text();
      })
      .then((component) => {
        element.innerHTML = component;
        // loadComponentStyles(element);
        loadComponentScripts(element);

        const nestedImports = element.querySelectorAll("[data-import]");
        displayImports(nestedImports);
      })
      .catch(() => {
        element.innerHTML = `<h4>Component not found</h4>`;
      });
  }
}

displayImports(componentElements);


function loadComponentScripts(element) {
  const scripts = element.querySelectorAll("script");
  for (let script of scripts) {
    const newScript = document.createElement("script");
    if (script.src) {
      newScript.src = script.src;
    }
    if (script.textContent) {
      newScript.textContent = script.textContent;
    }
    script.remove();

    element.appendChild(newScript);
  }
}

// function loadComponentStyles(element) {
//   const links = element.querySelectorAll("link[rel='stylesheet']");

//   for (let link of links) {
//     const newLink = document.createElement("link");
//     newLink.rel = "stylesheet";
//     newLink.href = link.href;
//     document.head.appendChild(newLink);
//     link.remove();
//   }
// }

// loadComponentStyles(element);