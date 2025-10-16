const images = [
    "https://picsum.photos/id/1015/1200/800",
    "https://picsum.photos/id/1025/800/600",
    "https://picsum.photos/id/1035/600/600",
    "https://picsum.photos/id/1045/900/700",
    "https://picsum.photos/id/1055/700/500",
    "https://picsum.photos/id/1065/1000/750",
];

window.addEventListener("load", (event) => {
    console.log("UI Scripts Loaded");
    const gallery = document.getElementById("gallery");

    images.forEach((url) => {
        const img = document.createElement("img");
        img.src = url;
        gallery.appendChild(img);
    });
});
