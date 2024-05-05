/** Dispatch event on click outside of node */
export function clickOutside(node:HTMLElement) {
  
    const handleClick = (event: MouseEvent) => {
      if (event.target instanceof HTMLElement && node && !node.contains(event.target) && !event.defaultPrevented) {
        node.dispatchEvent(
          new CustomEvent('clickoutside')
        )
      }
    }
  
    document.addEventListener('click', handleClick, true);
    
    return {
      destroy() {
        document.removeEventListener('click', handleClick, true);
      }
    }
  }