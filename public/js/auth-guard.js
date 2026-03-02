// ============================================================
//  Auth Guard — included on every protected page.
//  Redirects unauthenticated users to the login page.
//  Also checks that the member's status is "approved".
// ============================================================

(function () {
  auth.onAuthStateChanged(async function (user) {
    if (!user) {
      window.location.href = "index.html";
      return;
    }

    // Admin emails bypass the status check
    if (isAdmin(user.email)) {
      initPage(user);
      return;
    }

    try {
      const snap = await db.collection("members").doc(user.uid).get();
      if (!snap.exists) {
        await auth.signOut();
        window.location.href = "index.html?msg=no-account";
        return;
      }

      const data = snap.data();

      if (data.status === "pending") {
        await auth.signOut();
        window.location.href = "index.html?msg=pending";
        return;
      }

      if (data.status === "rejected") {
        await auth.signOut();
        window.location.href = "index.html?msg=rejected";
        return;
      }

      initPage(user);
    } catch (err) {
      console.error("Auth guard error:", err);
      window.location.href = "index.html";
    }
  });
})();

// Helpers available to all protected pages
function buildNav(user) {
  const adminLink = isAdmin(user.email)
    ? `<a href="admin.html">Admin</a>`
    : "";

  return `
    <nav class="main-nav" id="main-nav">
      <a href="dashboard.html" class="${activePage("dashboard")}">Home</a>
      <a href="blog.html"      class="${activePage("blog")}">Blog</a>
      <a href="calendar.html"  class="${activePage("calendar")}">Calendar</a>
      <a href="gallery.html"   class="${activePage("gallery")}">Gallery</a>
      ${adminLink}
      <button class="nav-logout" onclick="signOut()">Sign Out</button>
    </nav>
    <button class="hamburger" id="hamburger" onclick="toggleNav()">
      <span></span><span></span><span></span>
    </button>
  `;
}

function activePage(name) {
  return window.location.pathname.includes(name) ? "active" : "";
}

function signOut() {
  auth.signOut().then(() => { window.location.href = "index.html"; });
}

function toggleNav() {
  document.getElementById("main-nav").classList.toggle("open");
}
