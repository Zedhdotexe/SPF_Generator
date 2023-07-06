function generateSPF() {
  var domainsInput = document.getElementById("domains").value.trim();
  var ipsInput = document.getElementById("ips").value.trim();
  var includeInput = document.getElementById("include").value.trim();

  // Check if the domains textarea is empty
  if (domainsInput === "") {
    document.getElementById("domains").style.borderColor = "red";
    return; 
  } else {
    document.getElementById("domains").style.borderColor = ""; // Reset the border color
  }

  var domains = domainsInput
    .split("\n")
    .map((domain) => domain.trim())
    .filter((domain) => domain !== "");
  var ips = ipsInput
    .split("\n")
    .map((ip) => ip.trim())
    .filter((ip) => ip !== "");
  var includeDomains = includeInput
    .split("\n")
    .map((include) => include.trim())
    .filter((include) => include !== "");

  var output = domains.join(",");

  if (ips.length > 0) {
    var formattedIPs = ips.map((ip) => "ip4:" + ip);
    output += ',TXT,"v=spf1 ' + formattedIPs.join(" ") + " ";
  }

  if (includeDomains.length > 0) {
    var includeOutput = includeDomains
      .map((include) => "include:" + include)
      .join(" ");
    output += includeOutput + " ";
  }

  output += '-all"';

  var popupOutput = document.getElementById("output");
  popupOutput.textContent = output;

  showPopup();
}

function showPopup() {
  var popup = document.getElementById("popup");
  popup.style.display = "block";
  setTimeout(function () {
    popup.classList.add("show");
  }, 100);
}

function closePopup() {
  var popup = document.getElementById("popup");
  popup.classList.remove("show");
  setTimeout(function () {
    popup.style.display = "none";
  }, 300);
}

function copyOutput() {
  var popupOutput = document.getElementById("output");
  var output = popupOutput.textContent;

  var tempInput = document.createElement("textarea");
  tempInput.value = output;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);

  var copyButton = document.getElementById("copyButton");
  copyButton.textContent = "Copied!";
  setTimeout(function () {
    copyButton.textContent = "Copy to Clipboard";
  }, 2000);
}

function closePopup() {
  var popup = document.getElementById("popup");
  popup.classList.remove("show");
  setTimeout(function () {
    popup.style.display = "none";
    var popupOutput = document.getElementById("output");
    popupOutput.textContent = "";
  }, 300);
}

// Disable Ctrl + U
document.addEventListener('keydown', function(event) {
  if (event.ctrlKey && (event.key === 'u' || event.keyCode === 85)) {
    event.preventDefault();
  }
});

// Disable Ctrl + Shift + I
document.addEventListener('keydown', function(event) {
  if (event.ctrlKey && event.shiftKey && (event.key === 'i' || event.keyCode === 73)) {
    event.preventDefault();
  }
});

// Disable right-click
document.addEventListener('contextmenu', function(event) {
  event.preventDefault();
});

