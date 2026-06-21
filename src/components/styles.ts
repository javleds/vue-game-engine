const styleElementId = 'turn-engine-component-styles'

export const turnEngineComponentStyles = `
.te-room-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  min-width: 0;
}

.te-room-summary__text {
  display: grid;
  gap: 0.125rem;
  min-width: 0;
}

.te-room-summary__eyebrow,
.te-room-summary__title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.te-room-summary__eyebrow {
  margin: 0;
  font-size: 0.75rem;
  font-weight: 700;
}

.te-room-summary__title {
  margin: 0;
}

.te-icon-button,
.te-help-fab,
.te-chat-fab {
  display: grid;
  place-items: center;
}

.te-turn-order {
  display: flex;
  min-width: 0;
  margin: 0;
  padding: 0;
  list-style: none;
  gap: 0.25rem;
  overflow-x: auto;
  scroll-snap-type: x proximity;
}

.te-turn-order__player {
  position: relative;
  display: grid;
  flex: 0 0 auto;
  min-width: 5.25rem;
  min-height: 2.375rem;
  align-content: center;
  gap: 0.1875rem;
  padding: 0.3125rem 0.4375rem;
  scroll-snap-align: start;
}

.te-turn-order__presence {
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  width: 0.4375rem;
  height: 0.4375rem;
  border-radius: 999px;
}

.te-turn-order__name {
  overflow: hidden;
  font-size: 0.72rem;
  font-weight: 800;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.te-turn-order__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.te-turn-order__tag {
  font-size: 0.56rem;
  font-style: normal;
  font-weight: 800;
  line-height: 1;
  text-transform: uppercase;
}

.te-player-list {
  display: grid;
  gap: 0.625rem;
  padding: 0;
  margin: 0;
  list-style: none;
}

.te-player-list__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 2.75rem;
  gap: 0.75rem;
  padding: 0.625rem 0.75rem;
}

.te-player-list__item--disconnected {
  opacity: 0.58;
}

.te-player-list__name {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.te-player-list__badges {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.375rem;
}

.te-player-list__badge,
.te-player-list__status {
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 800;
}

.te-chat-messages {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
}

.te-chat-message {
  display: grid;
  gap: 0.25rem;
  padding: 0.5rem;
}

.te-chat-message__heading {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem;
}

.te-chat-message__time {
  white-space: nowrap;
}

.te-chat-message__body {
  margin: 0;
  overflow-wrap: anywhere;
}

.te-chat-form {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 0.5rem;
}

.te-chat-form__input {
  min-width: 0;
}

.te-lobby-chat {
  display: grid;
  grid-template-rows: auto minmax(11.25rem, 20rem) auto;
  gap: 0.75rem;
  min-height: 0;
}

.te-lobby-chat__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.625rem;
}

.te-chat-fab {
  position: fixed;
  right: var(--te-chat-fab-right, 0.875rem);
  bottom: var(--te-chat-fab-bottom, 0.875rem);
  z-index: var(--te-floating-z-index, 35);
}

.te-chat-panel {
  position: fixed;
  right: var(--te-chat-panel-right, 0.75rem);
  bottom: var(--te-chat-panel-bottom, 0.75rem);
  z-index: calc(var(--te-floating-z-index, 35) + 1);
  display: grid;
  grid-template-rows: auto auto minmax(0, 1fr) auto;
  gap: 0.625rem;
  width: min(var(--te-chat-panel-width, 23.75rem), calc(100cqw - 1.5rem));
  height: min(var(--te-chat-panel-height, 23.75rem), calc(100vh - 1.5rem));
  min-height: 0;
  padding: 0.75rem;
  overflow: hidden;
}

.te-chat-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.te-chat-panel__tabs {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.375rem;
}

.te-help-fab {
  position: fixed;
  left: var(--te-help-fab-left, 0.875rem);
  bottom: var(--te-help-fab-bottom, 0.875rem);
  z-index: var(--te-floating-z-index, 35);
  width: var(--te-help-fab-size, 2.75rem);
  min-width: var(--te-help-fab-size, 2.75rem);
  min-height: var(--te-help-fab-size, 2.75rem);
  padding: 0;
}

.te-help-modal__backdrop {
  position: fixed;
  inset: 0;
  z-index: var(--te-modal-z-index, 60);
  display: grid;
  place-items: center;
  padding: 1rem;
}

.te-help-modal__dialog {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  width: min(var(--te-help-modal-width, 42rem), 100%);
  max-height: min(var(--te-help-modal-max-height, 42rem), calc(100vh - 2rem));
  min-height: 0;
  overflow: hidden;
}

.te-help-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.te-help-modal__content {
  min-height: 0;
  overflow-y: auto;
}

.te-gallery-backdrop {
  position: fixed;
  inset: 0;
  z-index: var(--te-modal-z-index, 60);
  display: grid;
  place-items: center;
  padding: 1rem;
}

.te-gallery-dialog {
  display: grid;
  justify-items: center;
  gap: 1rem;
  width: min(var(--te-gallery-width, 32rem), 100%);
  max-height: min(var(--te-gallery-max-height, 42rem), calc(100vh - 2rem));
  min-height: 0;
  overflow: hidden;
}

.te-gallery-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  width: 100%;
}

.te-gallery-header h2,
.te-gallery-header p {
  margin: 0;
}
`

export function installTurnEngineComponentStyles(documentRef: Document = document): void {
  if (documentRef.getElementById(styleElementId)) {
    return
  }

  const style = documentRef.createElement('style')
  style.id = styleElementId
  style.textContent = turnEngineComponentStyles
  documentRef.head.append(style)
}
