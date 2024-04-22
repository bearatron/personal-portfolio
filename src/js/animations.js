gsap.from(".navlink", {
  opacity: 0,
  y: "20px",
  duration: 1,
  ease: "power4.out",
  stagger: 0.1,
});

gsap.from(".hero__animation", {
  opacity: 0,
  y: "20px",
  duration: 1,
  ease: "power4.out",
  stagger: 0.1,
});

let anim = gsap.to(".button", { scale: 1.02, duration: 0.2, paused: true });

let btn = document.querySelector(".button");
btn.addEventListener("mouseenter", () => {
  anim.play();
});

btn.addEventListener("mouseout", () => {
  anim.reverse();
});
