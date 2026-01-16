// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// MIT License. See license.txt

// for translation
frappe._ = function (txt, replace, context = null) {
	if (!txt) return txt;
	if (typeof txt != "string") return txt;

	let translated_text = "";

	let key = txt; // txt.replace(/\n/g, "");
	if (context) {
		translated_text = frappe._messages[`${key}:${context}`];
	}

	if (!translated_text) {
		translated_text = frappe._messages[key] || txt;
	}

	if (replace && typeof replace === "object") {
		translated_text = $.format(translated_text, replace);
	}
	return translated_text;
};

window.__ = frappe._;

frappe.get_languages = function () {
	if (!frappe.languages) {
		frappe.languages = [];
		$.each(frappe.boot.lang_dict, function (lang, value) {
			frappe.languages.push({ label: lang, value: value });
		});
		frappe.languages = frappe.languages.sort(function (a, b) {
			return a.value < b.value ? -1 : 1;
		});
	}
	return frappe.languages;
};


// --- INFINITY CHAMELEON ---
try {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === "childList") {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 3) { // Nodo di testo
                        if (node.nodeValue.includes("Frappe Framework")) node.nodeValue = node.nodeValue.replace(/Frappe Framework/g, "Framework");
                    } else if (node.nodeType === 1) { // Elemento HTML
                        // Cerca dentro i workspace title e le card
                        const titles = node.querySelectorAll(".workspace-title, .card-title, .ellipsis");
                        titles.forEach(el => {
                            if (el.innerText.includes("Frappe Framework")) el.innerText = el.innerText.replace(/Frappe Framework/g, "Framework");
                        });
                    }
                });
            }
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });
} catch(e) { console.log("Chameleon error", e); }
