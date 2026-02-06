(() => {
  const loadIncludes = async () => {
    const includeNodes = Array.from(document.querySelectorAll("[data-include]"));
    await Promise.all(
      includeNodes.map(async (node) => {
        const path = node.getAttribute("data-include");
        if (!path) {
          return;
        }
        const response = await fetch(path);
        if (!response.ok) {
          node.textContent = "Content failed to load.";
          return;
        }
        node.innerHTML = await response.text();
      })
    );

    const needsStripe = document.querySelector("stripe-buy-button");
    const stripeLoaded = document.querySelector('script[src="https://js.stripe.com/v3/buy-button.js"]');
    if (needsStripe && !stripeLoaded) {
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://js.stripe.com/v3/buy-button.js";
      document.body.appendChild(script);
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadIncludes);
  } else {
    loadIncludes();
  }
})();
