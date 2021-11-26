"use strict";

function round(number) {
    return Math.round(number * 100) / 100;
}

function print_position_tooltip(x, y, text) {
    let hover_element = document.getElementById("papyrus-mouse-position")
    hover_element.innerHTML = text;

    hover_element.style.left = (x - 15) + 'px';
    hover_element.style.top = (y - 33) + 'px';
    hover_element.height = '25px';
    hover_element.style.position = 'absolute';
    hover_element.style.backgroundColor = '#777777';
    hover_element.style.color = '#fff';
    hover_element.style.zIndex = '9999';
    hover_element.style.padding = '5px';
    hover_element.style.borderRadius = '5px';
    hover_element.style.fontSize = '14px';
    hover_element.style.display = 'block';
    hover_element.style.boxShadow = '3px 2px 4px 0px #676666';
}

function print_position(event) {
    let parent = event.target.parentElement;
    if (!parent.classList.contains('textLayer')) {
        return
    }

    let page_width = parent.style.width.replace('px', '');
    let page_height = parent.style.height.replace('px', '');

    let dpi_h = page_width / 8.5;
    let dpi_v = page_height / 11;

    let cursor_x = event.clientX - parent.getBoundingClientRect().left;
    let cursor_y = event.clientY - parent.getBoundingClientRect().top;

    print_position_tooltip(event.clientX, event.clientY, `${round(cursor_x / dpi_h)} x ${round(cursor_y / dpi_v)}`);
}

function draw(canvas) {

    if (!canvas.getContext) {
        return;
    }
    const ctx = canvas.getContext('2d');

    // set line stroke and line width
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 3;

    // draw a red line
    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(300, 100);
    ctx.stroke();

}
(function () {
    window.addEventListener('mouseover', function (e) {
        try {
            let parent = e.target.parentElement;
            if (!parent.classList.contains('textLayer')) {
                return
            }
            let page_width = parent.style.width.replace('px', '');
            let page_height = parent.style.height.replace('px', '');

            let dpi_h = page_width / 8.5;
            let dpi_v = page_height / 11;


            // draw(parent.parentElement.firstChild.firstChild);



            if (e.target.getAttribute('role') === 'presentation') {
                e.target.classList.add('hover-text-position');

                let left_position = e.target.style.left.replace('px', '');
                let top_position = e.target.style.top.replace('px', '');

                let left_inch = round(left_position / dpi_h);
                let top_inch = round(top_position / dpi_v);

                e.target.setAttribute('title', `X: ${left_inch} INCH | Y: ${top_inch} INCH`);

                print_position_tooltip(
                    e.target.getBoundingClientRect().left,
                    e.target.getBoundingClientRect().top,
                    `${round(left_inch)} x ${round(top_inch)}`
                );
            } else {
                print_position(e);
            }
        } catch (error) {

        }

    });

    window.addEventListener('mouseout', function (e) {
        try {
            if (e.target.getAttribute('role') === 'presentation') {
                e.target.classList.remove('hover-text-position');
            }
        } catch (error) {
        }

    });

})();