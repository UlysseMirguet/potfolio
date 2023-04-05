const projects = document.querySelectorAll('.project');
console.log(projects);
let currentProjectIndex = 0;
let currentImageIndex = 0;
let animating = false;

// Display the first project and its first image
projects[currentProjectIndex].classList.add('active');
projects[currentProjectIndex].querySelectorAll('img')[currentImageIndex].classList.add('active');

// Add event listener for mousewheel
document.addEventListener('wheel', (event) => {
    if (isAnimating) {
        return;
    }
    event.preventDefault();
    console.log("mousewheel event fired");
    const delta = Math.sign(event.deltaY);

    // Remove active class from the current project and its image
    projects[currentProjectIndex].classList.remove('active');
    projects[currentProjectIndex].querySelectorAll('img')[currentImageIndex].classList.remove('active');

    // Remove active class from the current project and its image
    projects[currentProjectIndex].classList.remove('active');
    projects[currentProjectIndex].querySelectorAll('img')[currentImageIndex].classList.remove('active');

    // Update the current project and its image index based on the mousewheel direction
    if (delta > 0) {
        currentProjectIndex--;
        if (currentProjectIndex < 0) {
            currentProjectIndex = projects.length - 1;
        }
    } else if (delta < 0) {
        currentProjectIndex++;
        if (currentProjectIndex >= projects.length) {
            currentProjectIndex = 0;
        }
    }

    // Display the new current project and its first image with animation
    isAnimating = true;
    projects[currentProjectIndex].style.opacity = 0;
    //projects[currentProjectIndex].style.transform = 'translateY(400px)';
    currentImageIndex = 0;
    projects[currentProjectIndex].querySelectorAll('img')[currentImageIndex].classList.add('active');
    setTimeout(() => {
        projects[currentProjectIndex].style.opacity = 1;
        //projects[currentProjectIndex].style.transform = 'translateY(0)';
        isAnimating = false;
    }, 400);
    projects[currentProjectIndex].classList.add('active');

}, { passive: false });

// Add interval to display the next image after 3 seconds
setInterval(() => {
    if (!animating) {
        animating = true;

        // Remove active class from the current image
        projects[currentProjectIndex].querySelectorAll('img')[currentImageIndex].classList.remove('active');

        // Update the current image index
        currentImageIndex++;
        if (currentImageIndex >= projects[currentProjectIndex].querySelectorAll('img').length) {
            currentImageIndex = 0;
        }

        // Display the new current image
        projects[currentProjectIndex].querySelectorAll('img')[currentImageIndex].classList.add('active');

        // Wait for the animation to complete before setting animating to false
        setTimeout(() => {
            animating = false;
        }, 1000); // Change this value to match the duration of your animation
    }
}, 3000);

// Add event listener for keydown
let isAnimating = false;
document.addEventListener('keydown', (event) => {
    if (isAnimating) {
        return;
    }
    const key = event.key;
    if (key === 'ArrowUp' || key === 'ArrowDown') {
        console.log("keydown event fired");
        
        // Remove active class from the current project and its image
        projects[currentProjectIndex].classList.remove('active');
        projects[currentProjectIndex].querySelectorAll('img')[currentImageIndex].classList.remove('active');

        // Update the current project and its image index based on the key pressed
        if (key === 'ArrowUp') {
            currentProjectIndex--;
            if (currentProjectIndex < 0) {
                currentProjectIndex = projects.length - 1;
            }
        } else if (key === 'ArrowDown') {
            currentProjectIndex++;
            if (currentProjectIndex >= projects.length) {
                currentProjectIndex = 0;
            }
        }


        // Display the new current project and its first image with animation
        isAnimating = true;
        projects[currentProjectIndex].style.opacity = 0;
        //projects[currentProjectIndex].style.transform = 'translateY(400px)';
        currentImageIndex = 0;
        projects[currentProjectIndex].querySelectorAll('img')[currentImageIndex].classList.add('active');
        setTimeout(() => {
            projects[currentProjectIndex].style.opacity = 1;
            //projects[currentProjectIndex].style.transform = 'translateY(0)';
            isAnimating = false;
        }, 400);
        projects[currentProjectIndex].classList.add('active');
    }
}, { passive: false });


document.addEventListener('click', () => {
    // Redirects the user to the details page with the project id as a parameter
    window.location.href = `details_projet${currentProjectIndex + 1}.html`;
});