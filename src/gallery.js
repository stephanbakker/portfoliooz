export default function(item) {

    let currentlet 
    const props = ['top', 'right', 'left', 'bottom'];

    // TODO, make this a bit more like a pro ;-)
    // for now, just call the thing
    toggleItem(item);

    function toggleItem(item) {

        console.log('toggleItem', item);
        if (current) {
            close(current);
        }

        if (item) {
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
};
