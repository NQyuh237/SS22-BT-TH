const form = document.getElementById("form");
const list = document.getElementById("list");

const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

function renderBookmarks() {
    list.innerHTML = "";

    for (let bookmark of bookmarks) {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.textContent = bookmark.name;
        a.href = bookmark.url;
        a.target = "_blank";
        let button = document.createElement("button");
        button.textContent = "Delete";

        button.addEventListener("click", function () {
            let index = bookmarks.indexOf(bookmark);
            bookmarks.splice(index, 1);

            localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

            renderBookmarks();
        });

        li.appendChild(a);
        li.appendChild(button);
        list.appendChild(li);
    }
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let url = document.getElementById("url").value;

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        alert("Please enter a valid URL");
        return;
    }

    let bookmark = { name, url };

    bookmarks.push(bookmark);

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    renderBookmarks();

    form.reset();
});

renderBookmarks();