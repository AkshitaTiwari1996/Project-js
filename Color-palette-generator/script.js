const generateBtn = document.getElementById("generate-btn");
const paletteContainer = document.querySelector(".palette-container");

generateBtn.addEventListener("click", generatePalette);

// Event delegation for all copy buttons inside paletteContainer
paletteContainer.addEventListener("click", function (e) {
    const copyBtn = e.target.closest(".copy-btn");
    if (!copyBtn) return; // clicked somewhere else

    const hexValue = copyBtn.previousElementSibling.textContent.trim();

    navigator.clipboard.writeText(hexValue)
        .then(() => showCopySuccess(copyBtn))
        .catch((err) => console.error("Failed to copy: ", err));
});

function showCopySuccess(copyBtn) {
    // assume initial icon is "far fa-copy"
    copyBtn.classList.remove("fa-copy");
    copyBtn.classList.add("fa-check");
    copyBtn.style.color = "#48bb78";

    setTimeout(() => {
        copyBtn.classList.remove("fa-check");
        copyBtn.classList.add("fa-copy");
        copyBtn.style.color = "";
    }, 1500);
}

function generatePalette() {
    const colors = [];

    for (let i = 0; i < 5; i++) {
        colors.push(generateRandomColor());
    }

    updatePaletteDisplay(colors);
}

function generateRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function updatePaletteDisplay(colors) {
    const colorBoxes = document.querySelectorAll(".color-box");

    colorBoxes.forEach((box, index) => {
        const color = colors[index];
        const colorDiv = box.querySelector(".color");
        const hexValue = box.querySelector(".hex-value");

        colorDiv.style.backgroundColor = color;
        hexValue.textContent = color;
    });
}

// generate initial palette on load
generatePalette();
