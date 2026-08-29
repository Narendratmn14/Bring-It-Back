const form = document.getElementById("retrievalForm");
const photoInput = document.getElementById("photo");
const fileName = document.getElementById("fileName");
const successCard = document.getElementById("successCard");
const requestNumber = document.getElementById("requestNumber");

document.getElementById("year").textContent = new Date().getFullYear();

photoInput.addEventListener("change", () => {
  if (photoInput.files.length > 0) {
    fileName.textContent = photoInput.files[0].name;
  } else {
    fileName.textContent = "PNG, JPG or JPEG";
  }
});

function createRequestId() {
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  return `BIB-${randomNumber}`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const formData = new FormData(form);

  const request = {
    id: createRequestId(),
    itemName: formData.get("itemName"),
    description: formData.get("description"),
    placeType: formData.get("placeType"),
    placeName: formData.get("placeName"),
    pickupLocation: formData.get("pickupLocation"),
    deliveryLocation: formData.get("deliveryLocation"),
    landmark: formData.get("landmark"),
    customerName: formData.get("customerName"),
    phone: formData.get("phone"),
    status: "Request submitted",
    createdAt: new Date().toISOString()
  };

  // Temporary browser storage.
  // Later this will be replaced with a real backend/database.
  localStorage.setItem("bringItBackRequest", JSON.stringify(request));

  requestNumber.textContent = request.id;
  form.closest(".request-layout").classList.add("hidden");
  document.querySelector(".request-header").classList.add("hidden");
  successCard.classList.remove("hidden");

  window.scrollTo({ top: 0, behavior: "smooth" });
});
