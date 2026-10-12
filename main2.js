
const sleep = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms));

async function fetchData() {
    try {
        const response = await fetch("input.json");
        const data = await response.json();

        Object.keys(data).forEach(key => {
            const element = document.getElementById(key);
            if (element && data[key] !== "") {
                element.innerText = data[key];
            }
        });

        const ids = [
            "greetings","greetingText", "greetingText1", "greetingText2",
            "greetingText3", "greetingText4", "greetingText5",
            "greetingText6", "greetingText7"
        ];

        
        for (const id of ids) {
            const element = document.getElementById(id);

            if (element && data[id]) {
                // Show the current message
                element.classList.remove("hide");
                element.classList.add("show");

                // Keep it visible for 3 seconds
                await sleep(4000);

                // Hide the current message
                element.classList.remove("show");
                element.classList.add("hide");

                // Wait for the exit animation to finish
                await sleep(700);

                // Prepare it for later
                element.classList.remove("hide");
                element.style.visibility = "hidden";
            }
        }


        // Show the birthday wish after all messages
        await sleep(1000);

        // Show the birthday wish after all messages
        const balloonContainer = document.getElementById("balloon-container");

        if (balloonContainer) {
            balloonContainer.style.display = "block";
        }

        document.querySelector(".wish-hbd")
            ?.classList.add("animate__animated", "animate__fadeInUpBig");

        document.querySelector(".wishText")
            ?.classList.add("animate__animated", "animate__fadeIn");

    } catch (error) {
        console.error("Error loading input.json:", error);
    }
}

function random(num) {
    return Math.floor(Math.random() * num);
}

function getRandomStyles() {
    const r = random(255);
    const g = random(255);
    const b = random(255);
    const dur = random(5) + 5;

    return `
        background-color: rgba(${r},${g},${b},0.7);
        color: rgba(${r},${g},${b},0.7);
        box-shadow: inset -7px -3px 10px rgba(${r},${g},${b},0.5);
        margin: ${random(200)}px 0 0 ${random(50)}px;
        animation: float ${dur}s ease-in infinite;
    `;
}

function createBalloons(num) {
    const container = document.getElementById("balloon-container");
    if (!container) return;

    for (let i = 0; i < num; i++) {
        const balloon = document.createElement("div");
        balloon.className = "balloon";
        balloon.style.cssText = getRandomStyles();
        container.appendChild(balloon);
    }
}

window.addEventListener("load", () => createBalloons(50));

function refreshPage() {
    window.location.reload();
}

fetchData();
