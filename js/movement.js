// Create a media condition that targets viewports at least 768px wide
const mediaQuery = window.matchMedia('(max-width: 1200px)')
// Check if the media query is true
if (mediaQuery.matches) {
  const mediaQuery = window.matchMedia('(max-width: 680px)')
    // Check if the media query is true
    if (mediaQuery.matches) {
      
    } else {
      const robot = document.querySelector('.robot');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const val = scrolled * 0.3;
        const pcMoved = Math.min(0.05 * val, 43);
        robot.style.transform = `translateY(${pcMoved}%)`;
        robot.style.transform = `translateX(${-pcMoved/2}%)`;
        /*robot.style.marginTop = `${0.1 * val}%`;
        robot.style.transform = `translateY(${0.45 * val}%)`;
        robot.style.borderRadius = `${0.025 * val}%`;
        robot.style.height = `${0.1 * val}px`;
        robot.style.width = `${0.1 * val}px`;*/
    });
    
    const shopperRobot = document.querySelector('.preciosClaros');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const val = scrolled * 0.3;
        const pcMoved = Math.min(0.01 * val, 43);
        shopperRobot.style.transform = `translateX(${-pcMoved}%)`;
        /*robot.style.marginTop = `${0.1 * val}%`;
        robot.style.transform = `translateY(${0.45 * val}%)`;
        robot.style.borderRadius = `${0.025 * val}%`;
        robot.style.height = `${0.1 * val}px`;
        robot.style.width = `${0.1 * val}px`;*/
    });
    
    const carRobot = document.querySelector('.carScraper');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const val = scrolled * 0.3;
        const pcMoved = Math.min(0.05 * val, 43);
        carRobot.style.transform = `translateY(${pcMoved}%)`;
        carRobot.style.transform = `translateX(${-pcMoved/2}%)`;
        /*robot.style.marginTop = `${0.1 * val}%`;
        robot.style.transform = `translateY(${0.45 * val}%)`;
        robot.style.borderRadius = `${0.025 * val}%`;
        robot.style.height = `${0.1 * val}px`;
        robot.style.width = `${0.1 * val}px`;*/
    });
    
    const wine = document.querySelector('.wine');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const val = scrolled * 0.3;
        const pcMoved = Math.min(0.01 * val, 43);
        /*console.log(val*0.2);*/
        wine.style.transform = `translateX(${pcMoved}%)`;
        /*wine.style.marginTop = `${0.05 * val}%`;
        robot.style.transform = `translateY(${0.45 * val}%)`;
        robot.style.borderRadius = `${0.025 * val}%`;
        robot.style.height = `${0.1 * val}px`;
        robot.style.width = `${0.1 * val}px`;*/
    });
    }

} else {
  const robot = document.querySelector('.robot');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const val = scrolled * 0.3;
    const pcMoved = Math.min(0.05 * val, 43);
    robot.style.transform = `translateX(${pcMoved/2}%)`;
    robot.style.transform = `translateY(${pcMoved}%)`;
    /*robot.style.marginTop = `${0.1 * val}%`;
    robot.style.transform = `translateY(${0.45 * val}%)`;
    robot.style.borderRadius = `${0.025 * val}%`;
    robot.style.height = `${0.1 * val}px`;
    robot.style.width = `${0.1 * val}px`;*/
});

const shopperRobot = document.querySelector('.preciosClaros');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const val = scrolled * 0.3;
    const pcMoved = Math.min(0.06 * val, 43);
    shopperRobot.style.transform = `translateX(${-pcMoved}%)`;
    /*robot.style.marginTop = `${0.1 * val}%`;
    robot.style.transform = `translateY(${0.45 * val}%)`;
    robot.style.borderRadius = `${0.025 * val}%`;
    robot.style.height = `${0.1 * val}px`;
    robot.style.width = `${0.1 * val}px`;*/
});

const carRobot = document.querySelector('.carScraper');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const val = scrolled * 0.3;
    const pcMoved = Math.min(0.05 * val, 43);
    carRobot.style.transform = `translateX(${-pcMoved/2}%)`;
    carRobot.style.transform = `translateY(${pcMoved}%)`;
    /*robot.style.marginTop = `${0.1 * val}%`;
    robot.style.transform = `translateY(${0.45 * val}%)`;
    robot.style.borderRadius = `${0.025 * val}%`;
    robot.style.height = `${0.1 * val}px`;
    robot.style.width = `${0.1 * val}px`;*/
});

const wine = document.querySelector('.wine');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const val = scrolled * 0.3;
    const pcMoved = Math.min(0.06 * val, 43);
    /*console.log(val*0.2);*/
    wine.style.transform = `translateX(${pcMoved}%)`;
    /*wine.style.marginTop = `${0.05 * val}%`;
    robot.style.transform = `translateY(${0.45 * val}%)`;
    robot.style.borderRadius = `${0.025 * val}%`;
    robot.style.height = `${0.1 * val}px`;
    robot.style.width = `${0.1 * val}px`;*/
});

}


/*const square = document.querySelector('#proyectos > div.proyectos-img > div.square');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const val = scrolled * 0.5;
    square.style.transform = `translateX(${0.2 * val}%)`;
});*/
