const { projects = [], experiences = [] } = window.homepageData || {};

function initialsFallback(project) {
  const fallback = document.createElement("span");
  fallback.textContent = project.initials || project.name.slice(0, 2).toUpperCase();
  return fallback;
}

function projectIcon(project) {
  const icon = document.createElement("span");
  icon.className = "project-icon image-slot";

  if (!project.icon) {
    icon.append(initialsFallback(project));
    return icon;
  }

  const image = new Image();
  image.src = project.icon;
  image.alt = `${project.name} icon`;
  image.onerror = () => {
    icon.replaceChildren(initialsFallback(project));
  };

  icon.append(image);
  return icon;
}

function renderProjects() {
  const grid = document.querySelector("#project-grid");
  if (!grid) return;

  projects.forEach((project) => {
    const card = document.createElement(project.link ? "a" : "article");
    card.className = project.link ? "project-card" : "project-card project-card-static";

    if (project.link) {
      card.href = project.link;
      card.target = "_blank";
      card.rel = "noreferrer";
    } else {
      card.setAttribute("aria-label", `${project.name} project, link coming soon`);
    }

    const content = document.createElement("span");
    content.className = "project-content";

    const name = document.createElement("strong");
    name.textContent = project.name;

    const description = document.createElement("span");
    description.textContent = project.description;

    content.append(name, description);
    card.append(projectIcon(project), content);

    const marker = document.createElement("span");
    marker.className = project.link ? "project-arrow" : "project-status";
    marker.setAttribute("aria-hidden", project.link ? "true" : "false");
    marker.innerHTML = project.link ? "&nearr;" : project.status || "Coming soon";
    card.append(marker);

    grid.append(card);
  });
}

function renderExperiences() {
  const grid = document.querySelector("#experience-grid");
  if (!grid) return;

  experiences.forEach((experience) => {
    const section = document.createElement("section");
    section.className = "experience-section";

    const heading = document.createElement("h2");
    heading.textContent = experience.label;

    const card = document.createElement("article");
    card.className = "mini-card";

    const label = document.createElement("span");
    label.className = "mini-label";
    label.textContent = experience.label;

    const title = document.createElement("strong");
    title.textContent = experience.title;

    const description = document.createElement("p");
    description.textContent = experience.description;

    card.append(label, title, description);
    section.append(heading, card);
    grid.append(section);
  });
}

function setupPortraitFallback() {
  const portrait = document.querySelector(".portrait-frame img");
  if (!portrait) return;

  portrait.addEventListener(
    "error",
    () => {
      portrait.src = "./assets/profile.svg";
    },
    { once: true }
  );
}

function setupProjectMotion() {
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 6;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * -6;

      card.style.transform = `translateY(-4px) rotateX(${y}deg) rotateY(${x}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

renderProjects();
renderExperiences();
setupPortraitFallback();
setupProjectMotion();
