export function emitEvent(target: HTMLElement, eventName: string, eventOption?: CustomEventInit): CustomEvent {
  const event = new CustomEvent(eventName,
    Object.assign(
      {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: {},
      },
      eventOption
    )
  );
  target.dispatchEvent(event);
  return event;
}
