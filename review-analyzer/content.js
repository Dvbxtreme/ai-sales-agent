// Content script — scrapes reviews from supported sites

function getAmazonReviews() {
  const reviews = [];
  const selectors = [
    "div[data-hook='review']",
    "div.review",
    ".review-text-content span",
    "[data-hook='review-body'] span"
  ];
  for (const sel of selectors) {
    const els = document.querySelectorAll(sel);
    if (els.length > 0) {
      els.forEach(el => {
        const text = el.innerText?.trim();
        if (text && text.length > 20) reviews.push(text);
      });
      break;
    }
  }
  // Fallback: find any text blocks in the reviews section
  if (reviews.length === 0) {
    const reviewSection = document.getElementById("cm-cr-dp-review-list")
      || document.querySelector("[data-cel-widget='reviews-medley-footer']");
    if (reviewSection) {
      const textBlocks = reviewSection.querySelectorAll("span:not(:has(*))");
      textBlocks.forEach(el => {
        const text = el.innerText?.trim();
        if (text && text.length > 30) reviews.push(text);
      });
    }
  }
  return reviews;
}

function getAllegroReviews() {
  const reviews = [];
  const selectors = [
    "[data-rollup-description]",
    ".review-content",
    "[data-testid='review-content']",
    ".mp5t_ko4_mbf _911b_1h0h"
  ];
  for (const sel of selectors) {
    const els = document.querySelectorAll(sel);
    if (els.length > 0) {
      els.forEach(el => {
        const text = el.innerText?.trim();
        if (text && text.length > 20) reviews.push(text);
      });
      break;
    }
  }
  return reviews;
}

function getEtsyReviews() {
  const reviews = [];
  const selectors = [
    "[data-review-body]",
    ".wt-text-body-01 p",
    ".review-item .wt-text-body"
  ];
  for (const sel of selectors) {
    const els = document.querySelectorAll(sel);
    if (els.length > 0) {
      els.forEach(el => {
        const text = el.innerText?.trim();
        if (text && text.length > 20) reviews.push(text);
      });
      break;
    }
  }
  return reviews;
}

function getShopifyReviews() {
  const reviews = [];
  const selectors = [
    ".review__text",
    ".yotpo-review-content",
    ".ruk-rating-text",
    "[data-review-content]"
  ];
  for (const sel of selectors) {
    const els = document.querySelectorAll(sel);
    if (els.length > 0) {
      els.forEach(el => {
        const text = el.innerText?.trim();
        if (text && text.length > 20) reviews.push(text);
      });
      break;
    }
  }
  return reviews;
}

// Listen for popup request
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "scrape") {
    const hostname = window.location.hostname;
    let reviews = [];

    if (hostname.includes("amazon")) {
      reviews = getAmazonReviews();
    } else if (hostname.includes("allegro")) {
      reviews = getAllegroReviews();
    } else if (hostname.includes("etsy")) {
      reviews = getEtsyReviews();
    } else if (hostname.includes("shopify") || hostname.includes("myshopify")) {
      reviews = getShopifyReviews();
    }

    sendResponse({
      reviews: reviews.slice(0, 30),
      count: reviews.length,
      url: window.location.href,
      product: document.title?.split(":")[0]?.split("|")[0]?.trim() || "Unknown"
    });
  }
});
