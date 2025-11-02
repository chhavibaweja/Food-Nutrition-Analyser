// === Modal Elements ===
const getStartedBtn = document.getElementById("getStartedBtn");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const analyzeBtn = document.getElementById("analyzeBtn");
const foodInput = document.getElementById("foodInput");
const resultCard = document.getElementById("resultCard");
const newFoodBtn = document.getElementById("newFoodBtn");

// --- Open modal ---
getStartedBtn.addEventListener("click", () => {
  modal.style.display = "flex";
  resultCard.style.display = "none";
  foodInput.value = "";
});

// --- Close modal ---
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// --- Handle Analyze ---
analyzeBtn.addEventListener("click", async () => {
  const food = foodInput.value.trim();
  if (!food) {
    alert("Please enter a food name!");
    return;
  }

  // Show loading state
  resultCard.style.display = "block";
  resultCard.innerHTML = "<p>Analyzing... please wait 🍽️</p>";

  try {
    const response = await fetch("/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ food }),
    });

    const data = await response.json();

    if (data.error) {
      resultCard.innerHTML = `<p style="color:red;">Error: ${data.error}</p>`;
      return;
    }

    // Display result
    resultCard.innerHTML = `
      <h3>${food.charAt(0).toUpperCase() + food.slice(1)}</h3>
      <p>🔥 Calories: <strong>${data.calories || "N/A"}</strong></p>
      <p>🍗 Protein: <strong>${data.protein || "N/A"}</strong></p>
      <p>🥖 Carbs: <strong>${data.carbs || "N/A"}</strong></p>
      <p>🥑 Fat: <strong>${data.fat || "N/A"}</strong></p>
    `;

    newFoodBtn.style.display = "inline-block";
  } catch (err) {
    console.error("Error:", err);
    resultCard.innerHTML = `<p style="color:red;">Something went wrong. Please try again!</p>`;
  }
});

// --- Analyze another food ---
newFoodBtn.addEventListener("click", () => {
  foodInput.value = "";
  resultCard.style.display = "none";
});
