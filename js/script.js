r(function () {
	// VARIABLES

	var details = document.getElementsByClassName("details");
	var main = document.getElementsByTagName("main")[0];
	var toggle = document.createElement("button");
	var header = document.getElementsByTagName("header")[0];

	// FUNCTIONS

	function toggleAria(el) {
		if (el.getAttribute("aria-hidden") === "true") {
			el.setAttribute("aria-hidden", "false");
		} else {
			el.setAttribute("aria-hidden", "true");
		}
	};

	function toggleDetails(trigger) {
		var detail = trigger.nextElementSibling;
		trigger.classList.toggle("open");
		detail.classList.toggle("hidden");
		toggleAria(detail);
	};

	// INIT (run on doc Ready)

	(function hideDetails() {
		document.getElementsByTagName("body")[0].classList.add("js-enabled");
		for (var i = 0; i < details.length; i++) {
			var detail = details[i];
			detail.classList.add("hidden");
			detail.setAttribute("aria-hidden", "true");
			detail.setAttribute("aria-live", "polite");
			detail.previousElementSibling.setAttribute("tabindex", "0");
		};
	})();

	(function initToggle() {
		toggle.type = "button";
		toggle.id = "toggle";
		toggle.className = "checkAll";
		toggle.innerHTML = "Expand all details";
		header.appendChild(toggle);
	})();

	// Event Listeners 

	main.addEventListener("click", function (e) {
		var elt = e.target;
		var isSummary = elt.classList.contains("summary");
		var isDetailsPara = elt.classList.contains("details-para");

		if (isSummary) {
			e.preventDefault();
			toggleDetails(elt);
		} else if (isDetailsPara) {
			e.preventDefault();
		} else {
			return;
		}
	});

	main.addEventListener("keyup", function (e) {
		var active = document.activeElement;
		var isSummary = active.classList.contains("summary");
		var pressEnter = (e.key === "Enter" || e.keyCode === 13);

		if (isSummary && pressEnter) {
			e.preventDefault();
			toggleDetails(active);
		} else {
			return;
		}
	});

	toggle.addEventListener("click", function (e) {
		e.preventDefault();
		this.classList.toggle("toggleActive");
		if (this.classList.contains("toggleActive")) {
			this.innerHTML = "Collapse all details";
			for (var i = 0; i < details.length; i++) {
				var detail = details[i];
				detail.classList.remove("hidden");
				detail.previousElementSibling.classList.add("open");
				detail.setAttribute("aria-hidden", "false");
			};
		} else {
			this.innerHTML = "Expand all details";
			for (var i = 0; i < details.length; i++) {
				var detail = details[i];
				detail.classList.add("hidden");
				detail.previousElementSibling.classList.remove("open");
				detail.setAttribute("aria-hidden", "true");
			};
		};
	});

});
function r(f) { /in/.test(document.readyState) ? setTimeout("r(" + f + ")", 9) : f() }																	