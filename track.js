const trackForm = document.getElementById("trackForm");
const trackResult = document.getElementById("trackResult");

trackForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const enteredId = document.getElementById("trackId").value.trim().toUpperCase();
  const savedRequest = JSON.parse(localStorage.getItem("bringItBackRequest") || "null");

  if (!savedRequest || savedRequest.id !== enteredId) {
    trackResult.classList.remove("hidden");
    trackResult.innerHTML = `
      <div class="result-top">
        <h2>Request not found</h2>
      </div>
      <div class="result-item">
        <p>We couldn't find a request with ID <strong>${enteredId}</strong> on this browser.</p>
        <p style="margin-top:8px;">If you just created a request, use the Request ID shown after submission.</p>
      </div>
    `;
    return;
  }

  trackResult.classList.remove("hidden");
  trackResult.innerHTML = `
    <div class="result-top">
      <h2>Retrieval Request</h2>
      <span class="result-id">${savedRequest.id}</span>
    </div>

    <div class="result-item">
      <p>Item</p>
      <strong>${savedRequest.itemName}</strong>
      <p style="margin-top:10px;">Pickup: ${savedRequest.placeName}</p>
      <p>Delivery: ${savedRequest.deliveryLocation}</p>
    </div>

    <div class="timeline">
      <div class="timeline-row">
        <span class="timeline-dot active"></span>
        <p><strong>Request submitted</strong><br>Your retrieval request has been received.</p>
      </div>
      <div class="timeline-row">
        <span class="timeline-dot"></span>
        <p><strong>Delivery partner assigned</strong><br>Waiting for assignment.</p>
      </div>
      <div class="timeline-row">
        <span class="timeline-dot"></span>
        <p><strong>Item collected</strong><br>Your partner will collect the item.</p>
      </div>
      <div class="timeline-row">
        <span class="timeline-dot"></span>
        <p><strong>Out for delivery</strong><br>Your item is on its way.</p>
      </div>
      <div class="timeline-row">
        <span class="timeline-dot"></span>
        <p><strong>Delivered</strong><br>Your item has been returned to you.</p>
      </div>
    </div>
  `;
});
