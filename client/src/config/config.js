export const navbarBrand = "News";
export const header = (category) => `Top ${category} Headlines`;
export const navs = [
    { nav: "Home", page: "/" },
    { nav: "General", page: "/general" },
    { nav: "Business", page: "/business" },
    { nav: "Science", page: "/science" },
    { nav: "Sports", page: "/sports" },
    { nav: "Health", page: "/health" },
    { nav: "Technology", page: "/technology" },
    { nav: "Entertainment", page: "/entertainment" }
]

export const router = [
    { path: "/", key: "general", category: "general", country: "us" },
    { path: "/general", key: "general", category: "general", country: "us" },
    { path: "/business", key: "business", category: "business", country: "us" },
    { path: "/sports", key: "sports", category: "sports", country: "us" },
    { path: "/science", key: "science", category: "science", country: "us" },
    { path: "/health", key: "health", category: "health", country: "us" },
    { path: "/entertainment", key: "entertainment", category: "entertainment", country: "us" },
    { path: "/technology", key: "technology", category: "technology", country: "us" }
]

export const summary = "Author, Channel and Date";
export const author = (author) => `Author: ${!author ? "Unknown" : author}`;
export const channel = (channel) => `Channel: ${channel}`;
export const lastUpdate = (date) => `Last updated: ${new Date(date).toGMTString()}`;

export const API_KEY = "664d63431bcd4a76a66bb44e0cca55db";