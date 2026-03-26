
// sliders pada 
const banyumasGsapTrack = document.getElementById("banyumasGsapSliderTrack")
const banyumasGsapNext = document.getElementById("banyumasGsapNextBtn")
const banyumasGsapPrev = document.getElementById("banyumasGsapPrevBtn")

let banyumasGsapIndex = 0
const banyumasGsapTotal = 3

function banyumasGsapMoveSlide() {

    gsap.to(banyumasGsapTrack, {
        x: -(banyumasGsapIndex * 100) + "%",
        duration: 0.8,
        ease: "power3.inOut"
    })

}

banyumasGsapNext.onclick = () => {
    banyumasGsapIndex++

    if (banyumasGsapIndex >= banyumasGsapTotal) {
        banyumasGsapIndex = 0
    }

    banyumasGsapMoveSlide()
}

banyumasGsapPrev.onclick = () => {
    banyumasGsapIndex--

    if (banyumasGsapIndex < 0) {
        banyumasGsapIndex = banyumasGsapTotal - 1
    }

    banyumasGsapMoveSlide()
}

/* auto slider */
setInterval(() => {

    banyumasGsapIndex++

    if (banyumasGsapIndex >= banyumasGsapTotal) {
        banyumasGsapIndex = 0
    }

    banyumasGsapMoveSlide()

}, 4000)