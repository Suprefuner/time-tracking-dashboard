"use strict"

// VARIABLES --------------------------------------------------------
const timeContainer = document.querySelector(".timeContainer")
const frequencyItems = document.querySelectorAll(".frequency__item")
let timeframe = "weekly"
let data = ""

// RENDER TIME --------------------------------------------------------
const render = function (data) {
  // generate markup
  const markup = data
    .map((data) => {
      const title = data.title.toLowerCase()
      return `
    <section class="${title}">
        <div class="background-border background-border-${data.title
          .toLowerCase()
          .replace(" ", "-")}"></div>
        <div class="${title}-content content">
          <div class="${title}__header header">
            <h2 class="heading-2">${data.title}</h2>
            <img src="./images/icon-ellipsis.svg" alt="..." class="ellipsis" />
          </div>
          <div class="${title}__duration duration">
            <h4 class="${title}__hour heading-4">${
        data.timeframes[timeframe].current
      } hrs</h4>
            <h6 class="${title}__hour-lastweek heading-6">Last Week - ${
        data.timeframes[timeframe].previous
      } hrs</h6>
          </div>
        </div>
      </section>
    `
    })
    .join("")

  // insert to container element
  timeContainer.insertAdjacentHTML("beforeend", markup)
  timeContainer.style.opacity = "1"
}

// CHANGE TIME FRAME --------------------------------------------------------
const setTimeframe = function () {
  frequencyItems.forEach((item) => item.classList.remove("active"))
  this.classList.add("active")
  timeframe = this.textContent.toLowerCase()

  //rerender container HTML
  timeContainer.innerHTML = ""
  render(data)
}

frequencyItems.forEach((item) => item.addEventListener("click", setTimeframe))

// LOAD DATA --------------------------------------------------------
const loadData = async function () {
  try {
    data = await fetch("./data.json").then((res) => res.json())
    console.log(data)

    render(data)
  } catch (err) {
    console.error(err.message)
  }
}

loadData()
