const blogFolder = "assets/blog/";
const postContainer = document.getElementById("blog-post");
const listContainer = document.getElementById("blog-list");
const params = new URLSearchParams(window.location.search);
const target = params.get("post");

// Convert filename to readable title (no date assumption)
function formatTitle(filename) {
  return filename
    .replace(/\.md$/, "")              // remove .md extension
    .replace(/[-_]/g, " ")             // replace hyphens/underscores with space
    .replace(/\b\w/g, c => c.toUpperCase()); // capitalize first letter of each word
}

function createLink(title, filename) {
  const link = document.createElement("a");
  link.href = `blog.html?post=${filename}`;
  link.textContent = title;
  link.style.display = "block";
  link.style.marginBottom = "1rem";
  link.style.fontFamily = "Equity Text, serif";
  return link;
}

// === Display specific post if requested ===
if (target) {
  fetch(blogFolder + target)
    .then((res) => {
      if (!res.ok) throw new Error("Post not found");
      return res.text();
    })
    .then((md) => {
      postContainer.innerHTML = marked.parse(md);
      listContainer.style.display = "none";
      postContainer.style.display = "block";
    })
    .catch(() => {
      postContainer.innerHTML = "<p>⚠️ Post not found.</p>";
      listContainer.style.display = "none";
      postContainer.style.display = "block";
    });

// === Otherwise show list of posts ===
} else {
  const apiURL = "https://api.github.com/repos/quinnlly/makedo/contents/assets/blog/";

  fetch(apiURL)
    .then((res) => {
      if (!res.ok) throw new Error("Could not load post list");
      return res.json();
    })
    .then((files) => {
      const mdFiles = files.filter(file => file.name.endsWith(".md"));
      if (mdFiles.length === 0) {
        listContainer.innerHTML = "<p>No blog posts available.</p>";
        return;
      }

      mdFiles.forEach((file) => {
        const title = formatTitle(file.name);
        const link = createLink(title, file.name);
        listContainer.appendChild(link);
      });
    })
    .catch((err) => {
      console.error(err);
      listContainer.innerHTML = "<p>⚠️ Failed to load blog post list.</p>";
    });
}