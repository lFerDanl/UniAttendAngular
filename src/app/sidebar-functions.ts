export function expandSidebar() {
    const sidebar = document.getElementById('sidebar') as HTMLElement;
    const mainContent = document.querySelector('.ml-16') as HTMLElement;

    if (sidebar && mainContent) {
        if (sidebar.style.width === '21rem') {
            sidebar.style.width = '15rem';
            mainContent.style.marginLeft = '4rem';
            sidebar.classList.remove('text-left', 'px-6');
            sidebar.classList.add('text-center', 'px-0');
        } else {
            sidebar.style.width = '21rem';
            mainContent.style.marginLeft = '21rem';
            sidebar.classList.add('text-left', 'px-6');
            sidebar.classList.remove('text-center', 'px-0');
        }

        const labels = sidebar.querySelectorAll('span');
        labels.forEach(label => label.classList.toggle('opacity-0'));
    }
}

export function highlightSidebarItem(element: HTMLElement) {
    const buttons = document.querySelectorAll("#sidebar button");
    buttons.forEach(btn => {
        const firstChild = btn.firstChild;
        const nextSibling = firstChild?.nextSibling as HTMLElement;
        if (firstChild && nextSibling) {
            btn.classList.remove('bg-gradient-to-r', 'from-cyan-400', 'to-cyan-500', 'text-white', 'w-48', 'ml-0');
            nextSibling.classList.remove('text-white');
        }
    });
    element.classList.add('bg-gradient-to-r', 'from-cyan-400', 'to-cyan-500', 'w-56', 'h-10', 'ml-0');
    const firstChild = element.firstChild;
    if (firstChild) {
        const nextSibling = firstChild.nextSibling as HTMLElement;
        if (nextSibling) {
            nextSibling.classList.add('text-white');
        }
    }
}
