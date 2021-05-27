//
// Determines whether an element has a slot. If name is specified, the function will look for a corresponding named
// slot, otherwise it will look for a "default" slot.
//
export function hasSlot(el: HTMLElement, name?: string) {
  // Look for a named slot
  if (name) {
    return el.querySelector(`[slot="${name}"]`) !== null;
  }

  // Look for a default slot
  return Array.from(el.childNodes).some(node => {
    //Texts 
    if (node.nodeType === node.TEXT_NODE && node.textContent!.trim() !== '') {
      return true;
    }

    //Elements
    if (node.nodeType === node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      if (!el.hasAttribute('slot')) {
        return true;
      }
    }

    return false;
  });
}