const START_DATE = new Date('2025-12-05T19:00:00').getTime();
const END_DATE = new Date('2025-12-14T06:00:00').getTime();

const FACT_START_DATE = new Date('2025-12-08T21:00:00').getTime();
const FACT_INTERVAL = 10 * 60 * 60 * 1000; // 10 hours

const FACTS = [
    { title: "Dance-for-life — albatross devotion", body: "Albatrosses don’t just choose a partner; they dance their way into a bond. Their sky-and-ground rituals are so intricate and unmistakably theirs that when they reunite each year, it’s like returning to a love that has its own choreography." },
    { title: "Tiny voles, huge devotion — prairie voles", body: "Prairie voles are tiny, but their loyalty is huge. They pick each other, stay together, raise their little families side by side, and even their brains wire them closer — nature’s soft, steadfast romantics." },
    { title: "Love duets — gibbons", body: "Every morning, gibbon pairs sing duets with almost perfect timing. It’s their way of saying, “I’m here, I’m yours, we’re a team,” turning each sunrise into a love song." },
    { title: "Architects of romance — bowerbirds", body: "Male bowerbirds win hearts by building art. They gather colors, arrange decorations, and craft little galleries of beauty — like someone curating a perfect surprise just to make someone smile." },
    { title: "Synchronized swans — elegant partnerships", body: "Swans move together so gracefully that their courtship looks like a dance meant only for two. Paired swans glide, preen, and curve their necks around each other — gestures of a bond that often lasts for years." },
    { title: "Two-man choreography — long-tailed manakins", body: "Some manakins pull off an incredible two-man show: two males dancing in perfect sync, flipping and hopping to impress a watching female. It’s pure coordination and trust — a love story with choreography." },
    { title: "Egg-warming devotion — emperor penguins", body: "Emperor penguin fathers stand through brutal Antarctic storms with the egg balanced on their feet, fasting for weeks. It’s a quiet, unwavering promise: “Protecting our future is worth everything.”" },
    { title: "Beak-to-beak billing — puffins", body: "Puffins greet their partners by gently tapping beaks. It’s simple, tender — a little bird kiss that says, “I’m happy we found each other again.”" },
    { title: "Named for love — lovebirds", body: "Lovebirds really live up to the name. They cuddle, preen, feed each other, and often stay inseparable for life — tiny, feathery proofs that devotion can be loud, bright, and adorable." },
    { title: "Dancing cranes — lifelong leaps", body: "Cranes build connection by dancing — leaping, bowing, flapping with such enthusiasm that their whole bodies become a celebration. Many pair for life, and every dance is a renewal of that promise." },
    { title: "Partners who parent — wolves", body: "Wolves show love in teamwork. The alpha pair sticks close, nuzzles often, and raises their pups surrounded by family support — partnership as the heartbeat of the pack." },
    { title: "Courtship feeding — a tender promise", body: "Many birds woo by offering food — a small, sweet gesture that says, “I’ll take care of you, and I want to share what I have.”" },
    { title: "Elephant greetings — trunks entwined", body: "Elephants reunite with soft rumbles and tangled trunks. It looks exactly like a warm, all-encompassing hug — the kind that says, “I missed you.”" }
];

// DOM Elements
const progressBar = document.querySelector('.progress-bar');
const dino = document.querySelector('.dino');
const percentageText = document.querySelector('.percentage');
const message = document.querySelector('.message');
const factContainer = document.querySelector('.fact-container');
const factTitle = document.querySelector('.fact-title');
const factBody = document.querySelector('.fact-body');

// GSAP Timelines
const walkTimeline = gsap.timeline({ repeat: -1, paused: true });
walkTimeline.to('.dino img', {
    y: -10,
    duration: 0.2,
    ease: "power1.out",
    yoyo: true,
    repeat: 1
});

function updateProgress() {
    const now = Date.now();
    // For testing, uncomment the line below and set a specific date
    // const now = new Date('2025-12-15T00:00:01').getTime();

    const totalDuration = END_DATE - START_DATE;
    const elapsed = now - START_DATE;

    let percentage = (elapsed / totalDuration) * 100;

    // Clamp percentage
    percentage = Math.max(0, Math.min(100, percentage));

    // Update DOM
    percentageText.textContent = Math.floor(percentage) + '%';
    updateFact(now);

    // GSAP Animations for smooth updates
    gsap.to(progressBar, {
        width: percentage + '%',
        duration: 3,
        ease: "power1.out"
    });

    gsap.to(dino, {
        left: percentage + '%',
        duration: 3,
        ease: "power1.out" // Match the progress bar easing for sync
    });

    if (percentage < 100) {
        if (walkTimeline.paused()) {
            walkTimeline.play();
        }
        requestAnimationFrame(updateProgress);
    } else {
        completeAnimation();
    }
}

function updateFact(now) {
    if (now < FACT_START_DATE) {
        factContainer.style.display = 'none';
        return;
    }

    const elapsed = now - FACT_START_DATE;
    const factIndex = Math.floor(elapsed / FACT_INTERVAL);

    if (factIndex >= 0 && factIndex < FACTS.length) {
        const fact = FACTS[factIndex];
        // Only update if changed to avoid unnecessary DOM updates
        if (factTitle.textContent !== fact.title) {
            factTitle.textContent = fact.title;
            factBody.textContent = fact.body;
            factContainer.style.display = 'block';

            // Simple fade in effect
            gsap.fromTo(factContainer, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
        }
    }
}

function completeAnimation() {
    walkTimeline.pause();
    // Reset dino position to ground
    gsap.to('.dino img', { y: 0, duration: 0.2 });

    // Hide facts
    factContainer.style.display = 'none';

    // Show message
    message.style.display = 'block';

    const tl = gsap.timeline();

    tl.to(message, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "elastic.out(1, 0.3)"
    })
        .to('.dino', {
            rotation: 360,
            duration: 1,
            ease: "back.out(1.7)"
        }, "-=0.5");

    // Trigger Confetti
    triggerConfetti();
    // Simple confetti effect using DOM elements could be added here
    // But for simplicity, we'll stick to the bounce and message
}

function triggerConfetti() {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#F06292', '#C8E6C9', '#FFF9C4'] // Match palette
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#F06292', '#C8E6C9', '#FFF9C4']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

// Start
updateProgress();
