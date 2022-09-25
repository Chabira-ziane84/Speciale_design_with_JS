// check main color in local storage
let mainColors = localStorage.getItem("color-option");
if (mainColors) {
  document.documentElement.style.setProperty("--main-color", mainColors);
  document.querySelectorAll(".setting-box .colors-list li").forEach((ele) => {
    ele.classList.remove("active");
    if (ele.dataset.color === mainColors) ele.classList.add("active");
  });
}
//random background
let randomBackground = true;
// interval random background
let intervalBackground;
// check Background option in local storage
let backgroundOption = localStorage.getItem("background-option");
if (backgroundOption) {
  if (backgroundOption === "false") {
    randomBackground = false;
    document.querySelectorAll(".random-button span").forEach((e) => {
      e.classList.remove("active");
    });
    document.querySelector(".random-button span.no").classList.add("active");
  }
}
// Start setting box
document.querySelector(".setting-box .toggle-setting").onclick = () => {
  // open  the settings
  document.querySelector(".setting-box").classList.toggle("open");
  // rotate setting icon
  document.querySelector(".setting-box .fa-gear").classList.toggle("fa-spin");
};
// switch color
const colorList = document.querySelectorAll(".setting-box .colors-list li");
colorList.forEach((li) => {
  li.onclick = () => {
    document.documentElement.style.setProperty(
      "--main-color",
      li.dataset.color
    );
    localStorage.setItem("color-option", li.dataset.color);
    handleActive(li);
  };
});
// background option
const randomOption = document.querySelectorAll(".random-button span");
randomOption.forEach((span) => {
  span.onclick = () => {
    handleActive(span);
    // check option
    if (span.dataset.random === "yes") {
      if (randomBackground === false) {
        randomBackground = true;
        randomOptBack();
        localStorage.setItem("background-option", true);
      }
    } else {
      if (randomBackground === true) {
        randomBackground = false;
        clearInterval(intervalBackground);
        localStorage.setItem("background-option", false);
      }
    }
  };
});
// check local storage
const bulletsOption = document.querySelectorAll(".bullets-option span");
const Bullets = document.querySelector(".nav-bullets");
let bulletsLocal = localStorage.getItem("bullets-option");
if (bulletsLocal) {
  bulletsOption.forEach((e) => {
    e.classList.remove("active");
    if (bulletsLocal === "block") {
      document
        .querySelector(".bullets-option span.yes")
        .classList.add("active");
      Bullets.style.display = "block";
    } else {
      document.querySelector(".bullets-option span.no").classList.add("active");
      Bullets.style.display = "none";
    }
  });
}
// bullets option
bulletsOption.forEach((span) => {
  span.onclick = () => {
    handleActive(span);
    if (span.dataset.display === "no") {
      Bullets.style.display = "none";
      localStorage.setItem("bullets-option", "none");
    } else {
      Bullets.style.display = "block";
      localStorage.setItem("bullets-option", "block");
    }
  };
});
// reset options
document.querySelector(".setting-box .reset-options").onclick = function () {
  // localStorage.clear();
  localStorage.removeItem("bullets-option");
  localStorage.removeItem("background-option");
  localStorage.removeItem("color-option");
  window.location.reload();
};
// End setting box

// Start change background
let landingPage = document.querySelector(".landing-page");
let imgs = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// function random background
function randomOptBack() {
  if (randomBackground) {
    intervalBackground = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgs.length);
      landingPage.style.backgroundImage = `url("imgs/${imgs[randomNumber]}.jpg")`;
    }, 5000);
  }
}
randomOptBack();

// End change background
// start our skills
let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
  let skillsOfSetTop = ourSkills.offsetTop;
  let skillsOfSetHeight = ourSkills.offsetHeight;
  let windowHeight = this.innerHeight;
  let windowScrollTop = this.pageYOffset;
  if (windowScrollTop > skillsOfSetTop + skillsOfSetHeight - windowHeight) {
    allSkills = document.querySelectorAll(".skill-box .skill-progress span");
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress + "%";
    });
  }
};
// End our skills
// create popup with the image
let ourGallery = document.querySelectorAll(".our-gallery .images img");
ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // add overlay
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);
    // create the popup box
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    // create the heading
    if (img.alt) {
      let imgHeading = document.createElement("h3");
      imgHeading.textContent = img.alt;
      popupBox.appendChild(imgHeading);
    }

    let popupImage = document.createElement("img");
    popupImage.src = img.src;
    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);
    // add close button
    let closeButton = document.createElement("span");
    closeButton.className = "close-button";
    closeButton.textContent = "X";
    popupBox.appendChild(closeButton);
  });
});
// close popup
document.addEventListener("click", function (e) {
  if (e.target.className === "close-button") {
    // document.querySelector(".popup-box").remove();
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
});
// nav bullets
const navBullets = document.querySelectorAll(".nav-bullets .bullet");
// links
const allLinks = document.querySelectorAll(".links");
// function scroll to some section
function scrollToSomeWhere(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollToSomeWhere(navBullets);
scrollToSomeWhere(allLinks);
// function handle active class
function handleActive(ele) {
  ele.parentElement.querySelectorAll(".active").forEach((e) => {
    e.classList.remove("active");
  });
  ele.classList.add("active");
}
// toggle menu
let toggleMenu = document.querySelector(".header-area .toggle-menu");
let tLinks = document.querySelector(".header-area .links");
toggleMenu.onclick = (ev) => {
  ev.stopPropagation();
  tLinks.classList.toggle("open");
  toggleMenu.classList.toggle("menu-active");
};
// // stoop propagation on menu
tLinks.onclick = (ev) => {
  ev.stopPropagation();
};
// remove menu when click anywhere
document.addEventListener("click", (e) => {
  if (e.target !== toggleMenu && e.target !== tLinks) {
    if (tLinks.classList.contains("open")) {
      document.querySelector(".header-area .links").classList.remove("open");
      toggleMenu.classList.remove("menu-active");
    }
  }
});
// document.querySelector(".landing-page .overlay").onclick = () => {
//   document.querySelector(".header-area .links").classList.remove("open");
//   toggleMenu.classList.remove("menu-active");
// };
