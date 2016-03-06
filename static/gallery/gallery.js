var items = document.querySelectorAll('.overview__item > .item__wrapper');

var itemsArr = [].slice.call(items);

var overviewEl = document.querySelector('ul');

overviewEl.addEventListener('click', toggleItem, false);

var current;
var props = ['top', 'right', 'left', 'bottom'];

function toggleItem(event) {

    var item = event.target;

    if (item === current) {
        close(item);
    } else {
        show(item);
    }

}

function show(item) {


    var expandedRects;

    if (current) {
        close(current);
    }

    current = item;

    current.rects = item.getBoundingClientRect();



    // fixed starting position

    item.classList.add('is-extended');

    expandedRects = item.getBoundingClientRect();

    item.style.clip = 'rect(' +
        current.rects.top + 'px, ' +
        current.rects.right + 'px, ' +
        current.rects.bottom + 'px, ' +
        current.rects.left + 'px)';

    // Read again to force the style change to take hold.
    var triggerValue = item.offsetTop;

    item.style.clip = 'rect(' +
        expandedRects.top + 'px, ' +
        expandedRects.right + 'px, ' +
        expandedRects.bottom + 'px, ' +
        expandedRects.left + 'px)';

}

function close(item) {

    item.style.clip = 'rect(' +
        current.rects.top + 'px, ' +
        current.rects.right + 'px, ' +
        current.rects.bottom + 'px, ' +
        current.rects.left + 'px)';

    item.addEventListener('transitionend', transitionCollapseEnd);

    current = null;
}

function transitionCollapseEnd(event) {
    var item = event.target;

    item.classList.remove('is-extended');
    item.removeEventListener('transitionend', transitionCollapseEnd);
}

