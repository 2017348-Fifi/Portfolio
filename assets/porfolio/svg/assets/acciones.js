//Reloj

document.addEventListener("DOMContentLoaded", () => {
    function updateClock() {
        const now = new Date();

        const spainTime = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Madrid" }));

        const hours = spainTime.getHours() % 12;
        const minutes = spainTime.getMinutes();

        document.querySelectorAll(".hours").forEach(el => {
            el.setAttribute("transform", `rotate(${360 / 12 * hours})`);
        });


        document.querySelectorAll(".minutes").forEach(el => {
            el.setAttribute("transform", `rotate(${360 / 60 * minutes})`);
        });
    }


    updateClock();

    setInterval(updateClock, 10000);
});

//Lampara

document.addEventListener("DOMContentLoaded", () => {
    const lamps = document.querySelectorAll(".lamp");

    lamps.forEach((lampElement) => {

        const head = lampElement.querySelector("#head");
        const arm1 = lampElement.querySelector("#arm1");
        const arm2 = lampElement.querySelector("#arm2");
        const arm3 = lampElement.querySelector("#arm3");


        const data = lampElement.dataset;
        if (!data) return; 

        let initialTilt = Number(data.tiltAngle) || 0;
        let initialArm = Number(data.armAngle) || 0;
        
        let currentTilt = initialTilt;
        let currentArm = initialArm;
        let isDragging = false;
        let startX, startY;


        head?.addEventListener("mousedown", (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            e.preventDefault(); 
        });


        document.addEventListener("mousemove", (e) => {
            if (!isDragging) return;

            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;


            const newArmAngle = Math.max(-60, Math.min(0, initialArm - deltaY * 0.5));
            const newTiltAngle = Math.max(-90, Math.min(90, initialTilt - deltaX * 0.8));

            currentArm = newArmAngle;
            currentTilt = newTiltAngle;


            if (arm1) arm1.setAttribute("transform", `rotate(${currentArm})`);
            if (arm2) arm2.setAttribute("transform", `rotate(${-currentArm * 2})`);
            if (arm3) arm3.setAttribute("transform", `rotate(${currentTilt})`);
        });


        document.addEventListener("mouseup", () => {
            if (isDragging) {
                isDragging = false;
                initialTilt = currentTilt;
                initialArm = currentArm;
            }
        });
    });
});

//Bombilla

document.addEventListener("DOMContentLoaded", () => {

    let isLightOff = true; 
    
    const bulbs = document.querySelectorAll("#bulb"); 

    function toggleLights() {

        bulbs.forEach(bulb => {

            bulb.setAttribute("fill", isLightOff ? "transparent" : "gold");
        });
        

        isLightOff = !isLightOff;
    }

    bulbs.forEach(bulb => {
        bulb.addEventListener("click", toggleLights);
    });
});