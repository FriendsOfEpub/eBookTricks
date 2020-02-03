r(function () {
	// VARIABLES

	var details = document.querySelectorAll(".details");
	var main = document.querySelector("main");
	var snippets = document.querySelectorAll(".code-snippet");
	var toggle = document.createElement("button");
	var header = document.querySelector("header");
	var nav = document.querySelector("nav");

	var mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
	var noMotion = false;

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

	function scrollTo(element, to, duration) {
		if (duration <= 0) return;
		var difference = to - element.scrollTop;
		var perTick = difference / duration * 10;
		setTimeout(function () {
			element.scrollTop = element.scrollTop + perTick;
			if (element.scrollTop == to) return;
			scrollTo(element, to, duration - 10);
		}, 10);
	};

	function focusNoScroll(el) {
		var x = window.scrollX;
		var y = window.scrollY;
		el.focus();
		window.scrollTo(x, y);
	};

	function getCodeSnippet(button) {
		var parentElement = button.parentElement;
		var codeSnippet = parentElement.querySelector("code");
		return codeSnippet;
	};

	function copyToClipboard(button) {
		var code = getCodeSnippet(button)
		var range = document.createRange();
		range.selectNode(code);
		window.getSelection().addRange(range);

		try {
			document.execCommand("copy");
			var originalLabel = button.textContent;
			button.textContent = "Copied!";

			setTimeout(function () {
				button.textContent = originalLabel;
			}, 3500);
		} catch (err) {
			console.error(err);
		}

		window.getSelection().removeAllRanges();
	};

	function changeMotionHook() {
		if (mediaQuery.matches) {
			noMotion = true;
		} else {
			noMotion = false;
		}
	};

	// INIT (run on doc Ready)

	(function initMotionHook() {
		changeMotionHook();
	})();

	(function hideDetails() {
		document.body.classList.add("js-enabled");
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

	(function initCopy() {
		for (var i = 0; i < snippets.length; i++) {
			var snippet = snippets[i];
			var button = document.createElement("button");
			button.type = button;
			button.textContent = "Copy snippet";
			button.className = "copyButton";
			snippet.appendChild(button);
		}
	})();

	// Event Listeners

	mediaQuery.addListener(changeMotionHook);

	main.addEventListener("click", function (e) {
		var elt = e.target;
		var isSummary = elt.classList.contains("summary");
		var isDetailsPara = elt.classList.contains("details-para");
		var isCopyButton = elt.classList.contains("copyButton");

		if (isSummary) {
			e.preventDefault();
			toggleDetails(elt);
		} else if (isDetailsPara) {
			e.preventDefault();
		} else if (isCopyButton) {
			copyToClipboard(elt);
		} else {
			return;
		}
	});

	main.addEventListener("keydown", function (e) {
		var active = document.activeElement;
		var isSummary = active.classList.contains("summary");
		var isCopyButton = active.classList.contains("copyButton");
		var pressEnter = (e.key === "Enter" || e.keyCode === 13);
		var pressSpacebar = (e.key === "Spacebar" || e.keyCode === 32);

		if (isSummary && (pressEnter || pressSpacebar)) {
			e.preventDefault();
			e.stopImmediatePropagation();
			toggleDetails(active);
		} else if (isCopyButton && (pressEnter || pressSpacebar)) {
			e.preventDefault();
			e.stopImmediatePropagation();
			active.click();
		} else {
			return;
		}
	});

	nav.addEventListener("click", function (e) {
		var elt = e.target;
		var isLink = elt.tagName.toLowerCase() === "a";
		if (isLink && elt.href) {
			if (!noMotion) {
				e.preventDefault();
				var selector = "#" + elt.href.split("#")[1];
				var section = document.querySelector(selector);
				var sectionPadding = window.getComputedStyle(nav).getPropertyValue("height");
				var sectionTop = section.offsetTop - parseInt(sectionPadding, 10);
				scrollTo(document.scrollingElement, sectionTop, 600);
				history.replaceState(undefined, undefined, selector);
				section.setAttribute("tabindex", "-1");
				focusNoScroll(section);
			}
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