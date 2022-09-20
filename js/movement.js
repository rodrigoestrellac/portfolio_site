const robot = document.querySelector('.robot');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const val = scrolled * 0.3;
    const pcMoved = Math.min(0.20 * val, 43);
    robot.style.transform = `translateX(${-pcMoved}%)`;
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
    const pcMoved = Math.min(0.20 * val, 43);
    console.log(val*0.2);
    wine.style.transform = `translateX(${pcMoved}%)`;
    /*wine.style.marginTop = `${0.05 * val}%`;
    robot.style.transform = `translateY(${0.45 * val}%)`;
    robot.style.borderRadius = `${0.025 * val}%`;
    robot.style.height = `${0.1 * val}px`;
    robot.style.width = `${0.1 * val}px`;*/
});

/*const square = document.querySelector('#proyectos > div.proyectos-img > div.square');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const val = scrolled * 0.5;
    square.style.transform = `translateX(${0.2 * val}%)`;
});*/
